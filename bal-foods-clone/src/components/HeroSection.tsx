const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f1c2e] via-[#16253d] to-[#1e3556] text-white overflow-hidden">
      
      {/* Background glow shapes */}
      <div className="absolute bottom-[-120px] right-[-120px] w-[500px] h-[500px] bg-[#6fa3c8]/20 rounded-full blur-3xl" />
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-[#6fa3c8]/10 rounded-full blur-3xl" />

      <div className="relative z-10 text-center px-6 max-w-4xl">
        
        {/* Logo */}
        <div className="mb-10">
          <h1 className="font-playfair text-5xl md:text-6xl tracking-wide">
            BAL
          </h1>
          <p className="text-sm mt-2 tracking-wide text-white/70">
            Foods Group Pty Ltd
          </p>
        </div>

        {/* Subheading */}
        <p className="text-xs tracking-[0.35em] text-[#7fb3d5] mb-6 uppercase">
          Premium Australian Meats & Seafood
        </p>

        {/* Main Heading */}
        <h2 className="font-playfair text-4xl md:text-6xl leading-tight">
          Built for Importers.
          <br />
          <span className="text-[#7fb3d5]">
            Backed by Australian Supply.
          </span>
        </h2>

        {/* Supporting Line */}
        <p className="mt-6 text-sm md:text-base italic text-white/70">
          Export-Ready · Reliable Service · Consistent Quality
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-6 py-3 bg-white text-slate-900 rounded-lg font-medium hover:bg-gray-200 transition">
            View Product Range
          </button>

          <button className="px-6 py-3 border border-white/40 rounded-lg font-medium hover:bg-white/10 transition">
            Enquire Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
