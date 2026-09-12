# Sycosmart Web — Project Documentation

## Overview

Sycosmart is a tech and marketing company in Bolivia specializing in AI agents, automation, and digital marketing. This is the official corporate website built with Next.js 16, focused on showcasing services, demonstrating the AI agent product through an interactive WhatsApp simulator, and converting visitors into clients via WhatsApp, contact form, or Calendly.

## Tech Stack

| Tech | Version | Purpose |
|------|---------|---------|
| **Next.js** | 16.2.3 | React framework with App Router |
| **React** | 19.2.4 | UI library |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | 4.x | Styling |
| **next-intl** | latest | Bilingual i18n (ES/EN) with localized pathnames |
| **motion** (framer-motion) | 12.x | All animations, parallax, page transitions |
| **lucide-react** | latest | Icon library |
| **react-hook-form** | latest | Contact form state |
| **zod** | latest | Form validation |
| **react-calendly** | latest | Calendly inline booking widget |
| **clsx + tailwind-merge** | latest | Conditional classnames |
| **class-variance-authority** | latest | Component variants |

## Folder Structure

```
sycosmart-web/
├── docs/                          # Documentation (you are here)
│   ├── PROJECT.md
│   ├── CHANGES.md
│   └── HOW_TO.md
├── public/                        # Static assets
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout (fonts, ThemeProvider)
│   │   ├── globals.css            # Tailwind + theme CSS variables
│   │   └── [locale]/
│   │       ├── layout.tsx         # Locale layout (navbar, footer, page transition)
│   │       ├── page.tsx           # Home
│   │       ├── servicios/page.tsx # Services (URL: /servicios | /services)
│   │       ├── nosotros/page.tsx  # About (URL: /nosotros | /about)
│   │       ├── casos/page.tsx     # Cases (URL: /casos | /cases)
│   │       └── contacto/page.tsx  # Contact (URL: /contacto | /contact)
│   ├── components/
│   │   ├── layout/                # Navbar, Footer, MobileMenu, LanguageSwitcher, ThemeToggle
│   │   ├── ui/                    # Container, Button, Card, SectionHeading, Badge
│   │   ├── home/                  # HeroSection, MarqueeStrip, StatsBar, WhatsAppSimulator, ServicesOverview, ProcessSteps, SocialProof, CTASection
│   │   ├── contacto/              # ContactForm, CalendlyEmbed
│   │   ├── shared/                # WhatsAppFloatingButton, PageTransition
│   │   └── providers/             # ThemeProvider
│   ├── i18n/
│   │   ├── routing.ts             # Locale + pathname config
│   │   ├── request.ts             # Server-side message loading
│   │   └── navigation.ts          # Localized Link, useRouter, etc.
│   ├── messages/
│   │   ├── es.json                # Spanish translations (default)
│   │   └── en.json                # English translations
│   ├── lib/
│   │   ├── constants.ts           # WhatsApp number, Calendly URL, N8N webhook
│   │   └── utils.ts               # cn() classname helper
│   └── proxy.ts                   # Next.js 16 proxy (formerly middleware)
├── next.config.ts
├── tailwind.config.ts             # (optional, theme is inline in globals.css)
├── tsconfig.json
└── package.json
```

## Pages

| Path (ES) | Path (EN) | File | Purpose |
|-----------|-----------|------|---------|
| `/` | `/en` | `app/[locale]/page.tsx` | Home with hero, simulator, services overview, testimonials, CTA |
| `/servicios` | `/en/services` | `app/[locale]/servicios/page.tsx` | Full service catalog (7 services) with deliverables |
| `/nosotros` | `/en/about` | `app/[locale]/nosotros/page.tsx` | Company story, expertise, values |
| `/casos` | `/en/cases` | `app/[locale]/casos/page.tsx` | 3 detailed case studies with animated stats |
| `/contacto` | `/en/contact` | `app/[locale]/contacto/page.tsx` | 2-column contact: form + value props + Calendly |

## Key Components

### Layout
- **Navbar** (`components/layout/Navbar.tsx`) — Sticky, scroll-aware, transparent on hero, includes ThemeToggle and LanguageSwitcher
- **Footer** (`components/layout/Footer.tsx`) — 4-column footer with brand, services, company, contact
- **MobileMenu** (`components/layout/MobileMenu.tsx`) — Slide-in drawer for mobile navigation
- **ThemeToggle** (`components/layout/ThemeToggle.tsx`) — Dropdown for cycling 5 themes
- **LanguageSwitcher** (`components/layout/LanguageSwitcher.tsx`) — ES/EN toggle preserving current path

### Home Page
- **HeroSection** — Mouse-tracking parallax background with layered orbs (auto-floats on mobile)
- **StatsBar** — Animated number counters that count up on scroll
- **WhatsAppSimulator** — Phone mockup with 3 scripted enterprise demos (Sales, Operations, Intelligence)
- **ServicesOverview** — 6-card service grid
- **SocialProof** — 6 testimonials with Bolivian names
- **CTASection** — Full-width gradient CTA with WhatsApp + Calendly buttons

### Shared
- **WhatsAppFloatingButton** — Fixed bottom-right green button with subtle floating animation
- **PageTransition** — Wraps children with fade+slide on route change
- **ThemeProvider** — Provides theme state via React Context, persists to localStorage

## Theme System

Themes are CSS variables defined in `src/app/globals.css` and applied via the `data-theme` attribute on `<html>`. Five themes available:

| ID | Background | Foreground | Accent |
|----|-----------|-----------|--------|
| `black` (default) | `#0A0A0A` | `#F9F9F9` | `#7C3AED` |
| `deep-purple` | `#4C1D95` | `#FFFFFF` | `#C084FC` |
| `purple` | `#7C3AED` | `#FFFFFF` | `#FFFFFF` |
| `light-gray` | `#F4F4F5` | `#0A0A0A` | `#7C3AED` |
| `white` | `#FFFFFF` | `#0A0A0A` | `#7C3AED` |

Tailwind classes use semantic theme tokens:
- `bg-bg`, `bg-bg-elevated` — backgrounds
- `text-fg`, `text-fg-muted` — text colors
- `border-border-theme` — borders
- `bg-accent`, `text-accent`, `text-accent-light` — accent colors

## Environment Variables

Create a `.env.local` file in the project root:

```bash
# WhatsApp number is hardcoded in src/lib/constants.ts but can be overridden if needed

# Calendly booking URL
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/sycosmart

# N8N webhook URL for contact form submissions
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/contact-form
```

If `NEXT_PUBLIC_N8N_WEBHOOK_URL` is empty, the contact form will simulate a successful submission (useful for development).

## Running Locally

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Build production
npm run build

# Run production build
npm start

# Lint
npm run lint
```

Requires Node.js 20.9+ for Next.js 16.

## Bilingual System

- Default locale: Spanish (`es`)
- Secondary locale: English (`en`)
- URL strategy: `localePrefix: "as-needed"` — Spanish has clean URLs, English uses `/en` prefix
- Localized pathnames: paths are translated, e.g. `/servicios` → `/en/services`
- Translation files: `src/messages/es.json` and `src/messages/en.json`

## Animation Strategy

All animations use Motion (formerly Framer Motion) and follow these rules:
- **Page entrance**: `initial → animate` with stagger via `staggerChildren`
- **Scroll-triggered**: `whileInView` with `viewport={{ once: true }}`
- **Hover**: `whileHover={{ y: -6 }}` on cards, `whileHover={{ scale: 1.04 }}` on buttons
- **Tap**: `whileTap={{ scale: 0.97 }}` on all interactive elements
- **Page transitions**: `PageTransition` wrapper fades + slides on route change
- **Performance**: Only `transform` and `opacity` are animated. `will-change: transform` on heavily animated elements.

## Deployment

Currently designed for Vercel free tier (zero config). To deploy:
1. Push to GitHub
2. Import repo in Vercel dashboard
3. Add environment variables
4. Deploy

When the Contabo VPS is ready, deployment will move to **Coolify** (self-hosted alternative). The project already follows Next.js best practices and works with any Docker-based deployment.
