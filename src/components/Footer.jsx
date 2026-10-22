import { useLang } from "../LanguageContext";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="w-full border-t border-white/5 px-6 py-8 text-center text-xs font-semibold text-slate-600 md:px-12 lg:px-20">
      © {new Date().getFullYear()} {t.profile.firstName} {t.profile.lastName} —{" "}
      {t.footer.builtWith}
    </footer>
  );
}
