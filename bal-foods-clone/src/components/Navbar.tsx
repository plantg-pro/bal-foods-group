import { Link, useLocation } from "react-router-dom";
import balLogo from "@/assets/bal-logo.svg";

const Navbar = () => {
  const location = useLocation();

  const goToSection = (sectionId: string) => {
    if (location.pathname === "/") {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link to="/" onClick={handleLogoClick} className="inline-flex items-center">
          <img
            src={balLogo}
            alt="BAL Foods Group"
            className="h-auto w-[88px] md:w-[94px]"
          />
        </Link>

        <nav className="flex items-center gap-6 md:gap-8">
          <button
            type="button"
            onClick={() => goToSection("about")}
            className="text-sm text-foreground transition hover:text-accent"
          >
            About
          </button>

          <button
            type="button"
            onClick={() => goToSection("products")}
            className="text-sm text-foreground transition hover:text-accent"
          >
            Products
          </button>

          <button
            type="button"
            onClick={() => goToSection("capabilities")}
            className="text-sm text-foreground transition hover:text-accent"
          >
            Capabilities
          </button>

          <button
            type="button"
            onClick={() => goToSection("contact")}
            className="text-sm text-foreground transition hover:text-accent"
          >
            Contact
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
