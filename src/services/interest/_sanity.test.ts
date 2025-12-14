import { submitInterest } from "./submitInterest"

async function run() {
  const result = await submitInterest({
    email: "sanity-check@example.com",
    campaignKey: "sanity_check",
    source: "local_test",
  })

  console.log("SANITY RESULT:", result)
}

run()
