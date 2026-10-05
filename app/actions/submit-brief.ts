"use server"

import { createClient } from "@/lib/supabase/server"
import { projectBriefSchema } from "@/lib/validations/forms"
import { revalidatePath } from "next/cache"

export async function submitProjectBrief(data: any) {
  try {
    // Anti-spam honeypot
    if (data.honeypot) {
      return { success: true } // Silently drop bot submissions
    }

    // Validation
    const validated = projectBriefSchema.safeParse(data)

    if (!validated.success) {
      return { success: false, error: "Invalid form data. Please check your inputs." }
    }

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
      console.error("Supabase insert error:", error)
      return { success: false, error: "Unable to submit your project brief. Please try again." }
    }

    revalidatePath("/admin/project-briefs")
    revalidatePath("/admin/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Submission error:", error)
    return { success: false, error: "An unexpected error occurred." }
  }
}
