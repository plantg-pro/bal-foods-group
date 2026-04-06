import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import coverImg from "@/assets/cover.jpg";
import ausFieldsImg from "@/assets/aus-fields.jpg";
import chickenFarmImg from "@/assets/chicken-farm.png";

const sectionIds = ["company", "australia", "focus"] as const;
type SectionId = (typeof sectionIds)[number];

const AboutPage = () => {
  const [activeSection, setActiveSection] = useState<SectionId>("company");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          threshold: 0.45,
          rootMargin: "-10% 0px -10% 0px",
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f8fb] text-slate-900">
      <Navbar />

      <main className="pt-16">
        <section className="relative overflow-hidden bg-[#eef2f8]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(142,166,201,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(142,166,201,0.12),transparent_28%)]" />

          <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
            <div className="max-w-4xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.28em] text-slate-500">
                BAL FOODS GROUP PTY LTD
              </p>

              <h1 className="font-playfair text-4xl leading-tight text-slate-950 md:text-6xl">
                A premium Australian sourcing and export partner for global
                food markets.
              </h1>
            </div>
          </div>
        </section>

        <section className="relative">
          <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-hidden">
            <img
              src={coverImg}
              alt="Australian sourcing and export"
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${
                activeSection === "company"
                  ? "scale-100 opacity-100"
                  : "scale-105 opacity-0"
              }`}
            />
            <img
              src={chickenFarmImg}
              alt="Australian poultry supply"
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${
                activeSection === "australia"
                  ? "scale-100 opacity-100"
                  : "scale-105 opacity-0"
              }`}
            />
            <img
              src={ausFieldsImg}
              alt="Australian agricultural fields"
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${
                activeSection === "focus"
                  ? "scale-100 opacity-100"
                  : "scale-105 opacity-0"
              }`}
            />

            <div className="absolute inset-0 bg-slate-950/45" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-transparent to-slate-950/20" />
          </div>

          <div className="relative -mt-[calc(100vh-4rem)]">
            <section
              id="company"
              className="flex min-h-[88vh] items-center px-6 py-16 md:px-10 md:py-20"
            >
              <div className="mx-auto w-full max-w-7xl">
                <div className="max-w-xl rounded-[2rem] border border-white/20 bg-white/18 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.18)] backdrop-blur-md md:p-12">
                  <p className="mb-3 text-sm font-medium uppercase tracking-[0.28em] text-white/70">
                    Our Company
                  </p>

                  <h2 className="font-playfair text-3xl leading-tight text-white md:text-5xl">
                    Built to represent Australian supply with clarity and
                    confidence.
                  </h2>

                  <p className="mt-6 text-lg leading-8 text-white/90">
                    BAL Foods Group connects trusted Australian supply with
                    international demand across meat, seafood, produce and halal
                    smallgoods.
                  </p>
                </div>
              </div>
            </section>

            <section
              id="australia"
              className="flex min-h-[88vh] items-center px-6 py-16 md:px-10 md:py-20"
            >
              <div className="mx-auto w-full max-w-7xl">
                <div className="max-w-xl rounded-[2rem] border border-white/20 bg-white/18 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.18)] backdrop-blur-md md:p-12">
                  <p className="mb-3 text-sm font-medium uppercase tracking-[0.28em] text-white/70">
                    Why Australia
                  </p>

                  <h2 className="font-playfair text-3xl leading-tight text-white md:text-5xl">
                    Trusted standards, strong biosecurity and dependable supply.
                  </h2>

                  <p className="mt-6 text-lg leading-8 text-white/90">
                    Australia is recognised for strict food safety, strong
                    biosecurity and consistent product quality.
                  </p>

                  <p className="mt-5 text-lg leading-8 text-white/90">
                    Through trusted supply channels and export-accredited
                    partners, we bring these standards to market in a way that
                    supports long-term customer confidence.
                  </p>
                </div>
              </div>
            </section>

            <section
              id="focus"
              className="flex min-h-[88vh] items-center px-6 py-16 text-center md:px-10 md:py-20"
            >
              <div className="mx-auto w-full max-w-3xl">
                <div className="rounded-[2rem] border border-white/20 bg-white/20 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.18)] backdrop-blur-md md:p-14">
                  <p className="mb-3 text-sm font-medium uppercase tracking-[0.28em] text-white/70">
                    Our Focus
                  </p>

                  <h2 className="font-playfair text-3xl leading-tight text-white md:text-5xl">
                    Consistency. Simplicity. Reliability.
                  </h2>

                  <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/90">
                    We keep our approach clear and commercially practical —
                    helping international buyers access dependable Australian
                    supply through a sourcing partner that values presentation,
                    responsiveness and continuity.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
