# Changelog

Documents major changes made to the Sycosmart Web project.

## 2026-04-12 — Major Overhaul Session

### Task 1 — Hero Mouse Parallax
- **Changed**: Added mouse-tracking parallax background to hero section
- **File**: `src/components/home/HeroSection.tsx`
- Uses `useMotionValue`, `useTransform`, `useSpring` from motion
- 4 layered elements at different depths
- Auto-floating animation on mobile (no cursor)
- All animations use `will-change: transform` for performance

### Task 2 — Color Theme Toggle
- **Created**: `src/components/providers/ThemeProvider.tsx` — context with localStorage persistence
- **Created**: `src/components/layout/ThemeToggle.tsx` — dropdown UI in navbar
- **Updated**: `src/app/globals.css` — added 5 theme CSS variable sets (`data-theme` attribute)
- **Updated**: `src/app/layout.tsx` — wrapped app in `ThemeProvider`
- Themes: black (default), deep-purple, purple, light-gray, white
- 0.4s ease transitions on color changes

### Task 3 — WhatsApp Simulator Overhaul
- **Updated**: `src/components/home/WhatsAppSimulator.tsx` — full rewrite
- 3 enterprise scenarios replacing old ones:
  - **AI Sales Assistant** (real estate/dealerships)
  - **Automated Operations Hub** (retail/distributors)
  - **Customer Intelligence Dashboard** (subscriptions/gyms)
- 8 messages per scenario with realistic conversation flow
- Sequential message reveal with typing indicators between agent responses
- Auto-scroll to latest message
- **Updated**: `src/messages/es.json` and `en.json` — added all simulator copy

### Task 3c — Fixed `/services` 404
- **Updated**: `src/i18n/routing.ts` — added localized pathnames so `/servicios` (ES) and `/services` (EN) both work
- **Updated**: `src/proxy.ts` — broadened matcher to handle all paths
- **Updated**: `src/app/[locale]/servicios/page.tsx` — full rewrite with 7 services per spec:
  - AI Agents & Automation
  - Web Development
  - Mobile Apps
  - CRM Implementation
  - Meta Ads Management
  - Digital Marketing
  - Custom Software & APIs
- Each service has icon, description, deliverables list, and "Request" CTA

### Task 4 — Bolivian Names in Testimonials
- **Updated**: `src/components/home/SocialProof.tsx`
- Replaced all generic names with realistic Santa Cruz names:
  - Carlos Suárez (Inmobiliaria Equipetrol)
  - María Fernanda Torrico (Boutique Camba)
  - Diego Justiniano (Distribuidora Oriental)
  - Lucía Añez (Restaurante Tradiciones)
  - Roberto Pedraza (Auto Center Santa Cruz)
  - Valeria Roca (Gimnasio Vital Fit)
- Added avatar circles with initials
- Stagger animation on testimonial grid

### Task 5 — Detailed Case Studies
- **Updated**: `src/app/[locale]/casos/page.tsx` — full rewrite
- 3 realistic case studies with structure: client → problem → solution → quote → metrics
  1. Restaurante Tradiciones (digitized order management, +65% sales)
  2. Distribuidora Oriental (inventory + WhatsApp automation, -92% errors)
  3. Inmobiliaria Equipetrol (AI lead qualification, +300% sales)
- Animated `CountUp` component for metrics
- Card hover lift, staggered entrance

### Task 6 — Contact Form Redesign
- **Updated**: `src/components/contacto/ContactForm.tsx`
- **Added**: Budget field with 6 options (radio dropdown)
- Field stagger animation on mount
- Success state with spring animation
- Connected to N8N webhook via `N8N_WEBHOOK_URL` constant
- **Updated**: `src/app/[locale]/contacto/page.tsx` — 2-column desktop layout:
  - Left: headline, value props (24h response, free consultation, no commitment), direct contact card
  - Right: form in elevated card
- Calendly moved to dedicated section below

### Global — Animations Everywhere
- **Updated**: `src/components/ui/Button.tsx` — `whileHover` scale 1.04, `whileTap` 0.97
- **Updated**: `src/components/ui/Card.tsx` — `whileHover` y -6
- **Updated**: `src/components/ui/SectionHeading.tsx` — fade-in on scroll
- **Updated**: `src/components/layout/Navbar.tsx` — entrance animation, link stagger
- **Updated**: `src/components/layout/MobileMenu.tsx` — `AnimatePresence` slide drawer
- **Updated**: `src/components/layout/Footer.tsx` — fade-in on scroll
- **Updated**: `src/components/shared/WhatsAppFloatingButton.tsx` — entrance spring + floating animation
- **Updated**: `src/components/home/StatsBar.tsx` — animated number counters using `motion.useMotionValue`
- **Updated**: `src/components/home/ServicesOverview.tsx` — staggered card entrance
- **Updated**: `src/components/home/CTASection.tsx` — animated background blurs
- **Created**: `src/components/shared/PageTransition.tsx` — page-level fade+slide transitions
- **Updated**: `src/app/[locale]/layout.tsx` — wrapped main with `PageTransition`

### Global — Theme Class Migration
- All hardcoded `brand-black`, `brand-dark`, `brand-purple` etc. classes replaced with theme-aware:
  - `bg-bg`, `bg-bg-elevated`
  - `text-fg`, `text-fg-muted`
  - `border-border-theme`
  - `text-accent`, `bg-accent`, `text-accent-light`
- All pages and components now respond to theme changes
- **Updated**: `src/app/[locale]/servicios/page.tsx`, `casos/page.tsx`, `contacto/page.tsx`, `nosotros/page.tsx`

### Constants
- **Updated**: `src/lib/constants.ts` — added `N8N_WEBHOOK_URL` env var
- **Updated**: WhatsApp number `59173115185` (unchanged, still hardcoded for safety)

### Documentation
- **Created**: `docs/PROJECT.md` — full project overview
- **Created**: `docs/CHANGES.md` — this file
- **Created**: `docs/HOW_TO.md` — non-developer guide

---

## 2026-04-11 — Initial Build

- Created Next.js 16 + TypeScript + Tailwind 4 project
- Built foundation: i18n routing, layout, theme, all 5 pages
- Installed: next-intl, motion, lucide-react, react-hook-form, zod, react-calendly
- First WhatsApp simulator with 3 simple scenarios
- Bilingual ES/EN support
- Pushed to GitHub: https://github.com/EduardoShande/SycoSmart
