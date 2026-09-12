import type { Metadata } from "next";
import { Space_Grotesk, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const TITLE = "Eduardo Shande — Data & Automation Engineer";
const DESCRIPTION =
  "I build data pipelines, automated workflows and AI integrations that take manual work off your team. Three years with clients in Bolivia and the United States.";

export const metadata: Metadata = {
  metadataBase: new URL("https://sycosmart.com"),
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
      className={`${spaceGrotesk.variable} ${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-bg text-fg">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
