# How To Guide — Eduardo Shande

A plain-language guide to changing the site without touching layout code.

---

## The one rule

**Facts live in `src/lib/content.ts`. Wording lives in `src/messages/en.json` and
`src/messages/es.json`.**

A fact is anything that would still be true if the site were in a different
language: a job title, a date, a metric, a tool name, a project, an email
address. Wording is headings, button labels, eyebrows and marketing copy.

If you edit a fact in `content.ts`, both languages update at once. If you edit
wording, **you must edit both message files** or the site will crash on the
language that is missing the key.

---

## 1. Update anything about you — name, email, phone, links

**File:** `src/lib/content.ts` → the `PROFILE` block at the top.

```typescript
export const PROFILE = {
  name: "Eduardo Shande Guerrero Yucra",
  shortName: "Eduardo Shande",
  email: "eduardoshandeone@gmail.com",
  phone: "+591 73115185",
  github: "https://github.com/EduardoShande",
  linkedin: "https://linkedin.com/in/...",
  cvPath: "/cv/Eduardo-Guerrero-Resume.pdf",
  studio: "Sycosmart",
};
```

Change a value here and it updates the hero, footer, contact page and mobile
menu together.

---

## 2. Replace the CV

Drop the new PDF into `public/cv/` and point `PROFILE.cvPath` at it. Keeping
the same filename means you do not have to change anything at all:

```
public/cv/Eduardo-Guerrero-Resume.pdf
```

The Download CV buttons on the home and about pages pick it up automatically.

---

## 3. Add a project to the portfolio

**File:** `src/lib/content.ts` → the `PROJECTS` array.

Copy an existing block and edit it:

```typescript
{
  id: "unique-id",              // must be unique
  title: { es: "...", en: "..." },
  client: { es: "...", en: "..." },
  category: "automation",        // automation | data | product | web
  year: "2026",
  featured: true,                // true = also shows on the home page
  problem: { es: "...", en: "..." },
  solution: { es: "...", en: "..." },
  outcome: { es: "...", en: "..." },   // OPTIONAL — see below
  stack: ["Python", "n8n"],
  links: [                        // OPTIONAL
    { label: { es: "Ver sitio", en: "View site" }, href: "https://..." },
  ],
},
```

**About `outcome`:** leave it out entirely if you do not have a real measured
number. The card simply will not render the result block. Do not estimate one —
an invented metric is the single easiest thing for a hiring manager to check and
disbelieve.

**About `featured`:** the home page shows only projects with `featured: true`.
Three looks right in that grid. If you mark a fourth, the row will wrap.

---

## 4. Add or change a job

**File:** `src/lib/content.ts` → the `EXPERIENCE` array.

The array order is the display order, most recent first. Set `current: true` on
the role you hold now — it gets a filled marker and a "Current" tag.

```typescript
{
  id: "unique-id",
  company: "Company Name",
  role: { es: "...", en: "..." },
  period: { es: "Mar 2026 — Presente", en: "Mar 2026 — Present" },
  order: 1,
  current: true,
  summary: { es: "...", en: "..." },      // one line, shown everywhere
  highlights: { es: ["..."], en: ["..."] },  // bullets, about page only
  stack: ["Python", "n8n"],
},
```

The home page shows the summary only; the about page shows the full bullets.

---

## 5. Change the headline numbers in the dark stat band

**File:** `src/lib/content.ts` → the `STATS` array.

```typescript
{ value: 50, suffix: "%", label: { es: "...", en: "..." } },
```

`value` must be a number — it animates counting up from zero. Put symbols in
`suffix`. Every figure currently there traces back to a line in the CV; keep it
that way.

---

## 6. Change what you offer

**File:** `src/lib/content.ts` → the `SERVICES` array.

These drive three places at once: the home page grid, the full services page,
and the dropdown in the contact form. The first service in the array is the one
that spans two columns on the home page, so put your strongest offer first.

---

## 7. Change your skills

**File:** `src/lib/content.ts` → `SKILL_GROUPS`. Each group renders as one tile
on the about page. `items` are plain strings, shown as chips.

Education, certifications and languages are right below it in the same file.

---

## 8. Change headings and button text

**Files:** `src/messages/en.json` AND `src/messages/es.json`.

Headlines are split in two so the second half can be in the accent colour:

```json
"title": "Things I have",
"titleAccent": "built"
```

renders as: Things I have **built**

**Both files must have the same keys.** If you add a key to one, add it to the
other. To check:

```bash
node -e "const a=require('./src/messages/en.json'),b=require('./src/messages/es.json');const f=(o,p='',s=[])=>{for(const[k,v]of Object.entries(o)){const q=p?p+'.'+k:k;v&&typeof v=='object'?f(v,q,s):s.push(q)}return s};const A=f(a).sort(),B=f(b).sort();console.log(A.length===B.length&&A.every((k,i)=>k===B[i])?'OK':'MISMATCH')"
```

---

## 9. Change the scrolling ticker

**File:** `src/components/home/MarqueeStrip.tsx` → the `TOOLS` array. These are
tool names, so there is one list for both languages.

---

## 10. Change the colours

**File:** `src/app/globals.css`.

The accent is defined twice — once for dark mode, once for light:

```css
:root, [data-theme="dark"] { --theme-accent: #FF3D2E; }
[data-theme="light"]       { --theme-accent: #E5341F; }
```

Light mode uses a slightly deeper red because the bright one does not hold up
against a near-white background.

`--theme-band` stays near-black in **both** themes on purpose — it is what makes
the stat bar and closing CTA read as solid dark fields on the light site.

---

## 11. Add a page

1. Create `src/app/[locale]/your-page/page.tsx`
2. Register it in `src/i18n/routing.ts`:

```typescript
"/your-page": { en: "/your-page", es: "/tu-pagina" },
```

3. Add it to `navLinks` in `src/components/layout/Navbar.tsx` (the footer and
   mobile menu both import that same list, so they update automatically).
4. Add a `nav.your_page` key to both message files.

---

## 12. Where the WhatsApp number and Calendly link live

**File:** `src/lib/constants.ts`.

Calendly can also be set without touching code, via `.env.local`:

```
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-link
```

The contact form posts to `NEXT_PUBLIC_N8N_WEBHOOK_URL`. If that is empty the
form still validates but the submission goes nowhere — set it before relying on
the form.

---

## 13. Run it

```bash
npm run dev
```

Then open http://localhost:3000. Before pushing:

```bash
npm run build
```

If the build passes, the site is deployable.
