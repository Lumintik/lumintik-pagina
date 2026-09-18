import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { BuildingFor } from "@/components/sections/BuildingFor";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { Footer } from "@/components/sections/Footer";
import { MarqueeTape } from "@/components/sections/MarqueeTape";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center bg-[#0a0a0a] min-h-screen">
      <Navbar />
      <main className="relative w-full flex flex-col items-center">
        <div
          className="relative w-full flex justify-center overflow-clip h-[338vh] md:h-[405vh]"
          style={{
            background:
              "linear-gradient(180deg, #000000 0%, #1e3a8a 38%, #ffffff 80%, #ffffff 100%)",
          }}
        >
          <div className="sticky top-0 w-full h-screen flex justify-center overflow-hidden">
            <Hero />
          </div>
        </div>
        <div
          id="content-rise"
          className="relative w-full bg-white z-[2] flex flex-col items-center md:-mt-[14vh] lg:-mt-[20vh] xl:mt-0"
        >
          <BuildingFor />
          <ServicesSection />
          <ProjectsShowcase />
          <MarqueeTape />
          <ContactSection />
        </div>
      </main>
      <div
        id="footer-wrap"
        className="relative w-full flex justify-center overflow-clip -mt-[100vh] md:-mt-[90vh] lg:-mt-[96vh] xl:-mt-[100vh] h-[200vh] md:h-[185vh] lg:h-[195vh] xl:h-[200vh]"
        style={{
          background:
            "linear-gradient(180deg, #ffffff 0%, #93c5fd 12%, #3b82f6 26%, #1e3a8a 42%, #0f172a 65%, #0a0a0a 100%)",
        }}
      >
        <div className="sticky top-0 w-full h-screen flex flex-col items-stretch overflow-hidden">
          <Footer />
        </div>
      </div>
    </div>
  );
}
