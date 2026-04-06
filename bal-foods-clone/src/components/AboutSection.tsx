import coastlineImg from "@/assets/coastline.png";
import chefImg from "@/assets/chef-plating.jpg";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const AboutSection = () => {
  const headerAnim = useScrollAnimation();
  const imageAnim = useScrollAnimation();
  const pillarsAnim = useScrollAnimation();
  const chefAnim = useScrollAnimation();

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      <div className="circle-accent w-[300px] h-[300px] -right-20 top-10 opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div
            ref={headerAnim.ref}
            className={`scroll-hidden-left ${headerAnim.isVisible ? "scroll-visible-x" : ""}`}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 tracking-tight">
              Curating Australia's Finest for International Markets
            </h2>

            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
              BAL Foods Group is an Australian sourcing and export partner supplying premium products to international markets.
            </p>

            <p className="font-body text-muted-foreground leading-relaxed">
              We work with a curated network of trusted producers to deliver consistent, export-ready supply across protein and value-added categories.
            </p>
          </div>

          <div
            ref={imageAnim.ref}
            className={`relative rounded-2xl overflow-hidden aspect-[4/3] scroll-hidden-right ${imageAnim.isVisible ? "scroll-visible-x" : ""}`}
          >
            <img
              src={coastlineImg}
              alt="Australian coastline — BAL Foods Group headquarters region"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/15 to-transparent" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            ref={chefAnim.ref}
            className={`relative rounded-2xl overflow-hidden aspect-[4/3] order-2 lg:order-1 scroll-hidden-left ${chefAnim.isVisible ? "scroll-visible-x" : ""}`}
          >
            <img
              src={chefImg}
              alt="Chef plating premium dishes with Australian proteins"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/15 to-transparent" />
          </div>

          <div
            ref={pillarsAnim.ref}
            className={`order-1 lg:order-2 space-y-8 scroll-hidden-right ${pillarsAnim.isVisible ? "scroll-visible-x" : ""}`}
          >
            {[
              {
                label: "Multi-Protein Sourcing",
                desc: "Beef, lamb, poultry, and seafood from trusted suppliers",
              },
              {
                label: "Export Capability",
                desc: "Servicing importers and distributors across Asia-Pacific",
              },
              {
                label: "Reliable Supply Chains",
                desc: "End-to-end cold chain management and quality assurance",
              },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-semibold text-foreground mb-1">
                    {item.label}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
