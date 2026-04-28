// Script to set up admin authentication
// Run with: node setup-admin.js

const fs = require('fs');
const path = require('path');

function generateRandomSecret(length = 32) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function setupAdmin() {
  const envPath = path.join(__dirname, '.env.local');
  const adminSecret = generateRandomSecret();
  
  console.log('Setting up admin authentication...');
  console.log('Generated admin secret:', adminSecret);
  
  // Check if .env.local exists
  let envContent = '';
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
    
    // Remove existing ADMIN_SECRET_KEY if it exists
    envContent = envContent.replace(/ADMIN_SECRET_KEY=.*\n/g, '');
  }
  
  // Add the new admin secret
  envContent += `\n# Admin authentication\nADMIN_SECRET_KEY=${adminSecret}\n`;
  
  // Write back to file
  fs.writeFileSync(envPath, envContent, 'utf8');
  
  console.log('✅ Admin authentication setup complete!');
  console.log('✅ ADMIN_SECRET_KEY added to .env.local');
  console.log('\n📝 Next steps:');
  console.log('1. Restart your development server');
  console.log('2. Visit http://localhost:3000/admin');
  console.log('3. Use this token when prompted:', adminSecret);
  console.log('\n🔒 Security note: Keep this token secure!');
}

setupAdmin();