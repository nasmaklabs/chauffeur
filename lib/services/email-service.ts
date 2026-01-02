import nodemailer from "nodemailer";
import { BRAND } from "@/lib/constants/brand";

// Email configuration
const EMAIL_CONFIG = {
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport(EMAIL_CONFIG);
};

// Email options interface
interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

// Send email function with proper headers for deliverability
export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: {
        name: BRAND.name,
        address: process.env.SMTP_FROM_EMAIL || BRAND.email.bookings,
      },
      to: options.to,
      subject: options.subject,
      html: options.html,
      replyTo:
        options.replyTo ||
        process.env.INTERNAL_NOTIFICATION_EMAIL ||
        BRAND.email.support,
      headers: {
        "X-Priority": "3",
        "X-Mailer": `${BRAND.name} Mailer`,
        "List-Unsubscribe": `<mailto:${
          process.env.INTERNAL_NOTIFICATION_EMAIL || BRAND.email.support
        }?subject=Unsubscribe>`,
      },
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${options.to}`);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

// Internal notification email address
export const getInternalEmail = () => {
  return process.env.INTERNAL_NOTIFICATION_EMAIL || BRAND.email.admin;
};
