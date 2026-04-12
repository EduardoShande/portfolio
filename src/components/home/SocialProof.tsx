"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const testimonials = [
  {
    name: "Carlos Suárez",
    role: "Inmobiliaria Equipetrol",
    initials: "CS",
    quote: {
      es: "El agente de IA califica nuestros leads automáticamente y agenda visitas sin que toquemos un dedo. Cerramos 3x más ventas en el primer mes.",
      en: "The AI agent qualifies our leads automatically and schedules visits without us lifting a finger. We closed 3x more sales in the first month.",
    },
  },
  {
    name: "María Fernanda Torrico",
    role: "Boutique Camba",
    initials: "MT",
    quote: {
      es: "Sycosmart automatizó todo nuestro inventario y notificaciones de WhatsApp. Ahora tenemos tiempo para enfocarnos en crecer el negocio.",
      en: "Sycosmart automated our entire inventory and WhatsApp notifications. Now we have time to focus on growing the business.",
    },
  },
  {
    name: "Diego Justiniano",
    role: "Distribuidora Oriental",
    initials: "DJ",
    quote: {
      es: "El dashboard de inteligencia de clientes nos ayudó a recuperar más del 40% de los clientes que estaban a punto de irse. Increíble.",
      en: "The customer intelligence dashboard helped us recover over 40% of customers who were about to leave. Incredible.",
    },
  },
  {
    name: "Lucía Añez",
    role: "Restaurante Tradiciones",
    initials: "LA",
    quote: {
      es: "Implementamos pedidos online y automatización de WhatsApp. Las ventas aumentaron 65% en 2 meses y el equipo está más enfocado.",
      en: "We implemented online ordering and WhatsApp automation. Sales increased 65% in 2 months and the team is more focused.",
    },
  },
  {
    name: "Roberto Pedraza",
    role: "Auto Center Santa Cruz",
    initials: "RP",
    quote: {
      es: "El bot de IA responde consultas 24/7 y agenda pruebas de manejo. Pasamos de perder leads a tener agenda llena toda la semana.",
      en: "The AI bot answers inquiries 24/7 and schedules test drives. We went from losing leads to having a full agenda all week.",
    },
  },
  {
    name: "Valeria Roca",
    role: "Gimnasio Vital Fit",
    initials: "VR",
    quote: {
      es: "El sistema predice qué clientes están por cancelar y les envía promociones personalizadas. Bajamos la deserción en 50%.",
      en: "The system predicts which clients are about to cancel and sends them personalized promos. We reduced churn by 50%.",
    },
  },
];

export default function SocialProof() {
  const t = useTranslations("home.social_proof");

  return (
    <section className="py-20 lg:py-32 bg-bg-elevated/50">
      <Container>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-border-theme bg-bg-elevated p-6 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-colors"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4 fill-accent text-accent"
                  />
                ))}
              </div>
              <p className="text-sm text-fg-muted leading-relaxed min-h-[100px]">
                &ldquo;{testimonial.quote.es}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3 border-t border-border-theme pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white text-sm font-semibold">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-fg">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-fg-muted">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
