"use client";

import { useToast } from "@/components/ui/use-toast";
import { Toast } from "@/components/ui/toast";
import { AnimatePresence, motion } from "framer-motion";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center space-y-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ y: -20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-[90%] sm:w-[380px]"
          >
            <Toast
              {...toast}
              id={toast.id}
              className="
                backdrop-blur-md bg-background/80 border shadow-xl 
                dark:bg-neutral-900/80 dark:border-neutral-700
                rounded-xl px-4 py-3
              "
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
