"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "15550192834";
  const message = encodeURIComponent(
    process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || "Hi ASSolutions! I'd like to discuss a project."
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 200 }}
      className="fixed bottom-6 right-6 z-50"
    >
      {/* Pulse rings */}
      <div className="absolute inset-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-20" />
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-10" style={{ animationDelay: "0.5s" }} />
      </div>

      <a
        href={`https://wa.me/${phone}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-green-500 shadow-lg transition-all hover:scale-110 hover:bg-green-600 hover:shadow-xl hover:shadow-green-500/25"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </a>

      {/* Tooltip */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-black opacity-0 shadow-lg transition-opacity hover:opacity-100">
        Chat with us!
      </div>
    </motion.div>
  );
}
