# Evolution 3.1 Unified Branch Migration Checklist

## Pre-Deployment Validation

### Code Quality
- [ ] All ESLint errors resolved (`pnpm lint`)
- [ ] TypeScript strict mode passes (`pnpm typecheck`)
- [ ] No console.log statements in production code
- [ ] All TODO comments addressed or documented

### Testing
- [ ] Unit test coverage >70%
- [ ] All critical user paths tested
- [ ] Accessibility tests passing
- [ ] Lighthouse scores meet targets (Performance 90+, SEO 100)

### SEO
- [ ] All metadata reviewed and accurate in `src/app/layout.tsx` and sub-layouts
- [ ] Structured data validates in Google Rich Results Test
- [ ] Sitemap (`/sitemap.xml`) submitted to Search Console
- [ ] All canonical URLs verified

### Performance
- [ ] Bundle size <500KB initial load
- [ ] Images optimized (AVIF/WebP) via `next.config.js`
- [ ] Font loading optimized (Geist Sans preloaded)
- [ ] No layout shift (CLS <0.1)

### Security
- [ ] All security headers configured in `next.config.js`
- [ ] No sensitive data in client-side code
- [ ] Environment variables properly scoped
- [ ] HTTPS enforced in production

### Analytics
- [ ] GTM container ID configured in `.env`
- [ ] Key conversion events tracked (Waitlist, CTA clicks)
- [ ] Analytics data layer verified

## Post-Deployment Monitoring

### Week 1
- [ ] Monitor Core Web Vitals daily
- [ ] Check error logs (Sentry/Vercel)
- [ ] Review GTM event firing
- [ ] Monitor Search Console for indexing issues

### Week 2-4
- [ ] Compare SEO rankings to baseline
- [ ] Analyze user behavior changes
- [ ] Review conversion funnel performance
- [ ] Optimize based on real-world data
