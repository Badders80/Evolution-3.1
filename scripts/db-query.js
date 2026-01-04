#!/usr/bin/env node

/**
 * Supabase Database Manager - Run any SQL from VS Code
 * Usage: node scripts/db-query.js "SELECT * FROM owners"
 */

const https = require('https');

const ACCESS_TOKEN = 'sbp_7d807f27a2680cea34335d53b884689c2acdecf4';
const PROJECT_REF = 'coqtijrftaklcwgbnqef';

function runSQL(sql) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ query: sql });

    const options = {
      hostname: 'api.supabase.com',
      port: 443,
      path: `/v1/projects/${PROJECT_REF}/database/query`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(body || '[]'));
        } else {
          reject(new Error(`API returned ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function main() {
  const sql = process.argv[2];

  if (!sql) {
    console.log('Usage: node scripts/db-query.js "YOUR SQL HERE"');
    console.log('');
    console.log('Examples:');
    console.log('  node scripts/db-query.js "SELECT * FROM owners"');
    console.log('  node scripts/db-query.js "UPDATE owners SET phone = ... WHERE id = ..."');
    console.log('  node scripts/db-query.js "DELETE FROM owners WHERE email = ..."');
    console.log('  node scripts/db-query.js "ALTER TABLE owners ADD COLUMN new_field text"');
    process.exit(1);
  }

  console.log('🔍 Executing SQL:\n');
  console.log(sql);
  console.log('\n⏳ Running...\n');

  try {
    const result = await runSQL(sql);
    
    if (Array.isArray(result) && result.length > 0) {
      console.log('📊 Results:\n');
      console.table(result);
    } else if (Array.isArray(result) && result.length === 0) {
      console.log('✅ Query executed successfully (no results returned)');
    } else {
      console.log('✅ Query executed successfully');
      console.log(JSON.stringify(result, null, 2));
    }
  } catch (error) {
    console.error('❌ Query failed:', error.message);
    process.exit(1);
  }
}

main();
