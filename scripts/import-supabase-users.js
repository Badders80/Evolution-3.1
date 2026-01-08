const fs = require("node:fs/promises");
const path = require("node:path");

const GOOGLE_SHEETS_WEB_APP_URL =
  process.env.GOOGLE_SHEETS_WEB_APP_URL ||
  "https://script.google.com/macros/s/AKfycbxjA6QWVzkqCqLrDN2QJ_vniL-UJy7RJtgn2ydLXJMw-_UGwJG2Sc9ys41UQYeW5J4/exec";

function parseCsvLine(line) {
  return line.split(",").map((value) => value.trim());
}

function parseTsvLine(line) {
  return line.split("\t").map((value) => value.trim());
}

function normalize(value) {
  if (!value || value === "-") return "";
  return value;
}

async function loadUsers(filePath) {
  const raw = await fs.readFile(filePath, "utf8");
  const lines = raw.split(/\r?\n/).filter(Boolean);
  const header = parseCsvLine(lines[0]);
  const rows = lines.slice(1);

  return rows.map((line) => {
    const values = parseCsvLine(line);
    const record = {};
    header.forEach((key, idx) => {
      record[key] = values[idx] ?? "";
    });
    return {
      firstName: normalize(record["First Name"]),
      lastName: normalize(record["Last Name"]),
      email: normalize(record["Email"]).toLowerCase(),
      role: normalize(record["Role"]),
      status: normalize(record["Status"]),
      source: normalize(record["Source"]),
    };
  });
}

async function loadAuth(filePath) {
  const raw = await fs.readFile(filePath, "utf8");
  const lines = raw.split(/\r?\n/).filter(Boolean);
  const header = parseTsvLine(lines[0]);
  const rows = lines.slice(1);

  return rows.map((line) => {
    const values = parseTsvLine(line);
    const record = {};
    header.forEach((key, idx) => {
      record[key] = values[idx] ?? "";
    });

    return {
      uid: normalize(record["UID"]),
      displayName: normalize(record["Display Name"]),
      email: normalize(record["Email"]).toLowerCase(),
      provider: normalize(record["Providers"]),
      createdAt: normalize(record["Created At"]),
      lastSignIn: normalize(record["Last Sign In"]),
    };
  });
}

function formatName(firstName, lastName) {
  const name = [firstName, lastName].filter(Boolean).join(" ").trim();
  return name || "";
}

function normalizeProvider(provider) {
  if (!provider) return "";
  const lower = provider.toLowerCase();
  if (lower.includes("google")) return "google";
  if (lower.includes("email")) return "email";
  return lower;
}

async function postEntry(entry) {
  const res = await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Failed to import ${entry.email}: ${res.status} ${body}`);
  }
}

async function main() {
  const [usersPath, authPath] = process.argv.slice(2);
  if (!usersPath || !authPath) {
    console.error(
      "Usage: node scripts/import-supabase-users.js data/supabase-users.csv data/supabase-auth.tsv"
    );
    process.exit(1);
  }

  const [users, authEntries] = await Promise.all([
    loadUsers(path.resolve(usersPath)),
    loadAuth(path.resolve(authPath)),
  ]);

  const authByEmail = new Map(
    authEntries.map((entry) => [entry.email, entry])
  );

  const merged = users.map((user) => {
    const auth = authByEmail.get(user.email);
    const name = auth?.displayName || formatName(user.firstName, user.lastName);

    return {
      email: user.email,
      name,
      provider: normalizeProvider(auth?.provider || ""),
      providerAccountId: auth?.uid || "",
      campaignKey: "supabase_import",
      source: user.source || "supabase",
      createdAt: auth?.createdAt || "",
      lastSignIn: auth?.lastSignIn || "",
    };
  });

  for (const entry of merged) {
    if (!entry.email) continue;
    await postEntry(entry);
    console.log(`Imported ${entry.email}`);
  }

  console.log(`Done. Imported ${merged.length} records.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
