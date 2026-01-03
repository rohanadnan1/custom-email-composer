import Hero from "./components/sections/Hero";
import Services from "./components/sections/Services";
import Portfolio from "./components/sections/Portfolio";
import About from "./components/sections/About";
import Testimonials from "./components/sections/Testimonials";
import Contact from "./components/sections/Contact";
import Footer from "./components/Footer";
import Pricing from "./components/sections/Pricing";
import Performance from "./components/sections/Performance";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Portfolio />
      {/* <About /> */}
      {/* <Testimonials /> */}
      <About />
      <Performance />
      <Pricing />
      <Contact />
      <Footer />
    </>
  );
}
