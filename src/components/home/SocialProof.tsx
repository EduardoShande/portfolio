"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Quote } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const testimonials = [
  {
    name: "Carlos Suárez",
    role: "Inmobiliaria Equipetrol",
    initials: "CS",
    result: { es: "3x ventas", en: "3x sales" },
    quote: {
      es: "El agente de IA califica nuestros leads automáticamente y agenda visitas sin que toquemos un dedo. Cerramos 3x más ventas en el primer mes.",
      en: "The AI agent qualifies our leads automatically and schedules visits without us lifting a finger. We closed 3x more sales in the first month.",
    },
  },
  {
    name: "María Fernanda Torrico",
    role: "Boutique Camba",
    initials: "MT",
    result: { es: "Inventario 100% auto", en: "100% auto inventory" },
    quote: {
      es: "Sycosmart automatizó todo nuestro inventario y notificaciones de WhatsApp. Ahora tenemos tiempo para enfocarnos en crecer el negocio.",
      en: "Sycosmart automated our entire inventory and WhatsApp notifications. Now we have time to focus on growing the business.",
    },
  },
  {
    name: "Diego Justiniano",
    role: "Distribuidora Oriental",
    initials: "DJ",
    result: { es: "+40% retención", en: "+40% retention" },
    quote: {
      es: "El dashboard de inteligencia de clientes nos ayudó a recuperar más del 40% de los clientes que estaban a punto de irse. Increíble.",
      en: "The customer intelligence dashboard helped us recover over 40% of customers who were about to leave. Incredible.",
    },
  },
  {
    name: "Lucía Añez",
    role: "Restaurante Tradiciones",
    initials: "LA",
    result: { es: "+65% ventas", en: "+65% sales" },
    quote: {
      es: "Implementamos pedidos online y automatización de WhatsApp. Las ventas aumentaron 65% en 2 meses y el equipo está más enfocado.",
      en: "We implemented online ordering and WhatsApp automation. Sales increased 65% in 2 months and the team is more focused.",
    },
  },
  {
    name: "Roberto Pedraza",
    role: "Auto Center Santa Cruz",
    initials: "RP",
    result: { es: "Agenda llena", en: "Fully booked" },
    quote: {
      es: "El bot de IA responde consultas 24/7 y agenda pruebas de manejo. Pasamos de perder leads a tener agenda llena toda la semana.",
      en: "The AI bot answers inquiries 24/7 and schedules test drives. We went from losing leads to having a full agenda all week.",
    },
  },
  {
    name: "Valeria Roca",
    role: "Gimnasio Vital Fit",
    initials: "VR",
    result: { es: "-50% churn", en: "-50% churn" },
    quote: {
      es: "El sistema predice qué clientes están por cancelar y les envía promociones personalizadas. Bajamos la deserción en 50%.",
      en: "The system predicts which clients are about to cancel and sends them personalized promos. We reduced churn by 50%.",
    },
  },
];

/**
 * Testimonials as hard-edged plates on a sunken field. The headline number
 * from each engagement is pulled out and set in the accent, so the grid
 * scans as results first and prose second.
 */
export default function SocialProof() {
  const t = useTranslations("home.social_proof");
  const locale = useLocale();
  const lang: "es" | "en" = locale === "en" ? "en" : "es";

  return (
    <section className="relative overflow-hidden bg-bg-sunken py-20 lg:py-32">
      <div
        aria-hidden="true"
        className="absolute -left-32 top-10 h-[32rem] w-[32rem] -rotate-12 bg-accent/[0.04]"
      />

      <Container className="relative">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          titleAccent={t("titleAccent")}
          subtitle={t("subtitle")}
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((testimonial, i) => (
            <motion.figure
              key={testimonial.name}
              variants={{
                hidden: { opacity: 0, y: 28 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
              }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className={`relative flex flex-col border border-border-theme bg-bg-elevated p-7 transition-colors hover:border-accent/50 ${
                i % 2 === 0 ? "clip-notch" : "clip-notch-bl"
              }`}
            >
              <Quote
                aria-hidden="true"
                strokeWidth={1.5}
                className="h-7 w-7 text-accent"
              />

              <p className="numeral mt-6 text-2xl text-accent lg:text-[1.75rem]">
                {testimonial.result[lang]}
              </p>

              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-fg-muted">
                &ldquo;{testimonial.quote[lang]}&rdquo;
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3 border-t border-border-theme pt-5">
                <span className="numeral flex h-10 w-10 shrink-0 items-center justify-center bg-accent text-sm text-white">
                  {testimonial.initials}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-fg">
                    {testimonial.name}
                  </span>
                  <span className="block text-[11px] uppercase tracking-[0.14em] text-fg-muted">
                    {testimonial.role}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
