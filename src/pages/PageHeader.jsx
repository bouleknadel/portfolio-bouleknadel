import { useEffect } from "react";
import { useLang } from "../LanguageContext";
import { routes } from "../data";

// Title block shared by the secondary pages (archive, certifications).
export default function PageHeader({ eyebrow, title, intro, docTitle }) {
  const { t } = useLang();

  useEffect(() => {
    document.title = docTitle;
  }, [docTitle]);

  return (
    <header className="mb-14">
      <a
        href={routes.home}
        className="mb-10 inline-flex items-center gap-2 text-sm font-bold text-indigo-300 no-underline hover:text-indigo-200"
      >
        ← {t.nav.backHome}
      </a>
      <div className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
        {eyebrow}
      </div>
      <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-white md:text-6xl">
        {title[0]}
        <br />
        {title[1]}
      </h1>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400">{intro}</p>
    </header>
  );
}
