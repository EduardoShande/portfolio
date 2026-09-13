# Eduardo Shande, Project Documentation

## Overview

A personal site and portfolio for **Eduardo Shande Guerrero Yucra**, Data &
Automation Engineer in Santa Cruz de la Sierra, Bolivia.

It serves two audiences from one site. A hiring manager needs experience,
technical depth and a CV. A prospective client needs outcomes, services and a
way to book a call. The hero gives each a path, *See my work* and *Download
CV*, and the page order below alternates between the two.

Client work is delivered under the name **Sycosmart**, which appears in the
footer rather than in the branding. The site speaks in the first person.

## Tech Stack

| Tech | Version | Purpose |
|------|---------|---------|
| **Next.js** | 16.2.3 | React framework with App Router |
| **React** | 19.2.4 | UI library |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | 4.x | Styling (theme inline in `globals.css`) |
| **next-intl** | latest | Bilingual EN/ES with localized pathnames |
| **motion** | 12.x | All animation, parallax, page transitions |
| **lucide-react** | 1.8 | Icons (brand glyphs inlined separately) |
| **react-hook-form + zod** | latest | Contact form state and validation |

## Content architecture

The thing to understand before editing anything:

```
src/lib/content.ts     ← every FACT (profile, stats, jobs, projects,
                          services, skills, education, certifications)
src/messages/*.json    ← every WORDING (headings, labels, buttons, prose)
```

Facts are bilingual objects (`{ es, en }`) inside one file, so the two locales
cannot drift apart on a date or a metric. Wording is duplicated per locale and
**the two key sets must match exactly** or next-intl throws at runtime.

`PROJECTS[].outcome` is optional by design, a project with no measured result
renders no result block rather than an invented number.

## Folder Structure

```
sycosmart-web/
├── docs/
│   ├── PROJECT.md          # you are here
│   ├── CHANGES.md          # changelog
│   └── HOW_TO.md           # plain-language editing guide
├── public/
│   ├── cv/                 # the downloadable CV PDF
│   └── hero/hero.svg       # plexus backdrop (accent-coloured)
├── src/
│   ├── app/
│   │   ├── layout.tsx            # fonts, metadata, ThemeProvider
│   │   ├── globals.css           # design tokens + angled-geometry utilities
│   │   └── [locale]/
│   │       ├── layout.tsx        # navbar, footer, page transition
│   │       ├── page.tsx          # home
│   │       ├── work/page.tsx     # portfolio, filterable
│   │       ├── about/page.tsx    # story, experience, skills, education
│   │       ├── services/page.tsx # offers, deliverables, process
│   │       └── contact/page.tsx  # form, channels, booking panel
│   ├── components/
│   │   ├── layout/         # Navbar, Footer, MobileMenu, LanguageSwitcher, ThemeToggle
│   │   ├── ui/             # Container, Button, Card, SectionHeading, BrandIcons
│   │   ├── home/           # HeroSection, MarqueeStrip, StatsBar, SelectedWork,
│   │   │                   #   WhatsAppSimulator, ExperienceSection, ServicesOverview,
│   │   │                   #   CTASection
│   │   ├── work/           # ProjectCard (shared by home and /work)
│   │   ├── shared/         # ExperienceTimeline, ProcessSteps, PageTransition,
│   │   │                   #   WhatsAppFloatingButton, HtmlLangSync
│   │   ├── contacto/       # ContactForm, BookingPicker
│   │   └── providers/      # ThemeProvider
│   ├── i18n/               # routing (localized pathnames), request, navigation
│   ├── lib/                # content.ts (facts), constants.ts, utils.ts
│   └── messages/           # en.json (default), es.json
└── proxy.ts                # Next.js 16 proxy (formerly middleware)
```

## Routing

English is the default locale and carries no prefix. Internal pathname keys are
English, so `<Link href="/work">` reads the way it renders.

| Key | English | Spanish |
|-----|---------|---------|
| `/` | `/` | `/es` |
| `/work` | `/work` | `/es/trabajo` |
| `/about` | `/about` | `/es/sobre-mi` |
| `/services` | `/services` | `/es/servicios` |
| `/contact` | `/contact` | `/es/contacto` |

`Button` resolves internal hrefs through the locale-aware `Link`, so a button
pointing at `/work` lands on `/es/trabajo` on the Spanish site. Hrefs that are
absolute, `mailto:`, a hash, or a file path (anything containing a `.`, such as
the CV) stay plain anchors.

## Home page order

1. **HeroSection**: name, role, headline, two CTAs, social links, canted panel
2. **MarqueeStrip**: slow ticker of tool logos and names
3. **StatsBar**: dark band, four CV-backed figures
4. **SelectedWork**: three featured projects
5. **WhatsAppSimulator**: live demo of an agent he built
6. **ExperienceSection**: career zig-zag, summaries only
7. **ServicesOverview**: four offers, first one spanning two columns
8. **CTASection**: closing band with ghost word

## Design system

Built from five reference sites: an industrial sheet-metal site, an airline
training centre, a dark Web3 agency, a light real-estate portal, and a numbered
ribbon infographic. The four devices they share:

- **Angled geometry**: `.clip-angle-t` / `.clip-angle-b` / `.clip-angle-both`
  for sloped section edges, `.clip-notch` / `.clip-notch-bl` for corner-sliced
  panels. Nothing meets at 90°.
- **Oversized numerals**: `.numeral` and `.numeral-ghost` (outlined) for
  indices, stats and step numbers as graphic objects.
- **Two-tone headlines**: `SectionHeading` takes `title` + `titleAccent`.
- **One warm accent**: vermillion `#FF3D2E` (dark) / `#E5341F` (light).

Plus `.marquee-track` for the ticker and `.grain` / `.hatch` for surface
texture.

### Theme tokens

Three grounds per theme (`bg`, `bg-elevated`, `bg-sunken`) plus a **`band`**
token that stays near-black in *both* themes. The band is what gives the stat
bar and closing CTA their solid dark field on the light site, and it is the
anchor the rest of the page is measured against.
