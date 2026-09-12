# Changelog

Documents major changes made to this project.

## 2026-09-12 Migrated to the portfolio repository

The project now lives at `github.com/EduardoShande/portfolio`. The full
history moved with it: all 21 commits, verified by matching tree hashes and
an identical file list on both sides.

The old `SycoSmart` repository is untouched and still holds the same history.
It is kept as a second remote named `sycosmart` rather than removed, so
nothing is lost if the old URL is referenced somewhere.

The npm package was renamed from `sycosmart-web` to `portfolio` to match.
The name "Sycosmart" survives in `content.ts` as `PROFILE.studio`, which is
deliberate: it is the name Eduardo delivers client work under and it appears
in the footer.

**Vercel was not migrated.** The deployment is still connected to the old
repository, so the live site keeps building from `SycoSmart` until the
project is repointed in the Vercel dashboard.

---

## 2026-09-11, Rebuilt as a personal site and portfolio

The site no longer speaks as a company. It is now Eduardo's personal site and
portfolio, written in the first person, serving a hiring manager and a
prospective client from the same page. Client work is delivered under the
Sycosmart name, which now appears in the footer rather than the branding.

The visual language from the earlier overhaul is unchanged, angled geometry,
oversized numerals, two-tone headlines, vermillion accent.

### Content architecture, new `src/lib/content.ts`
Every fact the site renders now lives in one typed, bilingual file: profile,
stats, experience, projects, services, skills, education, certifications,
languages. Message files keep only wording. This means the two locales cannot
drift apart on a date or a metric, and there is one place to edit when
something changes.

`PROJECTS[].outcome` is deliberately optional: a project with no measured
result renders no result block rather than an invented number.

### Removed
- **`SocialProof.tsx` and its six testimonials.** The quotes attributed to
  named people at named companies were not verifiable. On a site aimed at
  hiring managers that is a liability, not social proof. Credibility now rests
  on the measured outcomes from the CV, 40% faster lead processing, 50% faster
  data loads, 95% report reliability, attached to the projects that produced
  them.

### Routing
English is now the default locale and carries no prefix; internal pathname keys
are English too. Route folders renamed: `casos` → `work`, `nosotros` → `about`,
`servicios` → `services`, `contacto` → `contact`, with Spanish pathnames
`/es/trabajo`, `/es/sobre-mi`, `/es/servicios`, `/es/contacto`.

### New components
- **`lib/content.ts`**: the single source of truth described above.
- **`work/ProjectCard.tsx`**: one project as problem → what I built → outcome,
  with category tag, year, stack chips and optional links. Shared by the home
  page and `/work`.
- **`home/SelectedWork.tsx`**: three featured projects.
- **`shared/ExperienceTimeline.tsx`**: career as a zig-zag rail; `compact`
  shows summaries only (home), full shows bullets (about).
- **`home/ExperienceSection.tsx`**: the home-page wrapper for it.
- **`ui/BrandIcons.tsx`**: inline GitHub and LinkedIn SVGs.

### Rebuilt
- **Hero**: name, role, availability, location, two CTAs (See my work /
  Download CV), inline social links, and a canted "right now" panel.
- **StatsBar**: driven by `STATS`; a fourth figure added.
- **ServicesOverview / services page**: driven by `SERVICES`, first person.
- **Navbar, Footer, MobileMenu**: personal wordmark, new nav, contact channels
  and profile links. `navLinks` is exported from `Navbar` and imported by the
  other two so the three cannot disagree.
- **Contact page**: two-tone header; email, WhatsApp, GitHub and LinkedIn all
  surfaced, since a hiring manager does not want WhatsApp.
- **Contact form**: service dropdown now generated from `SERVICES`, plus a
  full-time role option and an "other".
- **`ProcessSteps`** moved to `shared/` and repointed at `services.process`.
- **Metadata**: title, description, keywords, OpenGraph and Twitter cards all
  rewritten for the person.
- **`docs/HOW_TO.md` and `docs/PROJECT.md`** rewritten for the new structure.

### Added
- The CV is served at `/cv/Eduardo-Guerrero-Resume.pdf` and wired to the
  Download CV buttons on the home and about pages.

### Fixed
- **`Button` was not locale-aware.** It rendered a plain anchor for every href,
  so an internal link like `/work` would 404 on the Spanish site. It now routes
  internal paths through the next-intl `Link`, while absolute URLs, `mailto:`,
  hashes and file paths stay plain anchors.
- **lucide-react 1.8 has no brand glyphs.** `Github` and `Linkedin` do not
  exist in this version; both are now inlined as SVG.

### Verification
Production build and `tsc --noEmit` pass. All ten routes return 200 across both
locales; the removed `/casos` correctly 404s and `/es/work` redirects to
`/es/trabajo`. Spanish copy and localized nav hrefs confirmed in the rendered
HTML; the CV serves as `application/pdf`. Hero, stat band and selected-work
grid confirmed visually in dark mode, the about page in light mode; the
sections below the fold were verified structurally, as the preview pane stops
painting past a certain depth. Lint reports 3 pre-existing `react-hooks` errors
in `ThemeProvider` and `WhatsAppSimulator`, untouched by this work.

---

## 2026-09-11, Visual Direction Overhaul ("Angled Signal")

Rebuilt the site's visual language from five supplied references (an industrial
sheet-metal site, an airline training centre, a dark Web3 agency, a light
real-estate portal, and a numbered ribbon infographic). What those five share 
and what the previous design lacked, is angled geometry, oversized numerals,
two-tone headlines, and a single warm accent on a neutral ground.

### Design tokens, `src/app/globals.css`
- **Accent swapped from purple to vermillion.** `#7C3AED` → `#FF3D2E` (dark) /
  `#E5341F` (light). Every reference uses a warm red-orange; the purple was the
  default AI-startup palette.
- **Light ground warmed**: `#F4F4F5` → `#F2F1EE`, matching the real-estate
  reference. Dark ground `#0A0A0A` → `#0B0B0F`.
- **New `band` token** (`--color-band` / `band-fg` / `band-muted`): stays
  near-black in *both* themes. It anchors the stat bar, the CTA, and the hero
  panel the way the navy fields do in the airline reference.
- **New `bg-sunken` token** for recessed sections.
- **New utilities**: `.clip-angle-t` / `.clip-angle-b` / `.clip-angle-both`
  (sloped section edges), `.clip-notch` / `.clip-notch-bl` (corner-sliced
  panels), `.numeral` / `.numeral-ghost` (oversized tabular figures, outlined),
  `.marquee-track` (infinite ticker), `.grain` and `.hatch` (surface texture).
- Reduced-motion media query now stops the marquee and damps all animation.

### Primitives
- **`Button.tsx`**: sharp rectangles (`rounded-[2px]`) with uppercase tracked
  labels, replacing pill buttons. New `outline` and `band` variants.
- **`Badge.tsx`**: eyebrow label with a leading accent rule, replacing the
  rounded pill.
- **`SectionHeading.tsx`**: now supports `eyebrow` and `titleAccent` for
  two-tone headlines; default alignment changed from centre to left.
- **`Card.tsx`**: corner notch instead of `rounded-2xl`.

### New sections
- **`MarqueeStrip.tsx`**: angled infinite service ticker straddling the seam
  between hero and stat band (Web3 reference).
- **`ProcessSteps.tsx`**: four-step zig-zag process with a centre spine and
  ghost numerals (ribbon-infographic reference). The site previously had no
  process section at all.

### Rebuilt sections
- **`HeroSection.tsx`**: centred gradient replaced with a split layout: type
  left, canted dark panel right, floating stat chips, sloped bottom edge. The
  130vh sticky-zoom wrapper was removed. Parallax travel cut hard on the mid and
  near layers, which now carry real content rather than decorative blobs.
- **`StatsBar.tsx`**: dark band with sloped edges, icon rules, vertical
  dividers and 5xl numerals; a fourth stat (uptime) added.
- **`ServicesOverview.tsx`**: capability grid on a hairline bleed, oversized
  index numerals, accent wash sweeping up on hover, lead service spanning two
  columns. Tiles now link through the locale-aware `Link`.
- **`SocialProof.tsx`**: notched plates; each engagement's headline result
  pulled out and set in the accent above the quote.
- **`CTASection.tsx`**: full-bleed band with a sloped top edge and an oversized
  ghost word behind the headline.
- **`WhatsAppSimulator.tsx`**: section chrome and scenario controls squared
  off; chat bubbles left rounded, which is correct for a WhatsApp UI.

### Inner pages
`servicios`, `nosotros`, `casos`, `contacto` converted from rounded panels to
the notch/angle system, glow shadows removed, `accent-light` text swapped for
`accent` (the coral tint failed contrast on the light ground), and both page
CTAs converted to the dark band.

### Copy
New keys in `es.json` / `en.json` for `home.marquee`, `home.process`, the
two-tone headline splits (`titleAccent`), section eyebrows, and hero panel /
stat-chip labels.

### Fixes made along the way
- **Horizontal scrollbar**: the rotated, 110%-scaled marquee pushed
  `documentElement.scrollWidth` to 1502 on a 1440 viewport. Wrapper now clips on
  the x axis.
- **Hero chips covering text**: panel label moved to the top-right and the
  caption held to 70% width so the deliberately-overlapping stat chips never
  land on readable text.
- **Untranslated testimonial results**: the pulled-out result figure was a
  single hardcoded Spanish string leaking onto the English site; now localized.

---

## 2026-04-12, Second Overhaul Session (same day)

### Task 1a, Dual Theme System (replaces 5-theme toggle)
- **Updated**: `src/components/providers/ThemeProvider.tsx`: simplified to `dark | light` with `toggleTheme()` method
- **Updated**: `src/app/globals.css`: removed 3 themes, kept only `dark` (default) and `light`
  - Light theme tokens: bg `#F4F4F5`, surface `#FFFFFF`, primary `#7C3AED`, deep `#4C1D95`, text `#0A0A0A`
  - Added global `transition: 0.4s ease` on all color properties for smooth theme switching
- **Updated**: `src/components/layout/ThemeToggle.tsx`: replaced dropdown with sun/moon icon button
  - Sun/moon icons from Lucide
  - Animated 180° rotation on switch via Framer Motion `AnimatePresence`
  - `whileHover` scale 1.08, `whileTap` scale 0.92

### Task 1b, Sticky Zoom Effect on Hero
- **Updated**: `src/components/home/HeroSection.tsx`
- Wrapped hero in outer `<div>` with `h-[130vh]` to provide scroll room
- Inner section uses `position: sticky; top: 0` with `h-screen`
- `useScroll` + `useTransform` bind scroll progress to `scale` (1 → 1.15) and `opacity` (1 → 0)
- Cinematic zoom-in as user scrolls past hero into next section

### Task 1c, 4-Layer Mouse Parallax
- **Updated**: `src/components/home/HeroSection.tsx`
- Now has 4 distinct depth layers with different parallax intensities:
  - **Layer 1** (farthest, 10% cursor): background orbs
  - **Layer 2** (mid, 20% cursor): geometric blobs + rotating square
  - **Layer 3** (near, 35% cursor): decorative circle + small square
  - **Layer 4** (closest, 5% cursor): headline container for subtle depth
- All layers use `useMotionValue` + `useTransform` + `useSpring` for smooth motion
- All elements use `will-change: transform` and only animate transform/opacity
- Mobile: falls back to continuous `easeInOut` floating animations

### Task 2, Fixed WhatsApp Simulator Auto-Scroll Hijacking
- **Updated**: `src/components/home/WhatsAppSimulator.tsx`
- **Bug**: Previous code used `chatEndRef.current?.scrollIntoView()` which scrolled the entire PAGE to bring the chat bubble into view, hijacking the user's scroll position on page load
- **Fix**: Replaced with `chatContainerRef.current.scrollTo({ top: container.scrollHeight })` which scrolls ONLY inside the chat container, never the page
- Section now only animates in via `whileInView` when user naturally scrolls to it

### Task 3, Footer Copy: Global Company
- **Updated**: `src/messages/es.json` and `en.json`
  - Footer description ES: "Tecnología inteligente y soluciones digitales para empresas en todo el mundo."
  - Footer description EN: "Smart technology and digital solutions for businesses worldwide."
  - Added `tagline`: "Building the digital future, globally."
- **Updated**: `src/components/layout/Footer.tsx`
  - Added `Globe` icon next to tagline
  - Replaced bullet-list service labels with clean text
  - Added `MessageCircle` + `Mail` icons to contact links
- **Updated**: Other Bolivia-only text:
  - Services page hero subtitle: "businesses worldwide" instead of "businesses in Bolivia"
  - About page story: removed Bolivia-specific mentions, replaced with "worldwide"
  - Cases page subtitle: "companies that trusted us" (removed "Bolivian")

### Task 4, Professional Iconography (Lucide Audit)
- **Updated**: `src/components/home/WhatsAppSimulator.tsx`
  - Replaced 🏢 emoji with `Building2` (Lucide)
  - Replaced ⚙️ emoji with `Settings2` (Lucide)
  - Replaced 📊 emoji with `BarChart3` (Lucide)
  - All scenario buttons now use consistent 16px icons from Lucide
- **Updated**: `src/components/layout/Footer.tsx`: added `Globe`, `MessageCircle`, `Mail` icons
- Service icon mapping already uses correct Lucide icons: Bot, Globe, Smartphone, Database, Megaphone, Search, Code2
- Icons inherit theme color via CSS variables (`text-accent`, `text-accent-light`)

### Documentation
- **Updated**: `docs/CHANGES.md`: this section
- **Updated**: `docs/HOW_TO.md`: added sections on light/dark theme defaults, adding Lucide icons, disabling sticky zoom

---

## 2026-04-12, Major Overhaul Session

### Task 1, Hero Mouse Parallax
- **Changed**: Added mouse-tracking parallax background to hero section
- **File**: `src/components/home/HeroSection.tsx`
- Uses `useMotionValue`, `useTransform`, `useSpring` from motion
- 4 layered elements at different depths
- Auto-floating animation on mobile (no cursor)
- All animations use `will-change: transform` for performance

### Task 2, Color Theme Toggle
- **Created**: `src/components/providers/ThemeProvider.tsx`: context with localStorage persistence
- **Created**: `src/components/layout/ThemeToggle.tsx`: dropdown UI in navbar
- **Updated**: `src/app/globals.css`: added 5 theme CSS variable sets (`data-theme` attribute)
- **Updated**: `src/app/layout.tsx`: wrapped app in `ThemeProvider`
- Themes: black (default), deep-purple, purple, light-gray, white
- 0.4s ease transitions on color changes

### Task 3, WhatsApp Simulator Overhaul
- **Updated**: `src/components/home/WhatsAppSimulator.tsx`: full rewrite
- 3 enterprise scenarios replacing old ones:
  - **AI Sales Assistant** (real estate/dealerships)
  - **Automated Operations Hub** (retail/distributors)
  - **Customer Intelligence Dashboard** (subscriptions/gyms)
- 8 messages per scenario with realistic conversation flow
- Sequential message reveal with typing indicators between agent responses
- Auto-scroll to latest message
- **Updated**: `src/messages/es.json` and `en.json`: added all simulator copy

### Task 3c, Fixed `/services` 404
- **Updated**: `src/i18n/routing.ts`: added localized pathnames so `/servicios` (ES) and `/services` (EN) both work
- **Updated**: `src/proxy.ts`: broadened matcher to handle all paths
- **Updated**: `src/app/[locale]/servicios/page.tsx`: full rewrite with 7 services per spec:
  - AI Agents & Automation
  - Web Development
  - Mobile Apps
  - CRM Implementation
  - Meta Ads Management
  - Digital Marketing
  - Custom Software & APIs
- Each service has icon, description, deliverables list, and "Request" CTA

### Task 4, Bolivian Names in Testimonials
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

### Task 5, Detailed Case Studies
- **Updated**: `src/app/[locale]/casos/page.tsx`: full rewrite
- 3 realistic case studies with structure: client → problem → solution → quote → metrics
  1. Restaurante Tradiciones (digitized order management, +65% sales)
  2. Distribuidora Oriental (inventory + WhatsApp automation, -92% errors)
  3. Inmobiliaria Equipetrol (AI lead qualification, +300% sales)
- Animated `CountUp` component for metrics
- Card hover lift, staggered entrance

### Task 6, Contact Form Redesign
- **Updated**: `src/components/contacto/ContactForm.tsx`
- **Added**: Budget field with 6 options (radio dropdown)
- Field stagger animation on mount
- Success state with spring animation
- Connected to N8N webhook via `N8N_WEBHOOK_URL` constant
- **Updated**: `src/app/[locale]/contacto/page.tsx`: 2-column desktop layout:
  - Left: headline, value props (24h response, free consultation, no commitment), direct contact card
  - Right: form in elevated card
- Calendly moved to dedicated section below

### Global, Animations Everywhere
- **Updated**: `src/components/ui/Button.tsx`: `whileHover` scale 1.04, `whileTap` 0.97
- **Updated**: `src/components/ui/Card.tsx`: `whileHover` y -6
- **Updated**: `src/components/ui/SectionHeading.tsx`: fade-in on scroll
- **Updated**: `src/components/layout/Navbar.tsx`: entrance animation, link stagger
- **Updated**: `src/components/layout/MobileMenu.tsx`: `AnimatePresence` slide drawer
- **Updated**: `src/components/layout/Footer.tsx`: fade-in on scroll
- **Updated**: `src/components/shared/WhatsAppFloatingButton.tsx`: entrance spring + floating animation
- **Updated**: `src/components/home/StatsBar.tsx`: animated number counters using `motion.useMotionValue`
- **Updated**: `src/components/home/ServicesOverview.tsx`: staggered card entrance
- **Updated**: `src/components/home/CTASection.tsx`: animated background blurs
- **Created**: `src/components/shared/PageTransition.tsx`: page-level fade+slide transitions
- **Updated**: `src/app/[locale]/layout.tsx`: wrapped main with `PageTransition`

### Global, Theme Class Migration
- All hardcoded `brand-black`, `brand-dark`, `brand-purple` etc. classes replaced with theme-aware:
  - `bg-bg`, `bg-bg-elevated`
  - `text-fg`, `text-fg-muted`
  - `border-border-theme`
  - `text-accent`, `bg-accent`, `text-accent-light`
- All pages and components now respond to theme changes
- **Updated**: `src/app/[locale]/servicios/page.tsx`, `casos/page.tsx`, `contacto/page.tsx`, `nosotros/page.tsx`

### Constants
- **Updated**: `src/lib/constants.ts`: added `N8N_WEBHOOK_URL` env var
- **Updated**: WhatsApp number `59173115185` (unchanged, still hardcoded for safety)

### Documentation
- **Created**: `docs/PROJECT.md`: full project overview
- **Created**: `docs/CHANGES.md`: this file
- **Created**: `docs/HOW_TO.md`: non-developer guide

---

## 2026-04-11, Initial Build

- Created Next.js 16 + TypeScript + Tailwind 4 project
- Built foundation: i18n routing, layout, theme, all 5 pages
- Installed: next-intl, motion, lucide-react, react-hook-form, zod, react-calendly
- First WhatsApp simulator with 3 simple scenarios
- Bilingual ES/EN support
- Pushed to GitHub: https://github.com/EduardoShande/SycoSmart
