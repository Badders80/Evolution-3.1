'use client'

import { Suspense } from 'react'
import AuthForm from '@/components/auth/AuthForm'

export default function AuthPage() {
  return (
    <div className="flex min-h-screen w-full bg-black text-white">
      <div className="relative hidden h-screen overflow-hidden lg:block lg:w-1/2">
        <video
          autoPlay
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover object-[center_70%]"
        >
          <source src="/images/Jockey-walk-out.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="flex w-full min-h-screen items-center justify-center px-8 py-16 lg:w-1/2">
        <Suspense
          fallback={
            <div className="text-sm uppercase tracking-[0.3em] text-white/60">Loading...</div>
          }
        >
          <AuthForm />
        </Suspense>
      </div>
    </div>
  )
}
