import Layout from "./components/Layout";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import AiApproach from "./components/AiApproach";
import Skills from "./components/Skills";
import Contact from "./components/Contact";

export default function App() {
  return (
    <Layout isHome>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <AiApproach />
      <Skills />
      <Contact />
    </Layout>
  );
}
