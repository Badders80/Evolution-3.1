export type SubmitInterestInput = {
  email: string
  campaignKey: string
  source?: string
}

export type SubmitInterestResult =
  | { success: true }
  | { success: false; error: string }
