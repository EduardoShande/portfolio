"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { Phone, Mic, Check, CheckCheck } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { WHATSAPP_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  sender: "user" | "agent";
  type: "text" | "audio";
  content: string;
  audioLabel?: string;
};

type Scenario = "schedule" | "customers" | "inventory";

function AudioWaveform() {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full bg-white/60"
          animate={{
            height: [4, Math.random() * 16 + 4, 4],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.05,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="h-2 w-2 rounded-full bg-white/40"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.sender === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn("flex", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm",
          isUser
            ? "bg-[#005C4B] text-white rounded-br-md"
            : "bg-[#202C33] text-white/90 rounded-bl-md"
        )}
      >
        {message.type === "audio" ? (
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
              <Mic className="h-4 w-4 text-brand-purple-light" />
            </div>
            <div className="flex-1">
              <AudioWaveform />
            </div>
            <span className="text-xs text-white/40">
              {message.audioLabel || "0:05"}
            </span>
          </div>
        ) : (
          <p className="whitespace-pre-line leading-relaxed">{message.content}</p>
        )}
        <div className="mt-1 flex items-center justify-end gap-1">
          <span className="text-[10px] text-white/30">
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          {isUser && <CheckCheck className="h-3 w-3 text-blue-400" />}
        </div>
      </div>
    </motion.div>
  );
}

export default function WhatsAppSimulator() {
  const t = useTranslations("home.simulator");
  const [activeScenario, setActiveScenario] = useState<Scenario>("schedule");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const scenarios: { key: Scenario; label: string; icon: string }[] = [
    { key: "schedule", label: t("scenario_schedule"), icon: "📅" },
    { key: "customers", label: t("scenario_customers"), icon: "💬" },
    { key: "inventory", label: t("scenario_inventory"), icon: "📦" },
  ];

  const getConversation = useCallback(
    (scenario: Scenario): ChatMessage[] => {
      const conversations: Record<Scenario, ChatMessage[]> = {
        schedule: [
          {
            id: "s1",
            sender: "user",
            type: "audio",
            content: t("user_audio_schedule"),
            audioLabel: "0:08",
          },
          {
            id: "s2",
            sender: "agent",
            type: "text",
            content: t("agent_response_schedule"),
          },
        ],
        customers: [
          {
            id: "c1",
            sender: "user",
            type: "audio",
            content: t("user_audio_customers"),
            audioLabel: "0:05",
          },
          {
            id: "c2",
            sender: "agent",
            type: "text",
            content: t("agent_response_customers"),
          },
        ],
        inventory: [
          {
            id: "i1",
            sender: "user",
            type: "audio",
            content: t("user_audio_inventory"),
            audioLabel: "0:06",
          },
          {
            id: "i2",
            sender: "agent",
            type: "text",
            content: t("agent_response_inventory"),
          },
        ],
      };
      return conversations[scenario];
    },
    [t]
  );

  const playScenario = useCallback(
    async (scenario: Scenario) => {
      if (isPlaying) return;
      setIsPlaying(true);
      setMessages([]);
      setIsTyping(false);

      const conversation = getConversation(scenario);

      // Show user audio message
      await new Promise((r) => setTimeout(r, 500));
      setMessages([conversation[0]]);

      // Show typing
      await new Promise((r) => setTimeout(r, 1500));
      setIsTyping(true);

      // Show agent response
      await new Promise((r) => setTimeout(r, 2000));
      setIsTyping(false);
      setMessages([conversation[0], conversation[1]]);
      setIsPlaying(false);
    },
    [getConversation, isPlaying]
  );

  useEffect(() => {
    playScenario(activeScenario);
  }, [activeScenario]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section id="simulator" className="py-20 lg:py-32">
      <Container>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left: Explanation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Scenario selector */}
            <div className="flex flex-wrap gap-2 mb-8">
              {scenarios.map((s) => (
                <button
                  key={s.key}
                  onClick={() => {
                    if (!isPlaying) setActiveScenario(s.key);
                  }}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all cursor-pointer",
                    activeScenario === s.key
                      ? "bg-brand-purple text-white shadow-lg shadow-brand-purple/25"
                      : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <span>{s.icon}</span>
                  {s.label}
                </button>
              ))}
            </div>

            <div className="space-y-4 text-white/60">
              <p className="text-lg">
                <span className="font-semibold text-white">1.</span> Envía un
                audio por WhatsApp con lo que necesitas.
              </p>
              <p className="text-lg">
                <span className="font-semibold text-white">2.</span> Tu agente
                de IA entiende tu mensaje y ejecuta la tarea.
              </p>
              <p className="text-lg">
                <span className="font-semibold text-white">3.</span> Recibe la
                confirmación en segundos. Así de simple.
              </p>
            </div>

            <div className="mt-8">
              <Button variant="whatsapp" size="lg" href={WHATSAPP_URL}>
                {t("cta")}
              </Button>
            </div>
          </motion.div>

          {/* Right: Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Purple glow */}
              <div className="absolute -inset-4 rounded-[3rem] bg-brand-purple/10 blur-2xl" />

              {/* Phone frame */}
              <div className="relative w-[320px] rounded-[2.5rem] border-4 border-white/10 bg-[#0B141A] p-1 shadow-2xl">
                {/* Notch */}
                <div className="absolute left-1/2 top-0 z-10 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-black" />

                {/* WhatsApp Header */}
                <div className="rounded-t-[2rem] bg-[#1F2C34] px-4 pb-3 pt-10">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-purple">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        Sycosmart AI
                      </p>
                      <p className="text-xs text-whatsapp">en línea</p>
                    </div>
                  </div>
                </div>

                {/* Chat area */}
                <div className="h-[400px] overflow-y-auto px-3 py-4 space-y-3">
                  <AnimatePresence mode="wait">
                    {messages.map((msg) => (
                      <ChatBubble key={msg.id} message={msg} />
                    ))}
                  </AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="rounded-2xl bg-[#202C33] rounded-bl-md">
                        <TypingIndicator />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Input bar */}
                <div className="rounded-b-[2rem] bg-[#1F2C34] px-3 py-3">
                  <div className="flex items-center gap-2 rounded-full bg-[#2A3942] px-4 py-2">
                    <span className="flex-1 text-sm text-white/30">
                      Mensaje...
                    </span>
                    <Mic className="h-5 w-5 text-white/40" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
