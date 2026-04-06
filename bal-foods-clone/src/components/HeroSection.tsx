import { Link } from "react-router-dom";
import balLogoAlt from "@/assets/bal-logo-alt.svg";

const HeroSection = () => {
  const enquiryUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLSdUOFFWqiqtQhZlJVuMqeXWAoyxTPRZ_pD2-hYnqsKc8tTQag/viewform?usp=dialog";

  return (
    <section className="relative min-h-screen overflow-hidden section-navy">
      <div className="pointer-events-none absolute inset-0">
        <div className="circle-accent-navy w-[520px] h-[520px] -top-32 -left-32 opacity-70" />
        <div className="circle-accent-navy w-[600px] h-[600px] bottom-[-200px] right-[-180px] opacity-60" />
        <div className="circle-accent w-[300px] h-[300px] top-[25%] right-[15%] opacity-50" />
        <div className="absolute -top-10 left-16 w-[240px] h-[240px] rounded-full border border-white/10 bg-white/5 blur-xl" />
        <div className="absolute bottom-20 right-28 w-[260px] h-[260px] rounded-full border border-white/10 bg-white/5 blur-xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 text-center">
        <div>
          <div className="mb-10 flex justify-center">
            <img
              src={balLogoAlt}
              alt="BAL Foods Group"
              className="h-auto w-[150px] md:w-[165px]"
            />
          </div>

          <p className="mb-8 text-[11px] md:text-xs uppercase tracking-[0.35em] text-[#6fb0df]">
            PREMIUM AUSTRALIAN MEATS & SEAFOOD
          </p>

          <h2 className="font-playfair text-[42px] md:text-[72px] leading-[1.05] text-white">
            Built for Importers.
            <br />
            <span className="block text-[#8eb7d8]">
              Backed by Australian Supply.
            </span>
          </h2>

          <p className="mt-7 text-sm md:text-base italic text-white/75">
            Export-Ready · Reliable Service · Consistent Quality
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/catalogue"
              className="px-7 py-3.5 bg-white text-slate-900 rounded-xl font-medium hover:bg-gray-200 transition"
            >
              View Product Range
            </Link>

            <a
              href={enquiryUrl}
              target="_blank"
              rel="noreferrer"
              className="px-7 py-3.5 border border-white/30 rounded-xl font-medium text-white hover:bg-white/10 transition"
            >
              Enquire Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
