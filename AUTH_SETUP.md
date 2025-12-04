# Authentication Setup Guide

## Required Environment Variables

Add these to your `.env` file:

```env
# NextAuth Configuration
AUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

### Generate AUTH_SECRET

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

Or visit: https://generate-secret.vercel.app/32

## Initial Admin User

After setting up your MongoDB connection and running `npx prisma db push`, create an initial admin user:

```bash
npm run seed:admin
```

This will create an admin user with:
- **Email:** admin@luxeride.com
- **Password:** admin123

⚠️ **IMPORTANT:** Change this password immediately after first login!

## Login

Visit: http://localhost:3000/admin/login

## Features

- ✅ Secure password hashing with bcrypt
- ✅ Session-based authentication
- ✅ Protected admin routes
- ✅ User management (add/delete users)
- ✅ Automatic redirect to login for unauthorized access
- ✅ Logout functionality

## Admin Pages

- `/admin` - Dashboard
- `/admin/login` - Login page
- `/admin/change-password` - Change your password
- `/admin/users` - User management
- `/admin/bookings` - Bookings management

## Change Password

After first login with the default credentials:

1. Click "Change Password" button in the admin header (top right)
2. Or visit: http://localhost:3000/admin/change-password
3. Enter current password and new password
4. Submit to update

