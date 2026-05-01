// Simple test script to verify admin authentication works
// Run with: node test-admin-auth.js

const fetch = require("node-fetch");

async function testAdminAuth() {
  const baseUrl = "http://localhost:3000";
  const testToken = "test-admin-token-123";

  console.log("Testing admin authentication...");

  // Test 1: Access without token (should fail)
  console.log("\n1. Testing without token (should fail):");
  try {
    const response1 = await fetch(`${baseUrl}/api/admin`);
    console.log(`Status: ${response1.status} - ${response1.statusText}`);
    if (response1.status === 401) {
      console.log("✅ PASS: Correctly rejected unauthorized access");
    } else {
      console.log("❌ FAIL: Should have returned 401");
    }
  } catch (error) {
    console.log("❌ FAIL: Request failed:", error.message);
  }

  // Test 2: Access with invalid token (should fail)
  console.log("\n2. Testing with invalid token (should fail):");
  try {
    const response2 = await fetch(`${baseUrl}/api/admin`, {
      headers: { "x-admin-token": "invalid-token" },
    });
    console.log(`Status: ${response2.status} - ${response2.statusText}`);
    if (response2.status === 401) {
      console.log("✅ PASS: Correctly rejected invalid token");
    } else {
      console.log("❌ FAIL: Should have returned 401");
    }
  } catch (error) {
    console.log("❌ FAIL: Request failed:", error.message);
  }

  // Test 3: Access with valid token (should succeed)
  console.log("\n3. Testing with valid token (should succeed):");
  try {
    const response3 = await fetch(`${baseUrl}/api/admin`, {
      headers: { "x-admin-token": testToken },
    });
    console.log(`Status: ${response3.status} - ${response3.statusText}`);
    if (response3.status === 200) {
      console.log("✅ PASS: Correctly accepted valid token");
      const data = await response3.json();
      console.log("Data received:", JSON.stringify(data, null, 2));
    } else {
      console.log("❌ FAIL: Should have returned 200");
    }
  } catch (error) {
    console.log("❌ FAIL: Request failed:", error.message);
  }
}

testAdminAuth().catch(console.error);
