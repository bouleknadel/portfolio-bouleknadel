import Layout from "../components/Layout";
import ProjectCaseStudy, { ProjectLink, StackList } from "../components/ProjectCaseStudy";
import PageHeader from "./PageHeader";
import { useLang } from "../LanguageContext";

// Columns: year | project | context (md+) | stack (lg+) | link (sm+)
const ROW =
  "grid grid-cols-[64px_1fr_20px] items-center gap-4 sm:grid-cols-[64px_1fr_110px_20px] md:grid-cols-[64px_1.1fr_1fr_110px_20px] lg:grid-cols-[64px_1fr_1fr_1.3fr_110px_20px]";

function ArchiveContent() {
  const { t } = useLang();
  const { archive, projects } = t;
  const cols = archive.columns;

  return (
    <section className="w-full px-6 pb-28 pt-36 md:px-12 lg:px-20">
      <PageHeader
        eyebrow={archive.eyebrow}
        title={archive.title}
        intro={archive.intro}
        docTitle={archive.docTitle}
      />

      <div className={`${ROW} border-b border-white/10 pb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500`}>
        <span>{cols.year}</span>
        <span>{cols.project}</span>
        <span className="hidden md:block">{cols.context}</span>
        <span className="hidden lg:block">{cols.stack}</span>
        <span className="hidden sm:block">{cols.link}</span>
        <span />
      </div>

      <ul>
        {projects.map((p) => (
          <li key={p.key} id={p.key} className="border-b border-white/5">
            <details className="group">
              <summary className={`${ROW} cursor-pointer list-none py-5 transition-colors hover:bg-white/[0.02] [&::-webkit-details-marker]:hidden`}>
                <span className="text-sm font-semibold text-slate-500">{p.year ?? "—"}</span>
                <span className="min-w-0">
                  <span className="block text-base font-bold text-white group-open:text-indigo-300">
                    {p.title}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wide text-indigo-300/80">
                    {p.tag}
                  </span>
                </span>
                <span className="hidden text-sm text-slate-400 md:block">{p.context}</span>
                <span className="hidden text-xs text-slate-500 lg:block">{p.stack.join(" · ")}</span>
                <span className="hidden sm:block">
                  <ProjectLink project={p} />
                </span>
                <span
                  aria-hidden="true"
                  className="text-lg text-slate-500 transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>

              <div className="grid gap-8 pb-10 pt-2 md:grid-cols-[64px_1fr] md:gap-4">
                <span className="hidden md:block" />
                <div className="max-w-3xl space-y-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <div className="text-xs font-semibold text-slate-500 md:hidden">{p.context}</div>
                  <ProjectCaseStudy project={p} />
                  <div className="flex flex-wrap items-end justify-between gap-4 border-t border-white/5 pt-5">
                    <StackList stack={p.stack} />
                    <ProjectLink project={p} />
                  </div>
                </div>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function ProjectArchive() {
  return (
    <Layout>
      <ArchiveContent />
    </Layout>
  );
}
