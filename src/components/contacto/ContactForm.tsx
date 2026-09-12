"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import { Send, Loader2, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { N8N_WEBHOOK_URL } from "@/lib/constants";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  business: z.string().min(2),
  service: z.string().min(1),
  budget: z.string().min(1),
  message: z.string().min(10),
});

type FormData = z.infer<typeof schema>;

const inputStyles =
  "w-full rounded-[2px] border border-border-theme bg-bg/50 px-4 py-3 text-sm text-fg placeholder:text-fg-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all";

const fieldVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      if (N8N_WEBHOOK_URL) {
        await fetch(N8N_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        await new Promise((r) => setTimeout(r, 1500));
      }
      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <CheckCircle className="h-16 w-16 text-whatsapp mb-4" />
        </motion.div>
        <p className="text-lg text-fg font-medium">{t("success")}</p>
      </motion.div>
    );
  }

  const budgetOptions = [
    { id: "lt-2000", label: t("budget_lt_2000") },
    { id: "2000-5000", label: t("budget_2000_5000") },
    { id: "5000-15000", label: t("budget_5000_15000") },
    { id: "15000-50000", label: t("budget_15000_50000") },
    { id: "gt-50000", label: t("budget_gt_50000") },
    { id: "unsure", label: t("budget_unsure") },
  ];

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.06 } },
      }}
      className="space-y-4"
    >
      <motion.div variants={fieldVariants}>
        <input
          {...register("name")}
          placeholder={t("name")}
          className={cn(inputStyles, errors.name && "border-red-500")}
        />
      </motion.div>

      <motion.div
        variants={fieldVariants}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        <input
          {...register("email")}
          type="email"
          placeholder={t("email")}
          className={cn(inputStyles, errors.email && "border-red-500")}
        />
        <input
          {...register("phone")}
          type="tel"
          placeholder={t("phone")}
          className={cn(inputStyles, errors.phone && "border-red-500")}
        />
      </motion.div>

      <motion.div variants={fieldVariants}>
        <input
          {...register("business")}
          placeholder={t("business")}
          className={cn(inputStyles, errors.business && "border-red-500")}
        />
      </motion.div>

      <motion.div variants={fieldVariants}>
        <select
          {...register("service")}
          className={cn(
            inputStyles,
            "appearance-none cursor-pointer",
            errors.service && "border-red-500"
          )}
          defaultValue=""
        >
          <option value="" disabled>
            {t("service_placeholder")}
          </option>
          <option value="ai-agents">Agentes de IA & Automatización</option>
          <option value="web-dev">Desarrollo Web</option>
          <option value="mobile-apps">Mobile Apps</option>
          <option value="crm">CRM</option>
          <option value="meta-ads">Meta Ads</option>
          <option value="digital-marketing">Marketing Digital</option>
          <option value="custom-software">Software a Medida</option>
        </select>
      </motion.div>

      <motion.div variants={fieldVariants}>
        <label className="block text-xs font-semibold uppercase tracking-wider text-fg-muted mb-2">
          {t("budget_label")}
        </label>
        <select
          {...register("budget")}
          className={cn(
            inputStyles,
            "appearance-none cursor-pointer",
            errors.budget && "border-red-500"
          )}
          defaultValue=""
        >
          <option value="" disabled>
            {t("budget_placeholder")}
          </option>
          {budgetOptions.map((b) => (
            <option key={b.id} value={b.id}>
              {b.label}
            </option>
          ))}
        </select>
      </motion.div>

      <motion.div variants={fieldVariants}>
        <textarea
          {...register("message")}
          placeholder={t("message")}
          rows={4}
          className={cn(inputStyles, "resize-none", errors.message && "border-red-500")}
        />
      </motion.div>

      <motion.button
        variants={fieldVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={status === "loading"}
        className="flex w-full items-center justify-center gap-2 rounded-[2px] bg-accent px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-accent-deep disabled:opacity-50 cursor-pointer"
      >
        {status === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        {t("submit")}
      </motion.button>

      {status === "error" && (
        <p className="text-xs text-red-400 text-center">{t("error")}</p>
      )}
    </motion.form>
  );
}
