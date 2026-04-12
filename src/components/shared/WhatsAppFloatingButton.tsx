"use client";

import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/constants";

export default function WhatsAppFloatingButton() {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.92 }}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg shadow-whatsapp/40"
    >
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <MessageCircle className="h-7 w-7" />
      </motion.div>
    </motion.a>
  );
}
