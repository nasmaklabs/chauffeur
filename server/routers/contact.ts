import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { sendEmail, getInternalEmail } from "@/lib/services/email-service";
import {
  generateContactFormEmail,
  generateContactAutoReplyEmail,
  type ContactEmailData,
} from "@/lib/services/email-templates";

const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

export const contactRouter = createTRPCRouter({
  submit: publicProcedure
    .input(contactFormSchema)
    .mutation(async ({ input }) => {
      try {
        const contactData: ContactEmailData = {
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          subject: input.subject,
          message: input.message,
        };

        // Send notification email to internal team
        const internalEmailSent = await sendEmail({
          to: getInternalEmail(),
          subject: `Contact Form: ${input.subject || "New Inquiry"} - ${
            input.firstName
          } ${input.lastName}`,
          html: generateContactFormEmail(contactData),
          replyTo: input.email,
        });

        // Send auto-reply to customer
        const autoReplySent = await sendEmail({
          to: input.email,
          subject: `Thank you for contacting AA Comfort`,
          html: generateContactAutoReplyEmail(contactData),
        });

        if (!internalEmailSent) {
          console.error("Failed to send internal contact notification");
        }

        if (!autoReplySent) {
          console.error("Failed to send contact auto-reply");
        }

        return {
          success: true,
          message:
            "Your message has been sent successfully. We will get back to you soon.",
        };
      } catch (error) {
        console.error("Error processing contact form:", error);
        throw new Error("Failed to send message. Please try again.");
      }
    }),
});
