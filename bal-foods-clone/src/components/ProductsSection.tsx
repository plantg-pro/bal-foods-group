import poultryImg from "@/assets/poultry.jpg";
import seafoodImg from "@/assets/seafood.png";
import produceImg from "@/assets/produce.jpg";
import smallgoodsImg from "@/assets/smallgoods.png";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const products = [
  {
    name: "Meats & Poultry",
    description: "Premium beef, lamb, pork, and poultry programs for export markets",
    image: poultryImg,
    imageClassName: "object-cover object-center",
    imageStyle: {},
  },
  {
    name: "Seafood",
    description: "Wild-caught and farmed seafood, sourced with quality and handling integrity",
    image: seafoodImg,
    imageClassName: "object-cover object-center",
    imageStyle: {},
  },
  {
    name: "Produce",
    description: "Fresh produce, herbs, spices, and specialty lines tailored to your market",
    image: produceImg,
    imageClassName: "object-cover",
    imageStyle: { objectPosition: "center 78%" },
  },
  {
    name: "Halal Smallgoods",
    description: "Certified halal smallgoods and retail-ready formats for global distribution",
    image: smallgoodsImg,
    imageClassName: "object-cover object-center",
    imageStyle: {},
  },
];

const ProductsSection = () => {
  const headerAnim = useScrollAnimation();
  const gridAnim = useScrollAnimation(0.1);

  return (
    <section id="products" className="py-24 md:py-32 bg-[#eef2f5] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div
          ref={headerAnim.ref}
          className={`text-center mb-16 scroll-hidden ${headerAnim.isVisible ? "scroll-visible" : ""}`}
        >
          <p className="font-body text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Product Range
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Curated Supply Across Key Categories
          </h2>
        </div>

        <div
          ref={gridAnim.ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.map((product, i) => (
            <div
              key={product.name}
              className={`group relative rounded-2xl overflow-hidden bg-[#d9e0e6] border border-[#c8d0d8] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 scroll-hidden ${gridAnim.isVisible ? "scroll-visible" : ""}`}
              style={{ transitionDelay: gridAnim.isVisible ? `${i * 120}ms` : "0ms" }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${product.imageClassName}`}
                  style={product.imageStyle}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>

              <div className="p-6 flex flex-col min-h-[190px]">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                  {product.name}
                </h3>

                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>

                <span className="mt-auto pt-4 font-body text-sm font-medium text-accent group-hover:text-teal transition-colors cursor-pointer">
                  Explore Range →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
