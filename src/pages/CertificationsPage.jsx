import Layout from "../components/Layout";
import PageHeader from "./PageHeader";
import { useLang } from "../LanguageContext";
import { formatMonth, issuers } from "../data";
import BrandMark from "../components/BrandMark";

// Columns: date | name (+ issuer on mobile) | issuer (md+) | verify link
const ROW =
  "grid grid-cols-[76px_1fr] items-center gap-x-4 gap-y-2 sm:grid-cols-[84px_1fr_auto] md:grid-cols-[96px_1fr_200px_150px]";

function CertificationsContent() {
  const { t, lang } = useLang();
  const { certificationsPage: page, certifications } = t;
  const cols = page.columns;

  return (
    <section className="w-full px-6 pb-28 pt-36 md:px-12 lg:px-20">
      <PageHeader
        eyebrow={page.eyebrow}
        title={page.title}
        intro={page.intro}
        docTitle={page.docTitle}
      />

      <div className={`${ROW} border-b border-white/10 pb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500`}>
        <span>{cols.date}</span>
        <span>{cols.name}</span>
        <span className="hidden md:block">{cols.issuer}</span>
        <span className="hidden sm:block" />
      </div>

      <ul>
        {certifications.map((c) => (
          <li key={c.name} className={`${ROW} border-b border-white/5 py-5`}>
            <span className="text-sm font-semibold text-slate-500">{formatMonth(c.date, lang)}</span>
            <span className="flex min-w-0 items-start gap-3">
              <BrandMark {...issuers[c.issuer]} size={30} title={c.issuer} />
              <span className="min-w-0">
                <span className="text-sm font-bold text-white md:text-base">{c.name}</span>
                {c.featured && (
                  <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-cyan-400 align-middle" aria-hidden="true" />
                )}
                <span className="mt-1 block text-xs font-semibold text-slate-500 md:hidden">{c.issuer}</span>
                {c.expires && (
                  <span className="mt-1 block text-xs text-slate-600">
                    {page.expires} {formatMonth(c.expires, lang)}
                  </span>
                )}
                {c.description && (
                  <span className="mt-1.5 block max-w-2xl text-xs leading-relaxed text-slate-400">{c.description}</span>
                )}
              </span>
            </span>
            <span className="hidden text-sm text-slate-400 md:block">{c.issuer}</span>
            <span className="col-start-2 sm:col-start-auto">
              {c.url ? (
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${page.verify} — ${c.name}`}
                  className="whitespace-nowrap text-xs font-bold text-indigo-300 no-underline transition-colors hover:text-indigo-200"
                >
                  {page.verify} ↗
                </a>
              ) : (
                <span className="whitespace-nowrap text-xs font-semibold text-slate-600">{page.noLink}</span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function CertificationsPage() {
  return (
    <Layout>
      <CertificationsContent />
    </Layout>
  );
}
