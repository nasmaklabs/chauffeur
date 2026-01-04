import { BRAND } from "@/lib/constants/brand";
import { ADDRESS } from "@/lib/constants/address";

// Common styles for professional email templates
const emailStyles = {
  container: `
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    max-width: 600px;
    margin: 0 auto;
    background-color: #ffffff;
  `,
  header: `
    background-color: #1a1a2e;
    padding: 30px 40px;
    text-align: center;
  `,
  headerLogo: `
    color: #c9a227;
    font-size: 28px;
    font-weight: bold;
    margin: 0;
    letter-spacing: 1px;
  `,
  headerTagline: `
    color: #9ca3af;
    font-size: 14px;
    margin: 8px 0 0 0;
  `,
  content: `
    padding: 40px;
    background-color: #ffffff;
  `,
  title: `
    color: #1a1a2e;
    font-size: 24px;
    font-weight: 600;
    margin: 0 0 20px 0;
  `,
  text: `
    color: #4b5563;
    font-size: 16px;
    line-height: 1.6;
    margin: 0 0 16px 0;
  `,
  detailsBox: `
    background-color: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 24px;
    margin: 24px 0;
  `,
  detailsTitle: `
    color: #1a1a2e;
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 16px 0;
    padding-bottom: 12px;
    border-bottom: 2px solid #c9a227;
  `,
  detailRow: `
    display: flex;
    padding: 8px 0;
    border-bottom: 1px solid #e5e7eb;
  `,
  detailLabel: `
    color: #6b7280;
    font-size: 14px;
    font-weight: 500;
    width: 140px;
    flex-shrink: 0;
  `,
  detailValue: `
    color: #1f2937;
    font-size: 14px;
    font-weight: 600;
  `,
  highlight: `
    background-color: #c9a227;
    color: #ffffff;
    padding: 16px 24px;
    border-radius: 8px;
    text-align: center;
    margin: 24px 0;
  `,
  highlightLabel: `
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 0 0 4px 0;
    opacity: 0.9;
  `,
  highlightValue: `
    font-size: 24px;
    font-weight: bold;
    margin: 0;
    letter-spacing: 2px;
  `,
  button: `
    display: inline-block;
    background-color: #c9a227;
    color: #ffffff;
    text-decoration: none;
    padding: 14px 32px;
    border-radius: 6px;
    font-weight: 600;
    font-size: 16px;
    margin: 16px 0;
  `,
  footer: `
    background-color: #f9fafb;
    padding: 30px 40px;
    text-align: center;
    border-top: 1px solid #e5e7eb;
  `,
  footerText: `
    color: #6b7280;
    font-size: 13px;
    line-height: 1.6;
    margin: 0 0 8px 0;
  `,
  footerLink: `
    color: #c9a227;
    text-decoration: none;
  `,
  divider: `
    height: 1px;
    background-color: #e5e7eb;
    margin: 24px 0;
  `,
};

// Base email wrapper
const emailWrapper = (content: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="format-detection" content="telephone=no">
  <title>${BRAND.name}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f3f4f6;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="${emailStyles.container}" align="center">
          ${content}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// Email header component
const emailHeader = () => `
  <tr>
    <td style="${emailStyles.header}">
      <h1 style="${emailStyles.headerLogo}">${BRAND.name}</h1>
      <p style="${emailStyles.headerTagline}">${BRAND.tagline}</p>
    </td>
  </tr>
`;

// Email footer component
const emailFooter = () => `
  <tr>
    <td style="${emailStyles.footer}">
      <p style="${emailStyles.footerText}">
        <strong>${BRAND.name}</strong><br>
        ${ADDRESS}
      </p>
      <p style="${emailStyles.footerText}">
        Email: <a href="mailto:${BRAND.email.support}" style="${
  emailStyles.footerLink
}">${BRAND.email.support}</a>
      </p>
      <p style="${emailStyles.footerText}; margin-top: 16px; font-size: 11px;">
        © ${new Date().getFullYear()} ${BRAND.name}. All rights reserved.<br>
        This email was sent because you made a booking or inquiry with us.
      </p>
    </td>
  </tr>
`;

// Detail row helper
const detailRow = (
  label: string,
  value: string | number | null | undefined
) => {
  if (!value) return "";
  return `
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
        <span style="${emailStyles.detailLabel}">${label}</span>
      </td>
      <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
        <span style="${emailStyles.detailValue}">${value}</span>
      </td>
    </tr>
  `;
};

// Booking data interface
export interface BookingEmailData {
  bookingReference: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string | null;
  tripType: string;
  pickupLocation: string;
  dropoffLocation?: string | null;
  date: string;
  time: string;
  returnDate?: string | null;
  returnTime?: string | null;
  duration?: string | null;
  vehicleType?: string | null;
  passengers: number;
  luggage: number;
  flightNumber?: string | null;
  notes?: string | null;
  totalPrice?: number | null;
  meetAndGreet?: boolean;
  status: string;
}

// Contact form data interface
export interface ContactEmailData {
  firstName: string;
  lastName: string;
  email: string;
  subject?: string;
  message: string;
}

// Format trip type for display
const formatTripType = (tripType: string): string => {
  const types: Record<string, string> = {
    "one-way": "One Way",
    "round-trip": "Round Trip",
    hourly: "Hourly Charter",
  };
  return types[tripType] || tripType;
};

// Format price for display
const formatPrice = (price: number | null | undefined): string => {
  if (!price) return "To be confirmed";
  return `£${price.toFixed(2)}`;
};

// ============================================
// BOOKING CONFIRMATION EMAIL (Customer)
// ============================================
export const generateBookingConfirmationEmail = (
  booking: BookingEmailData
): string => {
  const content = `
    ${emailHeader()}
    <tr>
      <td style="${emailStyles.content}">
        <h2 style="${emailStyles.title}">Booking Confirmation</h2>
        <p style="${emailStyles.text}">
          Dear ${booking.firstName},
        </p>
        <p style="${emailStyles.text}">
          Thank you for choosing ${
            BRAND.name
          }. Your booking has been successfully received and is being processed. Please find your booking details below.
        </p>
        
        <!-- Booking Reference Highlight -->
        <div style="${emailStyles.highlight}">
          <p style="${emailStyles.highlightLabel}">Your Booking Reference</p>
          <p style="${emailStyles.highlightValue}">${
    booking.bookingReference
  }</p>
        </div>
        
        <!-- Trip Details -->
        <div style="${emailStyles.detailsBox}">
          <h3 style="${emailStyles.detailsTitle}">Trip Details</h3>
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            ${detailRow("Trip Type", formatTripType(booking.tripType))}
            ${detailRow("Pickup Location", booking.pickupLocation)}
            ${detailRow("Drop-off Location", booking.dropoffLocation)}
            ${detailRow("Date", booking.date)}
            ${detailRow("Time", booking.time)}
            ${
              booking.tripType === "round-trip"
                ? detailRow("Return Date", booking.returnDate)
                : ""
            }
            ${
              booking.tripType === "round-trip"
                ? detailRow("Return Time", booking.returnTime)
                : ""
            }
            ${
              booking.tripType === "hourly"
                ? detailRow("Duration", booking.duration)
                : ""
            }
            ${detailRow("Vehicle", booking.vehicleType)}
            ${detailRow("Passengers", booking.passengers)}
            ${detailRow("Luggage", booking.luggage)}
            ${detailRow("Phone Number", booking.phoneNumber)}
            ${detailRow("Flight Number", booking.flightNumber)}
            ${detailRow(
              "Meet & Greet",
              booking.meetAndGreet
                ? "Yes - Driver will hold a placard with passenger name"
                : "No"
            )}
          </table>
        </div>
        
        <!-- Fare Details -->
        <div style="${emailStyles.detailsBox}">
          <h3 style="${emailStyles.detailsTitle}">Fare Details</h3>
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            ${detailRow("Total Fare", formatPrice(booking.totalPrice))}
            ${detailRow(
              "Status",
              booking.status.charAt(0).toUpperCase() + booking.status.slice(1)
            )}
          </table>
        </div>
        
        ${
          booking.notes
            ? `
        <!-- Special Instructions -->
        <div style="${emailStyles.detailsBox}">
          <h3 style="${emailStyles.detailsTitle}">Special Instructions</h3>
          <p style="${emailStyles.text}; margin: 0;">${booking.notes}</p>
        </div>
        `
            : ""
        }
        
        <div style="${emailStyles.divider}"></div>
        
        <p style="${emailStyles.text}">
          <strong>What happens next?</strong>
        </p>
        <p style="${emailStyles.text}">
          Our team will review your booking and send you a confirmation shortly. Your chauffeur details will be provided closer to the pickup date.
        </p>
        <p style="${emailStyles.text}">
          If you have any questions or need to make changes to your booking, please contact us at <a href="mailto:${
            BRAND.email.bookings
          }" style="${emailStyles.footerLink}">${
    BRAND.email.bookings
  }</a> with your booking reference.
        </p>
        
        <p style="${emailStyles.text}; margin-top: 24px;">
          Best regards,<br>
          <strong>The ${BRAND.name} Team</strong>
        </p>
      </td>
    </tr>
    ${emailFooter()}
  `;

  return emailWrapper(content);
};

// ============================================
// NEW BOOKING NOTIFICATION (Internal)
// ============================================
export const generateNewBookingNotificationEmail = (
  booking: BookingEmailData
): string => {
  const content = `
    ${emailHeader()}
    <tr>
      <td style="${emailStyles.content}">
        <h2 style="${emailStyles.title}">🚗 New Booking Received</h2>
        <p style="${emailStyles.text}">
          A new booking has been submitted through the website. Please review and process accordingly.
        </p>
        
        <!-- Booking Reference Highlight -->
        <div style="${emailStyles.highlight}">
          <p style="${emailStyles.highlightLabel}">Booking Reference</p>
          <p style="${emailStyles.highlightValue}">${
    booking.bookingReference
  }</p>
        </div>
        
        <!-- Customer Details -->
        <div style="${emailStyles.detailsBox}">
          <h3 style="${emailStyles.detailsTitle}">Customer Information</h3>
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            ${detailRow("Name", `${booking.firstName} ${booking.lastName}`)}
            ${detailRow("Email", booking.email)}
          </table>
        </div>
        
        <!-- Trip Details -->
        <div style="${emailStyles.detailsBox}">
          <h3 style="${emailStyles.detailsTitle}">Trip Details</h3>
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            ${detailRow("Trip Type", formatTripType(booking.tripType))}
            ${detailRow("Pickup Location", booking.pickupLocation)}
            ${detailRow("Drop-off Location", booking.dropoffLocation)}
            ${detailRow("Date", booking.date)}
            ${detailRow("Time", booking.time)}
            ${
              booking.tripType === "round-trip"
                ? detailRow("Return Date", booking.returnDate)
                : ""
            }
            ${
              booking.tripType === "round-trip"
                ? detailRow("Return Time", booking.returnTime)
                : ""
            }
            ${
              booking.tripType === "hourly"
                ? detailRow("Duration", booking.duration)
                : ""
            }
            ${detailRow("Vehicle", booking.vehicleType)}
            ${detailRow("Passengers", booking.passengers)}
            ${detailRow("Luggage", booking.luggage)}
            ${detailRow("Phone Number", booking.phoneNumber)}
            ${detailRow("Flight Number", booking.flightNumber)}
            ${detailRow(
              "Meet & Greet",
              booking.meetAndGreet
                ? "Yes - Driver will hold a placard with passenger name"
                : "No"
            )}
          </table>
        </div>
        
        <!-- Fare Details -->
        <div style="${emailStyles.detailsBox}">
          <h3 style="${emailStyles.detailsTitle}">Fare Information</h3>
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            ${detailRow("Quoted Price", formatPrice(booking.totalPrice))}
          </table>
        </div>
        
        ${
          booking.notes
            ? `
        <!-- Special Instructions -->
        <div style="${emailStyles.detailsBox}">
          <h3 style="${emailStyles.detailsTitle}">⚠️ Special Instructions</h3>
          <p style="${emailStyles.text}; margin: 0; color: #dc2626;">${booking.notes}</p>
        </div>
        `
            : ""
        }
        
        <p style="${emailStyles.text}; margin-top: 24px;">
          <strong>Action Required:</strong> Please confirm this booking with the customer.
        </p>
      </td>
    </tr>
    ${emailFooter()}
  `;

  return emailWrapper(content);
};

// ============================================
// CONTACT FORM EMAIL (Internal)
// ============================================
export const generateContactFormEmail = (data: ContactEmailData): string => {
  const content = `
    ${emailHeader()}
    <tr>
      <td style="${emailStyles.content}">
        <h2 style="${emailStyles.title}">📬 New Contact Form Submission</h2>
        <p style="${emailStyles.text}">
          You have received a new message through the contact form on the website.
        </p>
        
        <!-- Contact Details -->
        <div style="${emailStyles.detailsBox}">
          <h3 style="${emailStyles.detailsTitle}">Contact Information</h3>
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            ${detailRow("Name", `${data.firstName} ${data.lastName}`)}
            ${detailRow("Email", data.email)}
            ${detailRow("Subject", data.subject || "No subject provided")}
          </table>
        </div>
        
        <!-- Message -->
        <div style="${emailStyles.detailsBox}">
          <h3 style="${emailStyles.detailsTitle}">Message</h3>
          <p style="${emailStyles.text}; margin: 0; white-space: pre-wrap;">${
    data.message
  }</p>
        </div>
        
        <div style="${emailStyles.divider}"></div>
        
        <p style="${emailStyles.text}">
          <strong>To reply to this inquiry:</strong>
        </p>
        <p style="text-align: center;">
          <a href="mailto:${data.email}?subject=Re: ${
    data.subject || "Your Inquiry to " + BRAND.name
  }" style="${emailStyles.button}">
            Reply to ${data.firstName}
          </a>
        </p>
        
        <p style="${
          emailStyles.text
        }; margin-top: 24px; font-size: 13px; color: #9ca3af;">
          This message was sent from the contact form at ${BRAND.domain}
        </p>
      </td>
    </tr>
    ${emailFooter()}
  `;

  return emailWrapper(content);
};

// ============================================
// CONTACT FORM AUTO-REPLY (Customer)
// ============================================
export const generateContactAutoReplyEmail = (
  data: ContactEmailData
): string => {
  const content = `
    ${emailHeader()}
    <tr>
      <td style="${emailStyles.content}">
        <h2 style="${emailStyles.title}">Thank You for Contacting Us</h2>
        <p style="${emailStyles.text}">
          Dear ${data.firstName},
        </p>
        <p style="${emailStyles.text}">
          Thank you for reaching out to ${
            BRAND.name
          }. We have received your message and our team will get back to you as soon as possible, typically within 24 hours.
        </p>
        
        <!-- Message Summary -->
        <div style="${emailStyles.detailsBox}">
          <h3 style="${emailStyles.detailsTitle}">Your Message</h3>
          <p style="color: #6b7280; font-size: 14px; margin: 0 0 8px 0;">
            <strong>Subject:</strong> ${data.subject || "General Inquiry"}
          </p>
          <p style="${
            emailStyles.text
          }; margin: 0; white-space: pre-wrap; font-style: italic;">"${
    data.message
  }"</p>
        </div>
        
        <div style="${emailStyles.divider}"></div>
        
        <p style="${emailStyles.text}">
          In the meantime, if you need immediate assistance or would like to make a booking, please visit our website or contact us directly:
        </p>
        <p style="${emailStyles.text}">
          📧 <a href="mailto:${BRAND.email.bookings}" style="${
    emailStyles.footerLink
  }">${BRAND.email.bookings}</a>
        </p>
        
        <p style="${emailStyles.text}; margin-top: 24px;">
          Best regards,<br>
          <strong>The ${BRAND.name} Team</strong>
        </p>
      </td>
    </tr>
    ${emailFooter()}
  `;

  return emailWrapper(content);
};
