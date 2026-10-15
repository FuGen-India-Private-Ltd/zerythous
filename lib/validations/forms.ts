import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100, "Name too long"),
  email: z.string().trim().email("Invalid email address").max(254, "Email too long"),
  phone: z.string().trim().max(30, "Phone number too long").optional(),
  subject: z.string().trim().min(2, "Subject is required").max(200, "Subject too long"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(5000, "Message too long"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const projectBriefSchema = z.object({
  type: z.string().trim().min(1, "Project type is required").max(100),
  needs: z.array(z.string().trim().max(50)).min(1, "Select at least one service").max(20),
  timeline: z.string().trim().min(1, "Timeline is required").max(100),
  budget: z.string().trim().min(1, "Budget is required").max(100),
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(254),
  company: z.string().trim().max(100).optional(),
  projectName: z.string().trim().min(2, "Project name is required").max(150),
  phone: z.string().trim().max(30).optional(),
  description: z.string().trim().max(5000).optional(),
});

export type ProjectBriefFormData = z.infer<typeof projectBriefSchema>;
