'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LOGOS } from '@/lib/assets';
import { useSupabase, useSession } from '@/providers/supabase-provider';
import { useRouter, usePathname } from 'next/navigation';

/**
 * Navigation links configuration
 */
const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Mission', href: '/#mission' },
  { label: 'Model', href: '/#digital-syndication' },
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'MyStable', href: '/mystable' },
  { label: 'FAQ', href: '/#faq' },
];

/**
 * NavBar Component
 * 
 * A polished, x.ai-inspired navigation bar with:
 * - Glassmorphic design with smooth backdrop blur
 * - Scroll-based state changes (transparent → solid)
 * - Refined hover states with subtle glows
 * - Responsive mobile menu
 * - Session-aware authentication UI
 */
export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const { supabase } = useSupabase();
  const session: any = useSession(); // Using any as a temporary workaround
  const router = useRouter();
  const pathname = usePathname();
  const hideNav = pathname?.startsWith('/auth');

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  /**
   * Navigate to authentication page
   */
  const handleGetStarted = () => {
    const basePath =
      !pathname || pathname.startsWith('/auth') ? '/mystable' : pathname;
    const redirectTarget =
      typeof window !== 'undefined' && window.location.search
        ? `${basePath}${window.location.search}`
        : basePath;

    router.push(`/auth?redirectedFrom=${encodeURIComponent(redirectTarget)}`);
  };

  /**
   * Sign out user and refresh router
   */
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  /**
   * Track scroll position to toggle nav bar appearance
   * Uses IntersectionObserver for hero section if available, falls back to scroll listener
   */
  useEffect(() => {
    if (hideNav) {
      return;
    }

    const hero = document.getElementById('hero');
    if (hero && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          setScrolled(!entry.isIntersecting);
        },
        {
          root: null,
          rootMargin: '-64px 0px 0px 0px',
          threshold: 0,
        }
      );

      observer.observe(hero);
      return () => observer.disconnect();
    }

    // Fallback: scroll listener
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [hideNav]);

  /**
   * Delayed visibility for smooth entrance animation
   */
  useEffect(() => {
    if (hideNav) {
      return;
    }

    const timeout = window.setTimeout(() => setVisible(true), 320);
    return () => window.clearTimeout(timeout);
  }, [hideNav]);

  // Nav bar becomes solid when scrolled or menu is open
  const isSolid = scrolled || isMenuOpen;
  const logoSrc = LOGOS.simple.grey;

  /**
   * Extract user's display name from session metadata
   * Tries multiple name fields, falls back to email username
   */
  const displayName = useMemo(() => {
    if (!session) return undefined;

    const metadata = session.user?.user_metadata ?? {};
    const rawName =
      metadata.preferred_name ||
      metadata.full_name ||
      metadata.fullName ||
      metadata.first_name ||
      metadata.firstName ||
      metadata.name;

    if (typeof rawName === 'string' && rawName.trim().length > 0) {
      return rawName.trim().split(' ')[0];
    }

    const email = session.user?.email ?? '';
    if (email) {
      return email.split('@')[0];
    }

    return undefined;
  }, [session]);

  if (hideNav) {
    return null;
  }

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-[9999] w-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isSolid 
          ? 'bg-black/80 text-white' 
          : 'bg-black/40 text-white'
      } ${visible ? 'opacity-100 translate-y-0' : '-translate-y-4 opacity-0'}`}
      style={{ 
        backdropFilter: 'blur(24px) saturate(120%)', 
        WebkitBackdropFilter: 'blur(24px) saturate(120%)',
        maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
      }}
    >
      <div className="mx-auto flex h-20 w-full max-w-[1440px] items-center px-6 sm:px-10 lg:px-12">
        {/* Logo */}
        <div className="flex flex-1 items-center">
          <Link
            href="/"
            className="group flex shrink-0 items-center transition-all duration-300 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary/50 rounded-sm"
          >
            <div className="relative h-7 w-auto">
              <Image
                src={logoSrc}
                alt="Evolution Stables"
                width={192}
                height={64}
                className="h-full w-auto transition-all duration-300 group-hover:opacity-80"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center">
          <div className="flex items-center gap-0">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="group relative flex items-center"
              >
                <Link
                  href={link.href}
                  className="relative inline-flex items-center whitespace-nowrap px-2.5 py-4 text-[12px] font-[300] tracking-[0.15em] uppercase transition-all duration-300 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary/50 rounded-sm"
                  style={{ color: 'rgba(255, 255, 255, 0.6)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 1)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}
                >
                  <span className="relative z-10">{link.label}</span>
                </Link>
                <span className="absolute bottom-2 left-2.5 right-2.5 h-[0.5px] origin-left scale-x-0 bg-[#d4a964] transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-x-100" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side Actions: Session Badge, CTA Button, Menu Toggle */}
        <div className="ml-auto flex items-center gap-2 lg:ml-0 lg:flex-1 lg:justify-end lg:gap-4">
          {session && (
            <span className="hidden whitespace-nowrap rounded-full border border-white/[0.06] bg-white/[0.02] px-5 py-2.5 text-[11px] font-light tracking-wider uppercase text-white/50 backdrop-blur-sm lg:inline-flex transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04] hover:text-white/70">
              Hi,&nbsp;{displayName ?? 'friend'}
            </span>
          )}
          {!session && (
            <div className="relative group hidden lg:block">
              {/* Subtle breathing glow on hover */}
              <div className="absolute -inset-[2px] rounded-full bg-gradient-to-r from-white/5 via-white/10 to-white/5 blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
              {/* Gold accent on hover - bottom highlight */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] w-0 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 blur-[2px] group-hover:w-full group-hover:opacity-100 transition-all duration-500 ease-out" />
              <button
                onClick={handleGetStarted}
                className="relative inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-2.5 text-[11px] font-light tracking-wider uppercase text-white/70 transition-all duration-300 hover:text-white hover:scale-105 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary/50 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.12] overflow-hidden"
              >
                {/* Gentle shimmer animation - avoids center for text clarity */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent animate-shimmer opacity-50" />
                <span className="relative z-10 inline-block transition-all duration-300 group-hover:scale-110">Get Started</span>
              </button>
            </div>
          )}
          {session && (
            <button
              onClick={handleSignOut}
              className="hidden lg:inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-2.5 text-[11px] font-light tracking-wider uppercase text-white/70 transition-all duration-300 hover:text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary/50 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.12]"
            >
              Sign Out
            </button>
          )}
          {/* Hamburger Menu - Mobile Only */}
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center text-secondary/90 transition-all duration-300 hover:text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary/50 rounded-lg hover:bg-white/[0.04] lg:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isMenuOpen ? (
              <svg className="h-5 w-5 transition-transform duration-300 rotate-0 hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/80 backdrop-blur-2xl border-t border-white/[0.03]" style={{ backdropFilter: 'blur(40px) saturate(150%)' }}>
          <div className="space-y-1 px-6 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group block rounded-xl px-4 py-3.5 text-[14px] font-light tracking-wide uppercase text-white/60 transition-all duration-300 hover:bg-white/[0.04] hover:text-white active:scale-[0.98]"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="relative">
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-gradient-to-r from-primary/0 via-primary to-primary/0 transition-all duration-300 group-hover:w-full" />
                </span>
              </Link>
            ))}

            <div className="space-y-3 pt-6 border-t border-white/[0.05] mt-4">
              {session && (
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5 text-center text-[11px] font-light tracking-wider uppercase text-white/50 backdrop-blur-sm transition-all duration-300">
                  Hi,&nbsp;{displayName ?? 'friend'}
                </div>
              )}
              <button
                onClick={async () => {
                  if (session) {
                    await handleSignOut();
                  } else {
                    handleGetStarted();
                  }
                  setIsMenuOpen(false);
                }}
                className="w-full block rounded-full bg-gradient-to-b from-primary via-primary to-primary/90 px-4 py-3 text-center text-label uppercase text-black font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,169,100,0.3)] hover:brightness-110 active:scale-[0.98]"
              >
                {session ? 'Sign Out' : 'Get Started'}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
