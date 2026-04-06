import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f1c2e] via-[#14253f] to-[#1c3558]">

      {/* GRADIENT BALLS */}
      <div className="absolute w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl top-[-150px] left-[-150px]" />
      <div className="absolute w-[600px] h-[600px] bg-sky-400/10 rounded-full blur-3xl bottom-[-200px] right-[-150px]" />
      <div className="absolute w-[300px] h-[300px] bg-indigo-400/10 rounded-full blur-2xl top-[30%] right-[10%]" />

      {/* CONTENT */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">

        {/* LOGO */}
        <div className="mb-10">
          <h1 className="font-playfair text-5xl md:text-6xl text-white tracking-wide">
            BAL
          </h1>
          <p className="text-sm text-white/70 tracking-wide mt-2">
            Foods Group Pty Ltd
          </p>
        </div>

        {/* SUBTEXT */}
        <p className="text-xs tracking-[0.3em] text-sky-300 uppercase mb-6">
          Premium Australian Meats & Seafood
        </p>

        {/* HEADLINE */}
        <h2 className="font-playfair text-4xl md:text-6xl leading-tight text-white">
          Built for Importers.
          <br />
          <span className="text-sky-300">
            Backed by Australian Supply.
          </span>
        </h2>

        {/* SUPPORT TEXT */}
        <p className="mt-6 text-white/70 italic">
          Export-Ready · Reliable Service · Consistent Quality
        </p>

        {/* BUTTONS */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/catalogue"
            className="px-6 py-3 bg-white text-slate-900 rounded-lg font-medium hover:bg-gray-200 transition"
          >
            View Product Range
          </Link>

          <Link
            to="/contact"
            className="px-6 py-3 border border-white/30 text-white rounded-lg font-medium hover:bg-white/10 transition"
          >
            Enquire Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
