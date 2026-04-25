"use client";

import { type ReactNode, useEffect } from "react";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export const Dialog = ({ open, onClose, title, children }: DialogProps) => {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        aria-hidden
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        className="relative z-10 mx-4 w-full max-w-md rounded border border-[var(--card-border)] bg-[var(--card-bg)] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.06)]"
      >
        <p
          id="dialog-title"
          className="font-azeret text-[11px] uppercase tracking-[0.1em] text-[var(--font-primary)] mb-5"
        >
          {title}
        </p>
        {children}
      </div>
    </div>
  );
};
