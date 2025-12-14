import type { SubmitInterestInput, SubmitInterestResult } from "./types"

export async function submitInterest(
  input: SubmitInterestInput
): Promise<SubmitInterestResult> {
  try {
    const res = await fetch("/api/interest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    })

    const data = await res.json().catch(() => null)

    if (!res.ok) {
      return {
        success: false,
        error:
          data?.error ??
          `Request failed with status ${res.status}`,
      }
    }

    return { success: true }
  } catch (err) {
    return {
      success: false,
      error:
        err instanceof Error
          ? err.message
          : "Unknown network error",
    }
  }
}
