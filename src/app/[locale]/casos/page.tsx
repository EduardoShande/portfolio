"use client";

import { useTranslations } from "next-intl";
import { motion, useInView, useMotionValue, animate } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { Quote, TrendingUp, Clock, Users } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { WHATSAPP_URL } from "@/lib/constants";

type CaseStudy = {
  id: string;
  client: string;
  industry: string;
  initials: string;
  problem: string;
  solution: string;
  quote: string;
  quoteAuthor: string;
  metrics: { label: string; value: number; suffix: string; icon: typeof TrendingUp }[];
};

const caseStudies: CaseStudy[] = [
  {
    id: "tradiciones",
    client: "Restaurante Tradiciones",
    industry: "Gastronomía · Santa Cruz de la Sierra",
    initials: "RT",
    problem:
      "Manejaban pedidos por teléfono y WhatsApp manualmente, perdían pedidos en horas pico, y no tenían forma de rastrear ventas online. El personal pasaba 4-5 horas al día atendiendo llamadas en lugar de cocinar.",
    solution:
      "Implementamos un sistema completo de pedidos online con menú digital, integración a WhatsApp Business para confirmaciones automáticas, panel de gestión de pedidos en tiempo real, y notificaciones a la cocina vía impresión automática. Todo conectado con su POS existente.",
    quote: "Pasamos de perder pedidos a tener un sistema que no falla. Ahora puedo enfocarme en la cocina y no en contestar el teléfono todo el día.",
    quoteAuthor: "Lucía Añez, Propietaria",
    metrics: [
      { label: "Aumento en ventas", value: 65, suffix: "%", icon: TrendingUp },
      { label: "Horas ahorradas/día", value: 5, suffix: "h", icon: Clock },
      { label: "Pedidos automatizados", value: 100, suffix: "%", icon: Users },
    ],
  },
  {
    id: "oriental",
    client: "Distribuidora Oriental",
    industry: "Distribución mayorista · Santa Cruz",
    initials: "DO",
    problem:
      "Gestionaban inventario en Excel, los pedidos por WhatsApp se perdían entre conversaciones, y los errores en stock causaban entregas equivocadas casi semanalmente. Tenían 3 personas dedicadas solo a coordinar pedidos.",
    solution:
      "Construimos un sistema integrado con N8N que conecta inventario, WhatsApp Business y facturación. Los clientes hacen pedidos por WhatsApp, el sistema verifica stock automáticamente, genera la orden, envía confirmación al cliente y notifica al almacén. Todo sin intervención manual.",
    quote: "Lo que antes tomaba 3 personas ahora lo hace el sistema solo. Pudimos reasignar al equipo a tareas que sí generan dinero.",
    quoteAuthor: "Diego Justiniano, Gerente de Operaciones",
    metrics: [
      { label: "Reducción de errores", value: 92, suffix: "%", icon: TrendingUp },
      { label: "Tiempo de respuesta", value: 80, suffix: "% menos", icon: Clock },
      { label: "Pedidos diarios", value: 3, suffix: "x más", icon: Users },
    ],
  },
  {
    id: "equipetrol",
    client: "Inmobiliaria Equipetrol",
    industry: "Bienes raíces · Santa Cruz",
    initials: "IE",
    problem:
      "Recibían cientos de consultas semanales por WhatsApp e Instagram. La mayoría eran personas no calificadas, y los agentes perdían horas filtrando para encontrar leads reales. Muchos prospectos serios se perdían por no responder a tiempo.",
    solution:
      "Desarrollamos un agente de IA que califica leads automáticamente: pregunta presupuesto, zona deseada, tipo de propiedad y timing de compra. Solo deriva al equipo humano los leads calificados. También agenda visitas directamente en el calendario del agente disponible.",
    quote: "El bot trabaja 24/7 sin cansarse. Cerramos 3x más ventas porque ahora hablamos solo con gente que realmente quiere comprar.",
    quoteAuthor: "Carlos Suárez, Director Comercial",
    metrics: [
      { label: "Aumento de ventas", value: 300, suffix: "%", icon: TrendingUp },
      { label: "Disponibilidad", value: 24, suffix: "/7", icon: Clock },
      { label: "Leads calificados/sem", value: 50, suffix: "+", icon: Users },
    ],
  },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, target, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.floor(v)),
    });
    return controls.stop;
  }, [isInView, target, count]);

  return (
    <span ref={ref} className="font-heading text-3xl font-bold text-accent lg:text-4xl">
      {display}
      {suffix}
    </span>
  );
}

export default function CasosPage() {
  const t = useTranslations("cases");

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20">
        <Container>
          <SectionHeading title={t("hero.title")} subtitle={t("hero.subtitle")} />
        </Container>
      </section>

      {/* Case Studies */}
      <section className="pb-20 lg:pb-32">
        <Container>
          <div className="space-y-12">
            {caseStudies.map((cs, i) => (
              <motion.div
                key={cs.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ y: -4 }}
                className="group clip-notch border border-border-theme bg-bg-elevated overflow-hidden hover:border-accent/50 transition-colors"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 lg:p-12">
                  {/* Left: Client info */}
                  <div className="lg:col-span-1">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex h-14 w-14 items-center justify-center bg-accent text-white text-lg font-bold">
                        {cs.initials}
                      </div>
                      <div>
                        <h3 className="font-heading text-xl font-bold text-fg">
                          {cs.client}
                        </h3>
                        <p className="text-xs text-fg-muted">{cs.industry}</p>
                      </div>
                    </div>

                    {/* Quote */}
                    <div className="relative clip-notch bg-accent/5 border border-accent/20 p-5">
                      <Quote className="absolute -top-3 left-4 h-6 w-6 text-accent bg-bg-elevated p-1 rounded" />
                      <p className="text-sm text-fg italic leading-relaxed">
                        &ldquo;{cs.quote}&rdquo;
                      </p>
                      <p className="mt-3 text-xs text-fg-muted">
                        — {cs.quoteAuthor}
                      </p>
                    </div>
                  </div>

                  {/* Right: Problem + Solution + Metrics */}
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
                        El Problema
                      </p>
                      <p className="text-sm text-fg-muted leading-relaxed">
                        {cs.problem}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
                        La Solución
                      </p>
                      <p className="text-sm text-fg-muted leading-relaxed">
                        {cs.solution}
                      </p>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border-theme">
                      {cs.metrics.map((m, j) => {
                        const Icon = m.icon;
                        return (
                          <motion.div
                            key={j}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + j * 0.1 }}
                            className="text-center"
                          >
                            <Icon className="h-5 w-5 text-accent mx-auto mb-2" />
                            <CountUp target={m.value} suffix={m.suffix} />
                            <p className="text-[11px] text-fg-muted mt-1 leading-tight">
                              {m.label}
                            </p>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="pb-20 lg:pb-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="clip-notch grain relative overflow-hidden bg-band p-10 sm:p-16 text-center"
          >
            <h2 className="font-heading text-3xl font-bold tracking-[-0.02em] sm:text-4xl text-white">
              {t("cta_title")}
            </h2>
            <p className="mt-4 text-white/60 max-w-lg mx-auto">
              {t("cta_subtitle")}
            </p>
            <div className="mt-8">
              <Button variant="whatsapp" size="lg" href={WHATSAPP_URL}>
                {t("cta_button")}
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
