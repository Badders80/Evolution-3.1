"use client"

import { useState, useCallback } from "react"
import {
  submitInterest,
  type SubmitInterestInput,
  type SubmitInterestResult,
} from "@/services/interest"

export type UseInterestReturn = {
  submit: (input: SubmitInterestInput) => Promise<SubmitInterestResult>
  isSubmitting: boolean
}

export function useInterest(): UseInterestReturn {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = useCallback(
    async (input: SubmitInterestInput): Promise<SubmitInterestResult> => {
      if (isSubmitting) {
        return {
          success: false,
          error: "Submission already in progress",
        }
      }

      setIsSubmitting(true)

      try {
        return await submitInterest(input)
      } finally {
        setIsSubmitting(false)
      }
    },
    [isSubmitting]
  )

  return {
    submit,
    isSubmitting,
  }
}
