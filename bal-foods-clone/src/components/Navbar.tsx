import { Link, useLocation } from "react-router-dom";
import balLogo from "@/assets/bal-logo.svg";

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={balLogo} alt="BAL Foods Group" className="h-10" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/about"
            className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors tracking-wide"
          >
            About
          </Link>

          {isHome ? (
            <>
              <a
                href="#products"
                className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors tracking-wide"
              >
                Products
              </a>
              <a
                href="#capability"
                className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors tracking-wide"
              >
                Capability
              </a>
              <a
                href="#contact"
                className="text-sm font-body text-primary font-medium hover:text-primary/80 transition-colors tracking-wide"
              >
                Contact
              </a>
            </>
          ) : (
            <>
              <Link
                to="/#products"
                className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors tracking-wide"
              >
                Products
              </Link>
              <Link
                to="/#capability"
                className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors tracking-wide"
              >
                Capability
              </Link>
              <Link
                to="/#contact"
                className="text-sm font-body text-primary font-medium hover:text-primary/80 transition-colors tracking-wide"
              >
                Contact
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
