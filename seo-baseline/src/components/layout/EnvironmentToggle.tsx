'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Top-level environment toggle between Engine and Admin modes
 * Engine = public-facing syndicator tools
 * Admin = internal management and oversight
 */
export function EnvironmentToggle() {
  const pathname = usePathname();
  
  const isEngineMode = pathname?.startsWith('/engine');
  const isAdminMode = pathname?.startsWith('/admin');

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/engine"
        className={`text-sm font-medium px-4 py-2 rounded-md transition-all ${
          isEngineMode
            ? 'text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20'
            : 'text-white/40 hover:text-white/60 hover:bg-white/5'
        }`}
      >
        Engine
      </Link>
      
      <Link
        href="/admin"
        className={`text-sm font-medium px-4 py-2 rounded-md transition-all ${
          isAdminMode
            ? 'text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20'
            : 'text-white/40 hover:text-white/60 hover:bg-white/5'
        }`}
      >
        Admin
      </Link>
    </div>
  );
}
