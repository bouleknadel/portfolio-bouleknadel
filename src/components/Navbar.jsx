import { useEffect, useState } from "react";
import { useLang } from "../LanguageContext";
import { LANGS, routes } from "../data";
import CvMenu from "./CvMenu";
import ProfilePhoto from "./ProfilePhoto";

function LanguageSwitch() {
  const { lang, setLang, t } = useLang();
  return (
    <div
      role="group"
      aria-label={t.nav.langLabel}
      className="flex items-center rounded-full border border-white/10 bg-white/[0.03] p-1"
    >
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`cursor-pointer rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider transition-colors ${
            lang === l
              ? "bg-white/15 text-white"
              : "text-slate-500 hover:text-slate-200"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export default function Navbar({ isHome = true }) {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLang();
  // On secondary pages, section anchors point back to the home page.
  const toHome = (hash) => (isHome ? hash : `${routes.home}${hash}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#05070f]/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="flex w-full items-center justify-between gap-4 px-6 py-5 md:px-12 lg:px-20">
        <a
          href={toHome("#home")}
          aria-label={isHome ? undefined : t.nav.backHome}
          className="flex items-center gap-3 no-underline"
        >
          <ProfilePhoto
            size="h-10 w-10"
            alt={`${t.profile.firstName} ${t.profile.lastName}`}
            className="shadow-[0_0_18px_rgba(99,102,241,0.35)]"
          />
          <span className="hidden text-sm font-bold tracking-wide text-white sm:block lg:hidden xl:block">
            {t.profile.lastName}
          </span>
        </a>

        <div className="hidden items-center gap-6 lg:flex xl:gap-9">
          {t.navLinks.map((link) => (
            <a
              key={link.href}
              href={toHome(link.href)}
              className="whitespace-nowrap text-[13px] font-semibold uppercase tracking-wider text-slate-400 no-underline transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitch />
          {/* No room next to the section links below 1400px (FR labels); the CV is also in Contact. */}
          <div className="hidden md:max-lg:block min-[1400px]:block">
            <CvMenu variant="nav" align="right" />
          </div>
          <a
            href={toHome("#contact")}
            className="whitespace-nowrap rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 px-5 py-2.5 text-[13px] font-bold text-white no-underline transition-transform hover:scale-105"
          >
            {t.nav.cta}
          </a>
        </div>
      </div>
    </nav>
  );
}
