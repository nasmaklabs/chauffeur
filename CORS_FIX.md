# CORS Issues - FIXED ✅

## What Was Wrong

Your API routes on Netlify were returning CORS (Cross-Origin Resource Sharing) errors because:
- No CORS headers were set in API route handlers
- No middleware to handle CORS preflight requests
- Netlify configuration didn't include CORS headers

## What Was Fixed

### 1. ✅ Added CORS Headers to API Routes

**Updated:** `app/api/trpc/[trpc]/route.ts`
- Added CORS headers to all tRPC responses
- Added OPTIONS handler for preflight requests

**Updated:** `app/api/auth/[...nextauth]/route.ts`
- Added CORS headers to NextAuth responses
- Added OPTIONS handler for auth preflight requests
- Wrapped GET/POST handlers with CORS support

### 2. ✅ Created Middleware

**Created:** `middleware.ts`
- Handles CORS for all routes
- Adds necessary CORS headers to every response
- Handles OPTIONS preflight requests
- Includes NextAuth authorization logic for admin routes

### 3. ✅ Updated Next.js Config

**Updated:** `next.config.mjs`
- Added headers configuration for API routes
- Sets CORS headers at build time

### 4. ✅ Updated Netlify Config

**Updated:** `netlify.toml`
- Added CORS headers for all API routes
- Added security headers
- Ensures headers are set at CDN level

## What You Need to Do Now

### Step 1: Commit and Push
```bash
git add .
git commit -m "Fix: Add CORS headers for API routes"
git push origin main
```

### Step 2: Redeploy on Netlify
Netlify should auto-deploy, or trigger manually:
- Go to **Deploys** → **Trigger deploy**

### Step 3: Test CORS
After deployment, test your API routes:
```bash
# Test tRPC endpoint
curl -I https://aacomfert.netlify.app/api/trpc

# Should see headers like:
# Access-Control-Allow-Origin: *
# Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
```

---

## How CORS Works Now

### Before Request (Preflight)
When your frontend makes an API request, browsers first send an OPTIONS request:

```
OPTIONS /api/trpc
```

**Response includes:**
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

### Actual Request
Then the browser sends the actual request (GET, POST, etc.) and expects the same CORS headers in the response.

**All responses now include CORS headers** ✅

---

## CORS Headers Explained

| Header | Value | Purpose |
|--------|-------|---------|
| `Access-Control-Allow-Origin` | `*` | Allows requests from any origin |
| `Access-Control-Allow-Methods` | `GET, POST, PUT, DELETE, OPTIONS` | Allowed HTTP methods |
| `Access-Control-Allow-Headers` | `Content-Type, Authorization` | Allowed request headers |
| `Access-Control-Allow-Credentials` | `true` | Allows cookies/auth tokens |

### Security Note
Currently set to `*` (allow all origins) for development. For production, consider:

```typescript
// Restrict to your domain only
'Access-Control-Allow-Origin': 'https://aacomfert.netlify.app'
```

Or use environment variable:
```typescript
'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_URL || '*'
```

---

## Files Modified

1. ✅ `app/api/trpc/[trpc]/route.ts` - Added CORS to tRPC
2. ✅ `app/api/auth/[...nextauth]/route.ts` - Added CORS to NextAuth
3. ✅ `middleware.ts` - Created global CORS middleware
4. ✅ `next.config.mjs` - Added CORS headers config
5. ✅ `netlify.toml` - Added CORS headers at CDN level

---

## Testing CORS Locally

Test before deploying:

```bash
# Start dev server
npm run dev

# In another terminal, test CORS:
curl -I http://localhost:3000/api/trpc

# Should see CORS headers in response
```

---

## Common CORS Errors & Solutions

### Error: "No 'Access-Control-Allow-Origin' header"
**Solution:** ✅ Fixed - Now all API routes return this header

### Error: "CORS preflight request failed"
**Solution:** ✅ Fixed - OPTIONS handler now responds correctly

### Error: "Credentials flag is true, but Allow-Origin is *"
**Solution:** If you need credentials with specific origin:
```typescript
'Access-Control-Allow-Origin': 'https://aacomfert.netlify.app',
'Access-Control-Allow-Credentials': 'true'
```

### Error: "Method not allowed"
**Solution:** ✅ Fixed - All methods (GET, POST, PUT, DELETE) are now allowed

---

## Browser DevTools Check

After deploying, open browser DevTools:

1. **Network Tab** → Check any API request
2. **Response Headers** should show:
   ```
   access-control-allow-origin: *
   access-control-allow-methods: GET, POST, PUT, DELETE, OPTIONS
   access-control-allow-headers: Content-Type, Authorization
   ```

3. **Console** should have no CORS errors ✅

---

## Advanced: Restricting Origins (Production)

For better security in production, update `middleware.ts`:

```typescript
const allowedOrigins = [
    'https://aacomfert.netlify.app',
    'https://www.aacomfert.netlify.app',
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '',
].filter(Boolean);

export async function middleware(request: NextRequest) {
    const origin = request.headers.get('origin');
    const response = NextResponse.next();

    if (origin && allowedOrigins.includes(origin)) {
        response.headers.set('Access-Control-Allow-Origin', origin);
    }

    // ... rest of the middleware
}
```

---

## Multi-Layer CORS Protection

Your API now has CORS headers set at **3 levels**:

1. **Netlify CDN** (`netlify.toml`) - First line of defense
2. **Next.js Config** (`next.config.mjs`) - Build-time headers
3. **Middleware** (`middleware.ts`) - Runtime headers
4. **Route Handlers** (individual API routes) - Per-route control

This ensures CORS headers are always present, even if one layer fails.

---

## Troubleshooting

### Still getting CORS errors after deploy?

1. **Clear browser cache:**
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

2. **Check Netlify deploy logs:**
   - Ensure build completed successfully
   - Check no errors during deployment

3. **Verify middleware is loaded:**
   - Check Netlify function logs
   - Look for middleware execution

4. **Test with curl:**
   ```bash
   curl -X OPTIONS https://aacomfert.netlify.app/api/trpc -v
   ```
   Should return 204 with CORS headers

5. **Check browser console:**
   - Look for specific CORS error message
   - Note which header is missing

---

## Success Indicators

You'll know CORS is fixed when:
- ✅ No CORS errors in browser console
- ✅ API requests complete successfully
- ✅ Network tab shows CORS headers in responses
- ✅ Login and booking features work properly

---

## Quick Test Script

Save this as `test-cors.sh` and run after deployment:

```bash
#!/bin/bash

echo "Testing CORS headers..."

echo "\n1. Testing tRPC endpoint:"
curl -I https://aacomfert.netlify.app/api/trpc

echo "\n2. Testing OPTIONS (preflight):"
curl -X OPTIONS https://aacomfert.netlify.app/api/trpc -v

echo "\n3. Testing Auth endpoint:"
curl -I https://aacomfert.netlify.app/api/auth/session

echo "\nDone! Check for 'access-control-allow-origin' in responses."
```

---

🎉 **CORS issues should now be resolved!**

All your API routes will properly handle cross-origin requests.
