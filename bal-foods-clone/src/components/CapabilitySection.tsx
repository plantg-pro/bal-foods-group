import warehouseImg from "@/assets/warehouse.png";
import foodPrepImg from "@/assets/food-prep.jpg";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const capabilities = [
  {
    title: "Export-Ready Supply",
    description: "Product sourced and packed to international import specifications",
  },
  {
    title: "Flexible Specifications",
    description: "Custom cuts, grades, and packaging tailored to your market",
  },
  {
    title: "Reliable Cold Chain",
    description: "Temperature-controlled logistics from processing to port",
  },
  {
    title: "Scalable Volumes",
    description: "Consistent supply capacity to meet growing demand",
  },
];

const CapabilitySection = () => {
  const headerAnim = useScrollAnimation();
  const imagesAnim = useScrollAnimation();
  const gridAnim = useScrollAnimation(0.1);

  return (
    <section id="capability" className="py-24 md:py-32 relative overflow-hidden">
      <div className="circle-accent w-[350px] h-[350px] right-0 -bottom-20 opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        <div
          ref={headerAnim.ref}
          className={`max-w-3xl mx-auto text-center mb-16 scroll-hidden ${
            headerAnim.isVisible ? "scroll-visible" : ""
          }`}
        >
          <p className="font-body text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Supply Capability
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Built for Scale & Reliability
          </h2>
        </div>

        <div
          ref={imagesAnim.ref}
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-5xl mx-auto scroll-hidden ${
            imagesAnim.isVisible ? "scroll-visible" : ""
          }`}
        >
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9]">
            <img
              src={warehouseImg}
              alt="Large-scale cold storage warehouse facility"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
          </div>

          <div className="relative rounded-2xl overflow-hidden aspect-[16/9]">
            <img
              src={foodPrepImg}
              alt="Food preparation and packaging at scale"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
          </div>
        </div>

        <div
          ref={gridAnim.ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {capabilities.map((cap, i) => (
            <div
              key={cap.title}
              className={`flex items-start gap-5 p-6 rounded-2xl bg-card border border-border/50 hover:border-border transition-all duration-300 scroll-hidden ${
                gridAnim.isVisible ? "scroll-visible" : ""
              }`}
              style={{ transitionDelay: gridAnim.isVisible ? `${i * 100}ms` : "0ms" }}
            >
              <div className="w-10 h-10 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center mt-0.5">
                <span className="font-heading text-sm font-bold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div>
                <h3 className="font-heading text-base font-semibold text-foreground mb-1">
                  {cap.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {cap.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilitySection;
