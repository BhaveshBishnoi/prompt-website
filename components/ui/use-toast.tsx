// components/ui/use-toast.ts
import React from "react";

export type ToastVariant =
  | "default"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "destructive";

export type ToastOptions = {
  title?: string;
  description?: string;
  variant?: ToastVariant;
  action?: React.ReactNode;
  // duration in ms; pass 0 for persistent
  duration?: number;
  // optional callback when toast is dismissed/closed
  onClose?: () => void;
};

export type ToastRecord = ToastOptions & {
  id: number;
  open: boolean;
};

type State = {
  toasts: ToastRecord[];
};

type Listener = (s: State) => void;

const DEFAULT_DURATION = 5000;
const LIMIT = 4;

// simple id generator (monotonic)
let _id = Date.now();
function genId() {
  _id += 1;
  return _id;
}

// Global state + listeners
let state: State = { toasts: [] };
const listeners: Listener[] = [];

// map of auto-dismiss timeouts, keyed by toast id
const timeouts = new Map<number, ReturnType<typeof setTimeout>>();

function notify() {
  for (const l of listeners) {
    try {
      l(state);
    } catch (err) {
      // ignore listener errors to avoid breaking others
      // console.error('toast listener error', err)
    }
  }
}

function addToastRecord(opts: ToastOptions): ToastRecord {
  const id = genId();
  const record: ToastRecord = {
    id,
    open: true,
    title: opts.title,
    description: opts.description,
    variant: opts.variant ?? "default",
    action: opts.action,
    duration: opts.duration,
    onClose: opts.onClose,
  } as ToastRecord;
  // keep only last LIMIT toasts
  state = { toasts: [...state.toasts, record].slice(-LIMIT) };
  notify();
  return record;
}

function removeToastRecord(id: number) {
  // clear timeout if exists
  const t = timeouts.get(id);
  if (t) {
    clearTimeout(t);
    timeouts.delete(id);
  }

  state = { toasts: state.toasts.filter((t) => t.id !== id) };
  notify();
}

function dismissToastRecord(id: number) {
  // mark closed (so UI can animate) then remove after short delay
  state = {
    toasts: state.toasts.map((t) => (t.id === id ? { ...t, open: false } : t)),
  };
  notify();
  // remove after animation time (250ms)
  setTimeout(() => {
    const found = state.toasts.find((t) => t.id === id);
    if (found && !found.open) {
      removeToastRecord(id);
      found.onClose?.();
    }
  }, 260);
}

/**
 * Public API that components call
 */
export function useToast() {
  // local React state to re-render consumers
  const [local, setLocal] = React.useState<State>(state);

  React.useEffect(() => {
    // add subscriber
    const listener: Listener = (s) => setLocal(s);
    listeners.push(listener);
    // initialize state for new subscriber
    setLocal(state);

    return () => {
      const idx = listeners.indexOf(listener);
      if (idx > -1) listeners.splice(idx, 1);
    };
  }, []);

  const toast = React.useCallback((opts: ToastOptions) => {
    const record = addToastRecord(opts);

    // auto-dismiss unless duration === 0
    const duration = opts.duration ?? DEFAULT_DURATION;
    if (duration > 0) {
      const t = setTimeout(() => {
        // call dismiss (animated) and then remove
        dismissToastRecord(record.id);
      }, duration);
      timeouts.set(record.id, t);
    }

    return {
      id: record.id,
      // manually dismiss (animated)
      dismiss: () => {
        // ensure we don't double-remove
        if (!state.toasts.find((t) => t.id === record.id)) return;
        dismissToastRecord(record.id);
      },
      // update toast content (title/description/variant/action/duration)
      update: (updateOpts: Partial<ToastOptions>) => {
        // keep open state as-is
        state = {
          toasts: state.toasts.map((t) =>
            t.id === record.id ? { ...t, ...updateOpts, open: t.open } : t
          ),
        };
        // if duration updated, reset timeout
        const newDuration =
          updateOpts.duration ?? opts.duration ?? DEFAULT_DURATION;
        if (timeouts.has(record.id)) {
          clearTimeout(timeouts.get(record.id)!);
          timeouts.delete(record.id);
        }
        if (newDuration > 0) {
          const to = setTimeout(
            () => dismissToastRecord(record.id),
            newDuration
          );
          timeouts.set(record.id, to);
        }
        notify();
      },
    };
  }, []);

  return {
    toasts: local.toasts,
    toast,
  };
}
