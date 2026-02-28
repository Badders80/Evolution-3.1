'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Environment-aware breadcrumb component
 * Shows breadcrumb trail for nested pages only
 */
export function Breadcrumbs() {
  const pathname = usePathname();
  
  if (!pathname) return null;
  
  const isEngineMode = pathname.startsWith('/engine');
  const isAdminMode = pathname.startsWith('/admin');
  
  if (!isEngineMode && !isAdminMode) return null;
  
  // Split path and create breadcrumb segments
  const segments = pathname.split('/').filter(Boolean);
  segments.shift(); // Remove 'engine' or 'admin' from segments
  
  // Don't show breadcrumbs on home pages (/engine or /admin)
  if (segments.length === 0) return null;
  
  const environment = isEngineMode ? 'Engine' : 'Admin';
  const baseHref = isEngineMode ? '/engine' : '/admin';
  
  // Build breadcrumb items
  const breadcrumbs = segments.map((segment, index) => {
    const href = `${baseHref}/${segments.slice(0, index + 1).join('/')}`;
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    return { href, label };
  });

  return (
    <nav className="flex items-center gap-2 text-sm text-white/40" aria-label="Breadcrumb">
      <Link 
        href={baseHref} 
        className="hover:text-white/60 transition-colors"
      >
        {environment}
      </Link>
      
      <span className="text-white/20">/</span>
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.href} className="flex items-center gap-2">
          {index === breadcrumbs.length - 1 ? (
            <span className="text-white/60">{crumb.label}</span>
          ) : (
            <>
              <Link 
                href={crumb.href}
                className="hover:text-white/60 transition-colors"
              >
                {crumb.label}
              </Link>
              <span className="text-white/20">/</span>
            </>
          )}
        </div>
      ))}
    </nav>
  );
}
