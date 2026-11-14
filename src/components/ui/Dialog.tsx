import { useEffect, useRef, type ReactNode } from "react";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  /** Accessible name for the dialog. */
  label: string;
  children: ReactNode;
  className?: string;
  /** Classes for the close button, e.g. to suit a dark dialog. */
  closeClassName?: string;
}

/**
 * Modal built on native <dialog>: Escape, the close button and a backdrop
 * click all close it, and focus returns to whatever opened it.
 */
export const Dialog = ({
  open,
  onClose,
  label,
  children,
  className = "",
  closeClassName = "bg-paper text-ink",
}: DialogProps) => {
  const ref = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      opener.current = document.activeElement as HTMLElement | null;
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = ref.current;
    return () => {
      if (dialog?.open) dialog.close();
      opener.current?.focus();
    };
  }, []);

  const handleClose = () => {
    onCloseRef.current();
    const el = opener.current;
    opener.current = null;
    if (el && document.contains(el)) el.focus();
  };

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={handleClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) ref.current?.close();
      }}
      className={`m-auto max-h-[90vh] max-w-[min(56rem,calc(100vw-2rem))] p-0 backdrop:bg-ink/80 ${className}`}
    >
      {open && (
        <div className="relative">
          <button
            type="button"
            aria-label="Close"
            onClick={() => ref.current?.close()}
            className={`absolute right-2 top-2 z-10 grid h-11 w-11 cursor-pointer place-items-center border-2 border-current ${closeClassName}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          {children}
        </div>
      )}
    </dialog>
  );
};
