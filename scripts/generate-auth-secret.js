#!/usr/bin/env node

/**
 * Generate a secure AUTH_SECRET for NextAuth
 * 
 * Usage:
 *   node scripts/generate-auth-secret.js
 * 
 * Or make it executable and run:
 *   chmod +x scripts/generate-auth-secret.js
 *   ./scripts/generate-auth-secret.js
 */

const crypto = require('crypto');

const secret = crypto.randomBytes(32).toString('base64');

console.log('\n🔐 Generated AUTH_SECRET:\n');
console.log(secret);
console.log('\n📋 Add this to your Netlify environment variables:');
console.log('   Variable name:  AUTH_SECRET');
console.log(`   Variable value: ${secret}`);
console.log('\n⚠️  Keep this secret safe and never commit it to version control!\n');
