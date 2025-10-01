import Navbar from "../components/Navbar";
import SEO from "../components/SEO";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowWeWorks from "../components/HowWeWork";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <SEO canonical="https://sh0rtly.ink/" />
      <Navbar />
      <Hero />
      <div id="how">
        <HowWeWorks />
      </div>
      <Features />
      <Footer />
    </div>
  );
};
export default LandingPage;
