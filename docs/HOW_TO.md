# How To Guide — Sycosmart Web

A plain-language guide for non-developers explaining how to make common changes to the website.

---

## 1. How to update testimonials

**File**: `src/components/home/SocialProof.tsx`

Open the file and find the `testimonials` array near the top (around lines 8-60). Each testimonial looks like this:

```typescript
{
  name: "Carlos Suárez",
  role: "Inmobiliaria Equipetrol",
  initials: "CS",
  quote: {
    es: "Spanish quote here...",
    en: "English quote here...",
  },
},
```

To **add** a new testimonial: copy one of the existing blocks and paste it inside the array.
To **remove**: delete the whole block (from `{` to `},`).
To **edit**: change the `name`, `role`, `initials`, or `quote` text directly.

The `initials` show in the avatar circle — usually 2 letters from the name.

---

## 2. How to update case studies

**File**: `src/app/[locale]/casos/page.tsx`

Find the `caseStudies` array (around lines 18-90). Each case has this structure:

```typescript
{
  id: "tradiciones",                  // unique identifier
  client: "Restaurante Tradiciones",  // company name
  industry: "Gastronomía · Santa Cruz",
  initials: "RT",                     // avatar initials
  problem: "Description of problem...",
  solution: "What you built...",
  quote: "Client quote here...",
  quoteAuthor: "Lucía Añez, Propietaria",
  metrics: [
    { label: "Aumento en ventas", value: 65, suffix: "%", icon: TrendingUp },
    { label: "Horas ahorradas/día", value: 5, suffix: "h", icon: Clock },
    { label: "Pedidos automatizados", value: 100, suffix: "%", icon: Users },
  ],
},
```

The numbers in `value` will animate counting up from 0 when the card scrolls into view.

To **add** a case: copy the block, paste it inside the array, and edit the values.
To **remove**: delete the whole block.

---

## 3. How to add or remove services

**Two files to update:**

### File 1 — The services list config
**File**: `src/app/[locale]/servicios/page.tsx`

Find the `serviceList` array (around lines 22-30):

```typescript
const serviceList = [
  { key: "ai_agents", icon: Bot, highlight: true },
  { key: "web_dev", icon: Globe, highlight: false },
  ...
];
```

To **add** a service: add a new line with a unique `key`, an icon (import it from `lucide-react` at the top), and `highlight: false`.
To **remove**: delete the line.

### File 2 — The translations
**Files**: `src/messages/es.json` AND `src/messages/en.json`

Find the `services` section. Add a new entry matching your `key`:

```json
"my_new_service": {
  "title": "Service Title",
  "description": "Service description goes here",
  "deliverables": [
    "Deliverable 1",
    "Deliverable 2",
    "Deliverable 3",
    "Deliverable 4"
  ]
},
```

Do this in **both** `es.json` and `en.json` (same key, translated content).

---

## 4. How to connect the contact form to N8N

The contact form sends submissions to an N8N webhook. To set this up:

### Step 1: Create the webhook in N8N
1. Open your N8N instance
2. Create a new workflow
3. Add a "Webhook" node as the trigger
4. Set the HTTP method to **POST**
5. Copy the webhook URL N8N gives you

### Step 2: Paste the URL into the website

**Option A — Using `.env.local` (recommended)**

Create a file called `.env.local` in the project root (next to `package.json`) and add:

```
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/your-id
```

Then restart the dev server (`npm run dev`).

**Option B — Hardcoded fallback**

**File**: `src/lib/constants.ts` (line 8)

```typescript
export const N8N_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || "PASTE_YOUR_URL_HERE";
```

Replace `"PASTE_YOUR_URL_HERE"` with your actual webhook URL between the quotes.

### Step 3: What the form sends to N8N

The form POSTs a JSON object with these fields:

```json
{
  "name": "Customer name",
  "email": "customer@email.com",
  "phone": "+591 123456",
  "business": "Their business name",
  "service": "ai-agents",
  "budget": "5000-15000",
  "message": "Their message"
}
```

Configure your N8N workflow to handle these fields (send email, save to CRM, etc.).

---

## 5. How to change color themes

**File**: `src/app/globals.css`

Find the theme blocks (look for `[data-theme="..."]`). Each theme has these variables:

```css
[data-theme="black"] {
  --theme-bg: #0A0A0A;          /* main background */
  --theme-bg-elevated: #1C1C1C; /* card backgrounds */
  --theme-fg: #F9F9F9;          /* main text color */
  --theme-fg-muted: ...;        /* secondary text */
  --theme-border: ...;          /* borders */
  --theme-accent: #7C3AED;      /* main accent (buttons) */
  --theme-accent-light: ...;    /* lighter accent */
}
```

To **change a color**: edit the hex value after the `:` and before the `;`.
To **add a new theme**: copy a whole `[data-theme="..."]` block, give it a new name, and add it to `THEMES` in `src/components/providers/ThemeProvider.tsx`.

---

## 6. How to update contact info (phone, WhatsApp, Calendly)

**File**: `src/lib/constants.ts`

```typescript
export const WHATSAPP_NUMBER = "59173115185";        // ← change this
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const CALENDLY_URL = "https://calendly.com/sycosmart"; // ← change this
```

The WhatsApp number must be in international format **without** the `+` sign or spaces. For Bolivia, it starts with `591`.

The Calendly URL is your full booking page link.

After changing these, the new values will appear everywhere on the site automatically (navbar, footer, floating button, contact page).

---

## 7. How to adjust or disable animations

All animations use the `motion` library (Framer Motion).

### Disable a specific animation
Find the component file and look for `motion.div`, `motion.h1`, etc. Remove the animation props:

```jsx
// BEFORE
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{ y: -6 }}
>

// AFTER (no animation)
<div>
```

You can also change `motion.div` to just `div` to remove all animations from that element.

### Slow down animations
Look for `transition={{ duration: 0.5 }}` and change `0.5` to a higher number (e.g., `1.5` for slower).

### Disable parallax in hero
**File**: `src/components/home/HeroSection.tsx`

Find the `useEffect` hook that adds the mousemove listener (around lines 60-70). Comment it out or delete it to disable mouse tracking.

### Disable hover effects on cards
Search project for `whileHover={{ y: -6 }}` and remove those props.

---

## 8. How to deploy updates

### Step 1: Push to GitHub

In a terminal, in the project folder, run:

```bash
git add .
git commit -m "Description of what you changed"
git push
```

### Step 2: Vercel auto-deploys

If the project is connected to Vercel (free hosting), it will automatically detect the push and deploy in 1-2 minutes. You can check the status at https://vercel.com

### Step 3: Coolify (when VPS is ready)

When you switch to the Contabo VPS with Coolify:
1. Coolify is also connected to GitHub
2. It auto-deploys on every push
3. You manage everything from the Coolify dashboard

### Testing locally before pushing

Always test changes locally first:

```bash
npm run dev
```

Open http://localhost:3000 and check that everything looks right. When you're happy, then push.

---

## Quick Reference: Where Things Live

| What you want to change | File |
|-------------------------|------|
| Hero text | `src/messages/es.json` (and `en.json`) → `home.hero` |
| Service descriptions | `src/messages/es.json` → `services.*` |
| Testimonials | `src/components/home/SocialProof.tsx` |
| Case studies | `src/app/[locale]/casos/page.tsx` |
| WhatsApp number | `src/lib/constants.ts` |
| Calendly URL | `src/lib/constants.ts` or `.env.local` |
| N8N webhook | `.env.local` |
| Theme colors | `src/app/globals.css` |
| Add a new page | Create folder in `src/app/[locale]/your-page/page.tsx` |
| Navbar links | `src/components/layout/Navbar.tsx` (`navLinks` array) |
| Footer links | `src/components/layout/Footer.tsx` |

---

## Need Help?

If you get stuck, look in `docs/PROJECT.md` for technical details about how the project is structured, or check the `docs/CHANGES.md` for the history of changes.
