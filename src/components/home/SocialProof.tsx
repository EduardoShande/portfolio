"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const testimonials = [
  {
    name: "Academia Diamond Art",
    role: "Academia de Danza",
    quote: {
      es: "Sycosmart nos ayudó a profesionalizar nuestra presencia digital desde cero. Ahora tenemos más alumnos que nunca.",
      en: "Sycosmart helped us professionalize our digital presence from scratch. Now we have more students than ever.",
    },
  },
  {
    name: "Empresa Local",
    role: "Retail",
    quote: {
      es: "El agente de IA por WhatsApp cambió completamente la forma en que manejamos nuestros clientes. Ahorramos horas cada día.",
      en: "The WhatsApp AI agent completely changed how we handle our customers. We save hours every day.",
    },
  },
  {
    name: "Consultorio Dental",
    role: "Salud",
    quote: {
      es: "La automatización de citas nos permitió enfocarnos en lo que realmente importa: nuestros pacientes.",
      en: "Appointment automation allowed us to focus on what really matters: our patients.",
    },
  },
];

export default function SocialProof() {
  const t = useTranslations("home.social_proof");

  return (
    <section className="py-20 lg:py-32 bg-brand-dark/50">
      <Container>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="rounded-2xl border border-white/5 bg-brand-dark p-6"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4 fill-brand-purple text-brand-purple"
                  />
                ))}
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                &ldquo;{testimonial.quote.es}&rdquo;
              </p>
              <div className="mt-4 border-t border-white/5 pt-4">
                <p className="text-sm font-semibold">{testimonial.name}</p>
                <p className="text-xs text-white/40">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
