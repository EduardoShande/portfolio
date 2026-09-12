"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import {
  Phone,
  Mic,
  CheckCheck,
  Building2,
  Settings2,
  BarChart3,
} from "lucide-react";
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

type Scenario = "sales" | "operations" | "intelligence";

function AudioWaveform() {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full bg-white/60 will-change-transform"
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
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
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
      initial={{ opacity: 0, y: 12, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn("flex", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm",
          isUser
            ? "bg-[#005C4B] text-white rounded-br-md"
            : "bg-[#202C33] text-white/90 rounded-bl-md"
        )}
      >
        {message.type === "audio" ? (
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
              <Mic className="h-4 w-4 text-[#C084FC]" />
            </div>
            <div className="flex-1">
              <AudioWaveform />
            </div>
            <span className="text-xs text-white/40">
              {message.audioLabel || "0:05"}
            </span>
          </div>
        ) : (
          <p className="whitespace-pre-line leading-relaxed text-[13px]">
            {message.content}
          </p>
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
  const [activeScenario, setActiveScenario] = useState<Scenario>("sales");
  const [visibleCount, setVisibleCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const playingRef = useRef(false);

  const scenarios: {
    key: Scenario;
    label: string;
    Icon: typeof Building2;
  }[] = [
    { key: "sales", label: t("scenario_sales"), Icon: Building2 },
    { key: "operations", label: t("scenario_operations"), Icon: Settings2 },
    { key: "intelligence", label: t("scenario_intelligence"), Icon: BarChart3 },
  ];

  const getConversation = useCallback(
    (scenario: Scenario): ChatMessage[] => {
      const conversations: Record<Scenario, ChatMessage[]> = {
        sales: [
          { id: "s1", sender: "user", type: "audio", content: "", audioLabel: "0:09" },
          { id: "s2", sender: "agent", type: "text", content: t("sales_msg_1") },
          { id: "s3", sender: "user", type: "text", content: t("sales_msg_2") },
          { id: "s4", sender: "agent", type: "text", content: t("sales_msg_3") },
          { id: "s5", sender: "user", type: "audio", content: "", audioLabel: "0:06" },
          { id: "s6", sender: "agent", type: "text", content: t("sales_msg_5") },
          { id: "s7", sender: "user", type: "text", content: t("sales_msg_6") },
          { id: "s8", sender: "agent", type: "text", content: t("sales_msg_7") },
        ],
        operations: [
          { id: "o1", sender: "user", type: "audio", content: "", audioLabel: "0:11" },
          { id: "o2", sender: "agent", type: "text", content: t("ops_msg_1") },
          { id: "o3", sender: "user", type: "text", content: t("ops_msg_2") },
          { id: "o4", sender: "agent", type: "text", content: t("ops_msg_3") },
          { id: "o5", sender: "user", type: "audio", content: "", audioLabel: "0:05" },
          { id: "o6", sender: "agent", type: "text", content: t("ops_msg_5") },
          { id: "o7", sender: "user", type: "text", content: t("ops_msg_6") },
          { id: "o8", sender: "agent", type: "text", content: t("ops_msg_7") },
        ],
        intelligence: [
          { id: "i1", sender: "user", type: "audio", content: "", audioLabel: "0:08" },
          { id: "i2", sender: "agent", type: "text", content: t("intel_msg_1") },
          { id: "i3", sender: "user", type: "text", content: t("intel_msg_2") },
          { id: "i4", sender: "agent", type: "text", content: t("intel_msg_3") },
          { id: "i5", sender: "user", type: "text", content: t("intel_msg_4") },
          { id: "i6", sender: "agent", type: "text", content: t("intel_msg_5") },
          { id: "i7", sender: "user", type: "audio", content: "", audioLabel: "0:04" },
          { id: "i8", sender: "agent", type: "text", content: t("intel_msg_7") },
        ],
      };
      return conversations[scenario];
    },
    [t]
  );

  const playScenario = useCallback(
    async (scenario: Scenario) => {
      if (playingRef.current) return;
      playingRef.current = true;
      setVisibleCount(0);
      setIsTyping(false);

      const conversation = getConversation(scenario);

      for (let i = 0; i < conversation.length; i++) {
        const msg = conversation[i];
        await new Promise((r) => setTimeout(r, 600));

        if (msg.sender === "agent") {
          setIsTyping(true);
          await new Promise((r) => setTimeout(r, 1100));
          setIsTyping(false);
        }

        setVisibleCount(i + 1);
      }

      playingRef.current = false;
    },
    [getConversation]
  );

  useEffect(() => {
    playScenario(activeScenario);
  }, [activeScenario, playScenario]);

  // Scroll ONLY inside the chat container — never scroll the page itself
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;
    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [visibleCount, isTyping]);

  const conversation = getConversation(activeScenario);

  return (
    <section id="simulator" className="relative overflow-hidden py-20 lg:py-32">
      <div
        aria-hidden="true"
        className="absolute -right-40 top-20 h-[34rem] w-[34rem] -rotate-12 bg-accent/[0.04]"
      />
      <Container className="relative">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          titleAccent={t("titleAccent")}
          subtitle={t("subtitle")}
        />

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap gap-2 mb-8">
              {scenarios.map((s) => {
                const Icon = s.Icon;
                return (
                  <motion.button
                    key={s.key}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      if (!playingRef.current) setActiveScenario(s.key);
                    }}
                    className={cn(
                      "flex items-center gap-2 rounded-[2px] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] cursor-pointer transition-colors",
                      activeScenario === s.key
                        ? "bg-accent text-white"
                        : "bg-bg-elevated text-fg-muted hover:text-fg border border-border-theme"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {s.label}
                  </motion.button>
                );
              })}
            </div>

            <h3 className="font-heading text-3xl font-bold tracking-[-0.02em] mb-4 text-fg">
              {t(`${activeScenario}_title`)}
            </h3>
            <p className="text-fg-muted leading-relaxed mb-6">
              {t(`${activeScenario}_description`)}
            </p>

            <div className="space-y-3 mb-8">
              {[1, 2, 3].map((n) => (
                <motion.div
                  key={n}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: n * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1.5 h-2 w-2 rotate-45 bg-accent flex-shrink-0" />
                  <p className="text-sm text-fg-muted">
                    {t(`${activeScenario}_benefit_${n}`)}
                  </p>
                </motion.div>
              ))}
            </div>

            <Button variant="whatsapp" size="lg" href={WHATSAPP_URL}>
              {t("cta")}
            </Button>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-6 rounded-[3rem] bg-accent/20 blur-3xl"
              />

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-[320px] rounded-[2.5rem] border-4 border-white/10 bg-[#0B141A] p-1 shadow-2xl will-change-transform"
              >
                <div className="absolute left-1/2 top-0 z-10 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-black" />

                <div className="rounded-t-[2rem] bg-[#1F2C34] px-4 pb-3 pt-10">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        Sycosmart AI
                      </p>
                      <p className="text-xs text-whatsapp">online</p>
                    </div>
                  </div>
                </div>

                <div
                  ref={chatContainerRef}
                  className="h-[420px] overflow-y-auto px-3 py-4 space-y-3"
                >
                  <AnimatePresence initial={false}>
                    {conversation.slice(0, visibleCount).map((msg) => (
                      <ChatBubble key={msg.id} message={msg} />
                    ))}
                    {isTyping && (
                      <motion.div
                        key="typing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex justify-start"
                      >
                        <div className="rounded-2xl bg-[#202C33] rounded-bl-md">
                          <TypingIndicator />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="rounded-b-[2rem] bg-[#1F2C34] px-3 py-3">
                  <div className="flex items-center gap-2 rounded-full bg-[#2A3942] px-4 py-2">
                    <span className="flex-1 text-sm text-white/30">
                      Message...
                    </span>
                    <Mic className="h-5 w-5 text-white/40" />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
