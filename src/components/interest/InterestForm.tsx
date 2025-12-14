"use client"

import { FormEvent, useEffect, useRef, useState } from "react"
import { useInterest } from "@/hooks/useInterest"

export type InterestFormProps = {
  campaignKey: string
  source?: string
  onSuccess: () => void
  onCancel?: () => void
}

export function InterestForm({
  campaignKey,
  source,
  onSuccess,
  onCancel,
}: InterestFormProps) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { submit, isSubmitting } = useInterest()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = async (event?: FormEvent) => {
    event?.preventDefault()
    setError(null)

    const nextEmail = email.trim()
    if (!nextEmail || isSubmitting) return

    const result = await submit({
      email: nextEmail,
      campaignKey,
      source,
    })

    if (result.success) {
      setEmail("")
      onSuccess()
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="space-y-2">
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap items-center gap-2"
      >
        <input
          ref={inputRef}
          type="email"
          required
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-56 rounded-md border border-neutral-700 bg-transparent px-3 py-2 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-neutral-100 px-4 py-2 text-sm text-neutral-900 disabled:opacity-50"
        >
          {isSubmitting ? "Sending…" : "Send"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-xs text-neutral-500 underline-offset-4 hover:text-neutral-300"
          >
            Cancel
          </button>
        )}
      </form>
      {error && (
        <p className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
