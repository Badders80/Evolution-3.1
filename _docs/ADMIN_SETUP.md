# Admin Authentication Setup

## Overview
This document explains how to set up and use the admin authentication system for the Evolution Stables platform.

## Security Implementation

The admin dashboard (`/admin`) and API (`/api/admin`) are now protected by token-based authentication:

### Authentication Methods
1. **Header-based**: `x-admin-token: your-secret-token`
2. **Query parameter**: `?admin_token=your-secret-token`
3. **Authorization header**: `Authorization: Bearer your-secret-token`

### Environment Variables
Add to your `.env.local`:
```bash
ADMIN_SECRET_KEY=your-long-random-secret-token-here
```

## Setup Instructions

### Quick Setup
Run the setup script:
```bash
node setup-admin.js
```

This will:
1. Generate a secure random token
2. Add it to your `.env.local` file
3. Provide instructions for next steps

### Manual Setup
1. Generate a secure token (32+ characters with mixed case, numbers, symbols)
2. Add to `.env.local`:
   ```bash
   ADMIN_SECRET_KEY=your-generated-token-here
   ```
3. Restart your development server

## Usage

### Accessing the Admin Dashboard
1. Visit `http://localhost:3000/admin`
2. Enter your admin token when prompted
3. You'll have access to:
   - Investor statistics
   - KYC queue management
   - Holdings overview
   - Transaction history

### API Access
```bash
# Using curl
curl -H "x-admin-token: YOUR_TOKEN" http://localhost:3000/api/admin

# Using fetch
fetch('/api/admin', {
  headers: { 'x-admin-token': 'YOUR_TOKEN' }
})
```

## Security Features

- ✅ Token-based authentication
- ✅ Environment variable storage
- ✅ Multiple authentication methods supported
- ✅ Automatic redirect on failed authentication
- ✅ Session storage for browser access
- ✅ Proper HTTP status codes (401 for unauthorized)

## Data Protection

The admin system provides access to sensitive information:
- Investor emails and personal details
- Wallet addresses
- KYC status
- Investment holdings
- Transaction hashes

All access is now properly authenticated and secured.

## Testing

Run the test script to verify authentication works:
```bash
node test-admin-auth.js
```

## Production Deployment

For production deployment:
1. Set `ADMIN_SECRET_KEY` in your production environment
2. Ensure the token is sufficiently complex
3. Rotate tokens regularly as a security best practice
4. Monitor access logs for suspicious activity

## Troubleshooting

### Common Issues
1. **"Unauthorized" error**: Check your token matches `ADMIN_SECRET_KEY`
2. **Token not working**: Restart server after changing environment variables
3. **Page not loading**: Ensure you're accessing `/admin` not `/admin/`

### Support
If you encounter issues, check:
- Environment variables are properly set
- Server is restarted after changes
- Token is correctly formatted