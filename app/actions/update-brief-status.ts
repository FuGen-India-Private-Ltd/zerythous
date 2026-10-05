"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function updateBriefStatus(id: string, status: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("project_briefs")
    .update({ status })
    .eq("id", id)

  if (error) {
    console.error(error)
    return { success: false, error: "Failed to update status" }
  }

  revalidatePath(`/admin/project-briefs/${id}`)
  revalidatePath("/admin/project-briefs")
  return { success: true }
}
