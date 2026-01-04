'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createBrowserSupabaseClient } from '@/lib/supabase/client'

export default function AuthForm() {
  console.log('AuthForm component rendering')
  const [supabase] = useState(() => createBrowserSupabaseClient())
  const router = useRouter()
  const searchParams = useSearchParams()
  const [redirectTo, setRedirectTo] = useState<string>()
  const [isSignUp, setIsSignUp] = useState(false)

  const redirectTargetRaw = searchParams?.get('redirectedFrom') ?? '/mystable'
  const redirectTarget = redirectTargetRaw.startsWith('/') ? redirectTargetRaw : '/mystable'

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession()
        if (data?.session) {
          router.replace(redirectTarget)
        }
      } catch (error) {
        console.error('Error in checkSession:', error)
      }
    }

    checkSession()
  }, [redirectTarget, router, supabase])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.cookie = `auth_redirect_path=${encodeURIComponent(redirectTarget)}; path=/; max-age=300; SameSite=Lax`
    }
  }, [redirectTarget])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const origin = window.location.origin
      const callbackUrl = new URL('/auth/callback', origin)
      callbackUrl.searchParams.set('redirectedFrom', redirectTarget)
      setRedirectTo(callbackUrl.toString())
    }
  }, [redirectTarget])

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(event => {
      if (event === 'SIGNED_IN') {
        router.replace(redirectTarget)
      }
    })

    return () => {
      data.subscription.unsubscribe()
    }
  }, [redirectTarget, router, supabase])

  useEffect(() => {
    // Listen for changes in the Auth UI view
    const observer = new MutationObserver(() => {
      const signUpButton = document.querySelector('button[type="submit"]')?.textContent?.toLowerCase().includes('sign up')
      const signUpLink = document.querySelector('a[href*="sign_up"]')
      setIsSignUp(signUpButton === true || signUpLink !== null)
    })

    if (typeof window !== 'undefined') {
      observer.observe(document.body, { childList: true, subtree: true })
    }

    return () => observer.disconnect()
  }, [])

  console.log('Rendering Auth component with redirectTo:', redirectTo)
  
  if (!redirectTo) {
    console.log('Waiting for redirect URL to be set...')
    return <div className="text-center p-8">Loading authentication...</div>
  }

  return (
    <div className="w-full max-w-md space-y-8 text-white lg:max-w-[17rem] xl:max-w-[18.5rem] 2xl:max-w-[20rem]">
      <div className="space-y-1.5 text-center lg:text-left">
        <h1 className="text-3xl font-semibold tracking-[0.12em] text-white">{isSignUp ? 'Welcome' : 'Welcome Back'}</h1>
        <p className="text-sm text-neutral-400">Sign in to manage your stable, positions, and updates.</p>
      </div>

      <Auth
        supabaseClient={supabase}
        providers={['google']}
        redirectTo={redirectTo}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: 'rgba(255,255,255,0.03)',
                brandAccent: 'rgba(255,255,255,0.06)',
                brandButtonText: 'rgba(255,255,255,0.7)',
                defaultButtonBackground: 'rgba(255,255,255,0.03)',
                defaultButtonBackgroundHover: 'rgba(255,255,255,0.06)',
                defaultButtonText: 'rgba(255,255,255,0.7)',
                inputBackground: '#0a0a0a',
                inputBorder: 'rgba(255,255,255,0.06)',
                inputText: '#ffffff',
                inputLabelText: 'rgba(255,255,255,0.5)',
                inputPlaceholder: 'rgba(255,255,255,0.35)',
                messageText: '#ffffff',
              },
              radii: {
                borderRadiusButton: '9999px',
                inputBorderRadius: '0.75rem',
              },
              fonts: {
                bodyFontFamily: 'var(--font-sans)',
              },
            },
          },
          className: {
            container: 'space-y-4 text-white',
            anchor: '!text-white/50 hover:!text-[#d4a964] underline underline-offset-4 transition-colors duration-300',
            button:
              'h-12 rounded-full text-[11px] font-light tracking-wider uppercase transition-all duration-500 hover:scale-105 !bg-white/[0.03] hover:!bg-white/[0.06] !text-white/70 hover:!text-white !border !border-white/[0.06] hover:!border-white/[0.12]',
            input:
              'h-12 rounded-2xl border border-white/[0.06] bg-[#0a0a0a] text-sm text-white placeholder:text-white/35 focus:border-white/[0.12] focus:ring-2 focus:ring-white/[0.06] transition-all',
            label: 'text-xs uppercase tracking-[0.3em] text-white/50',
            divider: 'border-white/[0.2] my-8',
            loader: 'text-white/50',
            message: '!bg-white/[0.03] !text-white !border-white/[0.06]',
          },
        }}
      />
    </div>
  )
}
