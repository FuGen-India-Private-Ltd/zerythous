"use server"

import { createClient } from "@/lib/supabase/server"
import { projectBriefSchema } from "@/lib/validations/forms"
import { sanitizeInput, checkRateLimit } from "@/lib/security"
import {
  sendToGoogleAppsScript,
  sendResendEmail,
  generateClientCelebrationEmailHtml,
  generateExecutiveAlertEmailHtml,
} from "@/lib/automations"
import { revalidatePath } from "next/cache"

export async function submitProjectBrief(data: Record<string, unknown>) {
  try {
    const rawEmail = String(data?.email || "").toLowerCase().trim()
    const rateLimit = checkRateLimit(`brief:${rawEmail || "anon"}`)
    if (!rateLimit.success) {
      return { success: false, error: rateLimit.message }
    }

    // Anti-spam honeypot
    if (data?.honeypot) {
      return { success: true } // Silently drop bot submissions
    }

    const sanitizedData = {
      type: sanitizeInput(String(data?.type || "")),
      needs: Array.isArray(data?.needs)
        ? data.needs.map((n) => sanitizeInput(String(n))).filter(Boolean)
        : [],
      timeline: sanitizeInput(String(data?.timeline || "")),
      budget: sanitizeInput(String(data?.budget || "")),
      name: sanitizeInput(String(data?.name || "")),
      email: rawEmail,
      company: sanitizeInput(String(data?.company || "")) || undefined,
      projectName: sanitizeInput(String(data?.projectName || "")),
      phone: sanitizeInput(String(data?.phone || "")) || undefined,
      description: sanitizeInput(String(data?.description || "")) || undefined,
    }

    // Validation
    const validated = projectBriefSchema.safeParse(sanitizedData)

    if (!validated.success) {
      return { success: false, error: "Invalid form data. Please check your inputs." }
    }

    const referenceId = `ZTX-ARCH-${Math.floor(100000 + Math.random() * 900000)}`
    const timestamp = new Date().toISOString()

    // 1. Supabase Persistence
    try {
      const supabase = await createClient()
      const { error } = await supabase.from("project_briefs").insert([
        {
          name: validated.data.name,
          email: validated.data.email,
          company: validated.data.company || null,
          phone: validated.data.phone || null,
          project_type: validated.data.type,
          requirements: validated.data.projectName,
          services: validated.data.needs,
          timeline: validated.data.timeline,
          budget: validated.data.budget,
          additional_information: validated.data.description || null,
        }
      ])
      if (error) {
        console.warn("[Database] Supabase brief insert notice:", error.message)
      }
    } catch (dbErr) {
      console.warn("[Database] Supabase connection bypassed or unavailable:", dbErr)
    }

    // 2. Google Apps Script Webhook Sync (Async)
    const payload = {
      type: "project_brief" as const,
      timestamp,
      name: validated.data.name,
      email: validated.data.email,
      phone: validated.data.phone || null,
      company: validated.data.company || null,
      subjectOrProject: validated.data.projectName,
      messageOrRequirements: validated.data.description || `Type: ${validated.data.type}`,
      budget: validated.data.budget,
      timeline: validated.data.timeline,
      services: validated.data.needs,
    }
    await sendToGoogleAppsScript(payload)

    // 3. Resend Smart Email Automation: Client Celebration Confirmation
    await sendResendEmail({
      to: validated.data.email,
      subject: `🎉 Blueprint Received: ${validated.data.projectName} [Ref: ${referenceId}]`,
      html: generateClientCelebrationEmailHtml({
        clientName: validated.data.name,
        projectName: validated.data.projectName,
        services: validated.data.needs,
        budget: validated.data.budget,
        timeline: validated.data.timeline,
      }),
    })

    // 4. Resend Smart Email Automation: Executive Alert
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL
    if (adminEmail) {
      await sendResendEmail({
        to: adminEmail,
        subject: `🚨 New Project Brief from ${validated.data.name}: ${validated.data.projectName} (${validated.data.budget})`,
        html: generateExecutiveAlertEmailHtml(payload),
      })
    }

    revalidatePath("/admin/project-briefs")
    revalidatePath("/admin/dashboard")
    return { success: true, referenceId }
  } catch (error) {
    console.error("Submission error:", error)
    return { success: false, error: "An unexpected error occurred." }
  }
}

