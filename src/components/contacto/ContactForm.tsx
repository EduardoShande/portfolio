"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Loader2, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  business: z.string().min(2),
  service: z.string().min(1),
  message: z.string().min(10),
});

type FormData = z.infer<typeof schema>;

const inputStyles =
  "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-brand-purple focus:outline-none focus:ring-1 focus:ring-brand-purple transition-colors";

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
      // TODO: Replace with N8N webhook URL
      await new Promise((r) => setTimeout(r, 1500));
      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <CheckCircle className="h-12 w-12 text-whatsapp mb-4" />
        <p className="text-sm text-whatsapp font-medium">{t("success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          {...register("name")}
          placeholder={t("name")}
          className={cn(inputStyles, errors.name && "border-red-500")}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
      </div>
      <div>
        <input
          {...register("business")}
          placeholder={t("business")}
          className={cn(inputStyles, errors.business && "border-red-500")}
        />
      </div>
      <div>
        <select
          {...register("service")}
          className={cn(inputStyles, "appearance-none", errors.service && "border-red-500")}
          defaultValue=""
        >
          <option value="" disabled>
            {t("service_placeholder")}
          </option>
          <option value="ai-agents">Agentes de IA</option>
          <option value="automation">Automatización</option>
          <option value="meta-ads">Meta Ads</option>
          <option value="web-dev">Desarrollo Web</option>
          <option value="chatbots">Chatbots</option>
          <option value="consulting">Consultoría Digital</option>
        </select>
      </div>
      <div>
        <textarea
          {...register("message")}
          placeholder={t("message")}
          rows={4}
          className={cn(inputStyles, "resize-none", errors.message && "border-red-500")}
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-purple px-6 py-3 text-sm font-medium text-white transition-all hover:bg-brand-purple/90 disabled:opacity-50 cursor-pointer"
      >
        {status === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        {t("submit")}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-400 text-center">{t("error")}</p>
      )}
    </form>
  );
}
