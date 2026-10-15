"use server"

import { createClient } from "@/lib/supabase/server"
import { contactSchema } from "@/lib/validations/forms"
import { sanitizeInput, checkRateLimit } from "@/lib/security"
import {
  sendToGoogleAppsScript,
  sendResendEmail,
  generateClientCelebrationEmailHtml,
  generateExecutiveAlertEmailHtml,
} from "@/lib/automations"
import { revalidatePath } from "next/cache"

export async function submitContact(formData: FormData) {
  try {
    const rawEmail = String(formData.get("email") || "").toLowerCase().trim()
    const rateLimit = checkRateLimit(`contact:${rawEmail || "anon"}`)
    if (!rateLimit.success) {
      return { success: false, error: rateLimit.message }
    }

    const data = {
      name: sanitizeInput(String(formData.get("name") || "")),
      email: rawEmail,
      phone: sanitizeInput(String(formData.get("phone") || "")) || undefined,
      subject: sanitizeInput(String(formData.get("subject") || "")),
      message: sanitizeInput(String(formData.get("message") || "")),
      honeypot: formData.get("honeypot"),
    }

    // Anti-spam honeypot
    if (data.honeypot) {
      return { success: true } // Silently drop bot submissions
    }

    // Validation
    const validated = contactSchema.safeParse(data)

    if (!validated.success) {
      return { success: false, error: "Invalid form data. Please check your inputs." }
    }

    const referenceId = `ZTX-${Math.floor(100000 + Math.random() * 900000)}`
    const timestamp = new Date().toISOString()

    // 1. Supabase Persistence
    try {
      const supabase = await createClient()
      const { error } = await supabase.from("contact_messages").insert([
        {
          name: validated.data.name,
          email: validated.data.email,
          phone: validated.data.phone || null,
          subject: validated.data.subject,
          message: validated.data.message,
        }
      ])
      if (error) {
        console.warn("[Database] Supabase insert notice:", error.message)
      }
    } catch (dbErr) {
      console.warn("[Database] Supabase connection bypassed or unavailable:", dbErr)
    }

    // 2. Google Apps Script Webhook Sync (Async, resilient)
    const payload = {
      type: "contact_form" as const,
      timestamp,
      name: validated.data.name,
      email: validated.data.email,
      phone: validated.data.phone || null,
      subjectOrProject: validated.data.subject,
      messageOrRequirements: validated.data.message,
    }
    await sendToGoogleAppsScript(payload)

    // 3. Resend Smart Email Automation: Client Celebration Confirmation
    await sendResendEmail({
      to: validated.data.email,
      subject: `🎉 Architecture Inquiry Received: ${validated.data.subject} [Ref: ${referenceId}]`,
      html: generateClientCelebrationEmailHtml({
        clientName: validated.data.name,
        projectName: validated.data.subject,
      }),
    })

    // 4. Resend Smart Email Automation: Executive Alert
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL
    if (adminEmail) {
      await sendResendEmail({
        to: adminEmail,
        subject: `🚨 New Contact Inquiry from ${validated.data.name}: ${validated.data.subject}`,
        html: generateExecutiveAlertEmailHtml(payload),
      })
    }

    revalidatePath("/admin/contacts")
    return { success: true, referenceId }
  } catch (error) {
    console.error("Submission error:", error)
    return { success: false, error: "An unexpected error occurred." }
  }
}

