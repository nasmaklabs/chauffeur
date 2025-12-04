# Netlify Deployment Guide

## NextAuth Callback Hanging Issue - FIXED

The authentication callback was hanging due to several serverless-specific issues that have been resolved.

## Required Environment Variables

Set these in your Netlify dashboard under **Site settings > Environment variables**:

### 1. AUTH_URL (CRITICAL)
```
AUTH_URL=https://aacomfert.netlify.app
```
**This is the most important variable** - without it, NextAuth callbacks will hang.

### 2. AUTH_SECRET
Generate a secure secret:
```bash
openssl rand -base64 32
```
Then add it:
```
AUTH_SECRET=your-generated-secret-here
```

### 3. DATABASE_URL
```
DATABASE_URL=postgresql://user:password@host:5432/database
```

### 4. Other Variables
```
NODE_ENV=production
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-api-key
```

## Changes Made

### 1. Created `netlify.toml`
- Configured Next.js plugin
- Set proper redirects for serverless functions
- Optimized build settings

### 2. Updated Prisma Configuration (`lib/prisma.ts`)
- Added connection pooling optimization for serverless
- Implemented proper cleanup on function completion
- Added logging configuration

### 3. Enhanced Auth Configuration
- Added timeout protection (8-second timeout for DB queries)
- Better error handling to prevent hanging
- Added debug mode for development
- Improved error recovery

### 4. Database Query Optimization
- Added timeout wrapper for user queries
- Returns null instead of throwing to prevent hanging
- Race condition protection against slow DB responses

## Deployment Steps

1. **Set Environment Variables** in Netlify dashboard
2. **Push changes** to your repository
3. **Redeploy** on Netlify
4. **Test** the login at: `https://aacomfert.netlify.app/admin/login`

## Troubleshooting

### If login still hangs:

1. **Check Netlify Function Logs**:
   - Go to Netlify dashboard > Functions
   - Look for errors in the `___netlify-handler` function

2. **Verify Database Connection**:
   ```bash
   # Test DATABASE_URL is accessible from Netlify
   # Check if your database allows connections from Netlify's IPs
   ```

3. **Check Function Timeout**:
   - Free tier: 10 seconds max
   - Pro tier: 26 seconds max
   - Our timeout is set to 8 seconds to stay within limits

4. **Enable Debug Logs** (temporarily):
   Add to Netlify environment variables:
   ```
   NEXTAUTH_DEBUG=true
   ```

### Common Issues:

- **Missing AUTH_URL**: Most common cause of hanging
- **Database connection pool exhausted**: Use connection pooling (PgBouncer recommended)
- **Slow database response**: Consider upgrading database or using connection pooling
- **Function timeout**: Queries must complete within 10 seconds

## Database Recommendations for Serverless

For production, consider:
- **Supabase** (PostgreSQL with connection pooling)
- **PlanetScale** (MySQL with serverless driver)
- **Neon** (PostgreSQL optimized for serverless)
- **Railway** with PgBouncer

## Testing Locally

Test with production-like settings:
```bash
# Set environment variables
export AUTH_URL="http://localhost:3000"
export AUTH_SECRET="your-secret"
export DATABASE_URL="your-db-url"

# Run production build
npm run build
npm start
```

## Support

If issues persist, check:
1. Netlify function logs
2. Database connection limits
3. Network connectivity between Netlify and database
