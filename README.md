This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Email Notifications Configuration

The application sends email notifications for:

- **Booking confirmations** - Sent to customers when they make a booking
- **New booking alerts** - Sent to internal team when a new booking is received
- **Contact form submissions** - Sent to internal team when someone submits the contact form
- **Contact form auto-reply** - Sent to customers acknowledging their inquiry

### Required Environment Variables

Add these to your `.env` file (see `.env.example` for reference):

```bash
# SMTP Configuration
SMTP_HOST=smtp.gmail.com          # Your SMTP server
SMTP_PORT=587                      # SMTP port (587 for TLS)
SMTP_SECURE=false                  # true for 465, false for 587
SMTP_USER=your-email@gmail.com    # SMTP username
SMTP_PASSWORD=your-app-password    # SMTP password or App Password
SMTP_FROM_EMAIL=your-email@gmail.com

# Internal notification recipient
INTERNAL_NOTIFICATION_EMAIL=admin@yourdomain.com
```

### Gmail Setup (Recommended for Development)

1. Enable 2-Step Verification on your Google Account
2. Go to: Google Account → Security → 2-Step Verification → App passwords
3. Generate a new App Password for "Mail"
4. Use this App Password as `SMTP_PASSWORD`

### Email Deliverability Best Practices

For production, ensure:

1. **SPF Record** - Add an SPF record to your domain DNS
2. **DKIM** - Configure DKIM signing (handled by email provider)
3. **DMARC** - Set up DMARC policy for your domain
4. **Consistent From Address** - Use the same email for `SMTP_USER` and `SMTP_FROM_EMAIL`
5. **Valid Reply-To** - All emails include proper reply-to addresses

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
