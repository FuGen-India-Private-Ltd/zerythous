"use server"

import { createClient } from "@/lib/supabase/server"
import { contactSchema } from "@/lib/validations/forms"
import { revalidatePath } from "next/cache"

export async function submitContact(formData: FormData) {
  try {
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      honeypot: formData.get("honeypot"),
    }

    // Anti-spam honeypot
    if (data.honeypot) {
      return { success: true } // Silently drop bot submissions
    }

    // Validation
    const validated = contactSchema.safeParse({
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
    })

    if (!validated.success) {
      return { success: false, error: "Invalid form data. Please check your inputs." }
    }

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
      console.error("Supabase insert error:", error)
      return { success: false, error: "Failed to submit message. Please try again later." }
    }

    revalidatePath("/admin/contacts")
    return { success: true }
  } catch (error) {
    console.error("Submission error:", error)
    return { success: false, error: "An unexpected error occurred." }
  }
}
