import { useEffect, useId, useRef, useState } from "react";
import { useLang } from "../LanguageContext";

// "Download CV" button opening a small menu with the two CV variants.
// `variant="nav"` is the compact navbar style, default is the large section button.
export default function CvMenu({ variant = "default", align = "left" }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const buttonClass =
    variant === "nav"
      ? "whitespace-nowrap rounded-full border border-white/15 px-4 py-2.5 text-[13px] font-bold text-white transition-colors hover:border-indigo-400 hover:bg-white/5"
      : "rounded-full border border-white/15 px-8 py-4 text-sm font-bold text-white transition-colors hover:border-indigo-400 hover:bg-white/5";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        className={`flex cursor-pointer items-center gap-2 ${buttonClass}`}
      >
        {t.cv.button}
        <svg
          aria-hidden="true"
          viewBox="0 0 12 12"
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div
          id={menuId}
          className={`absolute z-50 mt-2 w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f1f]/95 p-1.5 text-left shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md ${
            { left: "left-0", right: "right-0", center: "left-1/2 -translate-x-1/2" }[align]
          }`}
        >
          {t.cvs.map((cv) => (
            <a
              key={cv.key}
              href={cv.href}
              download
              onClick={() => setOpen(false)}
              className="flex items-center justify-between gap-3 rounded-xl px-4 py-3 no-underline transition-colors hover:bg-white/[0.06]"
            >
              <span className="text-sm font-semibold text-white">{cv.label}</span>
              <span className="whitespace-nowrap text-[11px] font-semibold text-slate-500">{t.cv.hint}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
