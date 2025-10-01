import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowWeWorks from "../components/HowWeWork";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
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
