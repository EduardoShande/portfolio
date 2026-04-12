import type { Metadata } from "next";
import { Space_Grotesk, Outfit } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: {
    default: "Sycosmart | Agentes de IA y Marketing Digital en Bolivia",
    template: "%s | Sycosmart",
  },
  description:
    "Agentes de IA que controlas por WhatsApp. Automatiza tu negocio con inteligencia artificial, marketing digital y soluciones tecnológicas en Bolivia.",
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
      <body className="min-h-full flex flex-col bg-brand-black text-brand-off-white">
        {children}
      </body>
    </html>
  );
}
