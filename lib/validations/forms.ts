import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const projectBriefSchema = z.object({
  type: z.string().min(1, "Project type is required"),
  needs: z.array(z.string()).min(1, "Select at least one service"),
  timeline: z.string().min(1, "Timeline is required"),
  budget: z.string().min(1, "Budget is required"),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  projectName: z.string().min(2, "Project name is required"),
  phone: z.string().optional(),
  description: z.string().optional(),
});

export type ProjectBriefFormData = z.infer<typeof projectBriefSchema>;
