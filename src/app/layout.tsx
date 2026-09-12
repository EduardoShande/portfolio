import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://www.sycosmart.com");

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const TITLE = "Eduardo Shande — Data & Automation Engineer";
const DESCRIPTION =
  "I build data pipelines, automated workflows and AI integrations that take manual work off your team. Three years with clients in Bolivia and the United States.";

export const metadata: Metadata = {
  // Absolute base for canonical and OpenGraph URLs. Set NEXT_PUBLIC_SITE_URL
  // to the custom domain; otherwise Vercel supplies the production URL of the
  // deployment, and local dev falls back to localhost.
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Eduardo Shande",
  },
  description: DESCRIPTION,
  authors: [{ name: "Eduardo Shande Guerrero Yucra" }],
  creator: "Eduardo Shande Guerrero Yucra",
  keywords: [
    "data engineer",
    "automation engineer",
    "n8n",
    "Apache Airflow",
    "ETL",
    "Python",
    "LLM integration",
    "Santa Cruz",
    "Bolivia",
  ],
  openGraph: {
    type: "profile",
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Eduardo Shande",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${bricolage.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-bg text-fg">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
