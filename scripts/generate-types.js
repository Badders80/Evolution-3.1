#!/usr/bin/env node

/**
 * Generate TypeScript types from Supabase database schema
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const ACCESS_TOKEN = 'sbp_7d807f27a2680cea34335d53b884689c2acdecf4';
const PROJECT_REF = 'coqtijrftaklcwgbnqef';

function generateTypes() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.supabase.com',
      port: 443,
      path: `/v1/projects/${PROJECT_REF}/types/typescript`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(body);
        } else {
          reject(new Error(`API returned ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function main() {
  console.log('🔍 Generating TypeScript types from Supabase schema...\n');

  try {
    const types = await generateTypes();
    
    const outputPath = path.join(__dirname, '..', 'src', 'lib', 'supabase.types.ts');
    fs.writeFileSync(outputPath, types);

    console.log('✅ Types generated successfully!');
    console.log(`📁 Saved to: ${outputPath}`);
    console.log('\n📊 Generated types include:');
    console.log('  - Database["public"]["Tables"]["owners"]["Row"]');
    console.log('  - Database["public"]["Tables"]["owners"]["Insert"]');
    console.log('  - Database["public"]["Tables"]["horses"]["Row"]');
    console.log('  - Database["public"]["Tables"]["term_sheets"]["Row"]');
    console.log('  - And all other tables...');
    console.log('\n🎉 Now update your Supabase client to use these types!');
  } catch (error) {
    console.error('❌ Failed to generate types:', error.message);
    process.exit(1);
  }
}

main();
