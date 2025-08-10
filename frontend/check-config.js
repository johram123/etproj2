// Configuration checker for Auth0 setup
// Run this file to verify your environment configuration

const fs = require("fs");
const path = require("path");

console.log("🔍 Auth0 Configuration Checker");
console.log("===============================\n");

// Check if .env.local exists
const envPath = path.join(__dirname, ".env.local");
if (!fs.existsSync(envPath)) {
  console.log("❌ .env.local file not found!");
  console.log("Please create it with your Auth0 configuration.\n");
  process.exit(1);
}

// Read and parse .env.local
const envContent = fs.readFileSync(envPath, "utf8");
const envVars = {};

envContent.split("\n").forEach((line) => {
  if (line.trim() && !line.startsWith("#")) {
    const [key, value] = line.split("=");
    if (key && value) {
      envVars[key.trim()] = value.trim().replace(/['"]/g, "");
    }
  }
});

// Required environment variables
const requiredVars = [
  "AUTH0_SECRET",
  "AUTH0_BASE_URL",
  "AUTH0_ISSUER_BASE_URL",
  "AUTH0_CLIENT_ID",
  "AUTH0_CLIENT_SECRET",
  "AUTH0_AUDIENCE",
  "NEXT_PUBLIC_AUTH0_AUDIENCE",
];

let allConfigured = true;

console.log("Environment Variables:");
console.log("----------------------");

requiredVars.forEach((varName) => {
  const value = envVars[varName];
  const isConfigured =
    value &&
    !value.includes("YOUR_") &&
    value !== "your-32-character-random-string";

  if (isConfigured) {
    console.log(`✅ ${varName}: Configured`);
  } else {
    console.log(`❌ ${varName}: ${value ? "Needs configuration" : "Missing"}`);
    allConfigured = false;
  }
});

console.log("\n");

if (allConfigured) {
  console.log("🎉 All environment variables are configured!");
  console.log("You can now run: npm run dev");
} else {
  console.log("⚠️  Please configure the missing environment variables.");
  console.log("\nAuth0 Setup Steps:");
  console.log("1. Create Auth0 account at https://auth0.com");
  console.log("2. Create a Single Page Application");
  console.log("3. Create an API for your backend");
  console.log("4. Update .env.local with your configuration");
}

console.log("\nCallback URLs to configure in Auth0:");
console.log("- Allowed Callback URLs: http://localhost:3000/api/auth/callback");
console.log("- Allowed Logout URLs: http://localhost:3000");
console.log("- Allowed Web Origins: http://localhost:3000");
