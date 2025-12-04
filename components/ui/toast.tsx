"use client";

import * as React from "react";
import { X, CheckCircle, AlertCircle, Info, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastVariant =
  | "default"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "destructive";

export type ToastProps = {
  id?: number;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  action?: React.ReactNode;
  className?: string;
  // Toast-level controls (NOT passed to DOM)
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  duration?: number;
  onClose?: () => void;
};

const variantStyles: Record<ToastVariant, string> = {
  default: "bg-background/90 border border-border text-foreground",
  success:
    "bg-green-500/15 border border-green-600 text-green-700 dark:text-green-400",
  error: "bg-red-500/15 border border-red-600 text-red-700 dark:text-red-400",
  warning:
    "bg-yellow-500/15 border border-yellow-600 text-yellow-700 dark:text-yellow-400",
  info: "bg-blue-500/15 border border-blue-600 text-blue-700 dark:text-blue-400",
  destructive:
    "bg-red-500/15 border border-red-600 text-red-700 dark:text-red-400",
};

const variantIcon: Record<ToastVariant, React.ComponentType<any>> = {
  default: Info,
  success: CheckCircle,
  error: AlertCircle,
  warning: TriangleAlert,
  info: Info,
  destructive: AlertCircle,
};

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      title,
      description,
      variant = "default",
      action,
      className,
      onOpenChange,
    },
    ref
  ) => {
    const Icon = variantIcon[variant] ?? Info;

    // internal close handler: call external onOpenChange if provided
    function handleClose() {
      onOpenChange?.(false);
    }

    return (
      <div
        ref={ref}
        // Only pass className (and other safe DOM props if you choose); do NOT spread toast-specific fields.
        className={cn(
          "relative w-full overflow-hidden rounded-xl shadow-lg p-4 flex items-start gap-3 backdrop-blur-sm",
          "transition-all duration-200",
          variantStyles[variant] ?? variantStyles.default,
          className
        )}
        // intentionally not spreading other props to avoid type conflicts
      >
        <div className="mt-1">
          <Icon className="w-5 h-5" />
        </div>

        <div className="flex-1">
          {title && (
            <div className="text-sm font-semibold leading-tight">{title}</div>
          )}
          {description && (
            <div className="text-sm opacity-80 mt-1 leading-relaxed">
              {description}
            </div>
          )}
          {action && <div className="mt-2">{action}</div>}
        </div>

        <button
          type="button"
          className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 transition"
          onClick={handleClose}
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }
);

Toast.displayName = "Toast";
