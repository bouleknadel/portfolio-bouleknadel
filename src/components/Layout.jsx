import Navbar from "./Navbar";
import Footer from "./Footer";
import { LanguageProvider } from "../LanguageContext";

// Shared shell for every page (home, project archive, certifications).
export default function Layout({ isHome = false, children }) {
  return (
    <LanguageProvider>
      <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-[#05070f] text-slate-200">
        <Navbar isHome={isHome} />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
