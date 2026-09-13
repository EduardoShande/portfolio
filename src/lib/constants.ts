import { PROFILE } from "./content";

export const WHATSAPP_NUMBER = "59173115185";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

/**
 * The booking panel on /contact. Visitors pick a weekday and one of these
 * slots, and the request goes to WhatsApp for Eduardo to confirm; nothing is
 * checked against a real calendar. Slots are wall-clock times in Bolivia,
 * which is UTC-4 all year with no daylight saving.
 */
export const BOOKING = {
  timeZone: "America/La_Paz",
  utcOffsetHours: -4,
  slots: ["09:00", "10:30", "14:00", "16:00", "17:30"],
  /** How many upcoming weekdays to offer, starting tomorrow. */
  weekdays: 10,
} as const;

/** Where every "Book a call" button leads. */
export const BOOKING_HREF = "/contact#book";

// PASTE YOUR N8N WEBHOOK URL HERE (or set NEXT_PUBLIC_N8N_WEBHOOK_URL in .env.local)
export const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || "";

export const EMAIL_URL = `mailto:${PROFILE.email}`;
export const GITHUB_URL = PROFILE.github;
export const LINKEDIN_URL = PROFILE.linkedin;
export const CV_URL = PROFILE.cvPath;

export const SITE_NAME = PROFILE.shortName;
export const SITE_DESCRIPTION_ES =
  "Ingeniero de Datos y Automatización. Construyo sistemas que eliminan trabajo manual.";
export const SITE_DESCRIPTION_EN =
  "Data & Automation Engineer. I build systems that take manual work off your team.";

/**
 * Social profiles, in the order they appear on the site. Entries with an
 * empty URL in PROFILE are filtered out, so an unset network never renders
 * a dead link.
 */
export const SOCIALS = [
  { id: "github", href: PROFILE.github, label: "GitHub" },
  { id: "linkedin", href: PROFILE.linkedin, label: "LinkedIn" },
  { id: "instagram", href: PROFILE.instagram, label: "Instagram" },
  { id: "tiktok", href: PROFILE.tiktok, label: "TikTok" },
  { id: "facebook", href: PROFILE.facebook, label: "Facebook" },
].filter((s) => s.href.length > 0);
