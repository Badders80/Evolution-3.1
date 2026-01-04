'use client';

import React from 'react';
import Link from 'next/link';
import { TypeFx } from '@once-ui-system/core';

export function Footer() {
  return (
    <footer className="relative bg-black overflow-hidden">
      <div className="mx-auto flex max-w-6xl flex-col px-8 pt-16 pb-12 md:px-16 md:pt-24 md:pb-16">
        {/* Hero Tagline - Centerpiece */}
        <div className="flex flex-col items-center justify-center text-center py-16 md:py-24 animate-fade-in">
          <div className="max-w-4xl space-y-8">
            <div className="flex flex-col items-center gap-2">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-white tracking-tight">
                The Future of Ownership
              </h2>
              <TypeFx
                words="Has Arrived"
                speed={100}
                delay={500}
                trigger="instant"
                loop={false}
                className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-white"
              />
            </div>
            <p className="text-sm md:text-base font-light text-gray-400">
              Digital-Syndication, by Evolution Stables, Powered By Tokinvest
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12"></div>

        {/* Bottom Section - Footer Bar */}
        <div className="flex flex-col gap-6 text-xs text-muted md:flex-row md:justify-between md:items-center">
          {/* Left: Legal Links & Copyright */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-3 [&_a]:transition-colors [&_a]:font-extralight">
              <Link href="/privacy" className="leading-tight" style={{ color: 'rgba(255, 255, 255, 0.6)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 1)'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}>
                Privacy Policy
              </Link>
              <Link href="/terms" className="leading-tight" style={{ color: 'rgba(255, 255, 255, 0.6)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 1)'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}>
                Terms of Service
              </Link>
            </div>
            <p className="text-xs leading-tight font-extralight" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              &copy; 2025 Evolution Stables.
            </p>
          </div>

          {/* Right: Social Icons */}
          <div className="flex items-center justify-start gap-6 md:justify-end">
            <a
              href="https://x.com/evostables"
              target="_blank"
              rel="noopener noreferrer"
              className="transition flex items-center"
              style={{ color: 'rgba(255, 255, 255, 0.6)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 1)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}
              aria-label="Follow us on X"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://instagram.com/evostables"
              target="_blank"
              rel="noopener noreferrer"
              className="transition flex items-center"
              style={{ color: 'rgba(255, 255, 255, 0.6)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 1)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}
              aria-label="Follow us on Instagram"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/alex-baddeley/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition flex items-center"
              style={{ color: 'rgba(255, 255, 255, 0.6)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 1)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}
              aria-label="Connect on LinkedIn"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="mailto:alex@evolutionstables.nz"
              className="transition flex items-center"
              style={{ color: 'rgba(255, 255, 255, 0.6)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 1)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}
              aria-label="Send us an email"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

