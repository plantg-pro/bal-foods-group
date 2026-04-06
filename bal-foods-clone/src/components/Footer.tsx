const Footer = () => {
  return (
    <footer className="section-navy border-t border-primary-foreground/10 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          
          {/* LEFT SIDE */}
          <div className="space-y-4">
            
            {/* Company Name */}
            <p className="font-heading text-sm md:text-base font-semibold text-primary-foreground">
              BAL Foods Group Pty Ltd
            </p>

            {/* Contact Block (tighter spacing) */}
            <div className="space-y-1">
              <p className="font-body text-xs md:text-sm text-primary-foreground/60">
                5 Progress Circuit, Prestons NSW, 2170 Australia
              </p>

              <p className="font-body text-xs md:text-sm text-primary-foreground/60">
                Telephone: +61 401 104 940
              </p>

              <a
                href="mailto:info@balfoodsgroup.com"
                className="block font-body text-xs md:text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              >
                Email: info@balfoodsgroup.com
              </a>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="md:text-right">
            <p className="font-body text-[11px] text-primary-foreground/40">
              © {new Date().getFullYear()} BAL Foods Group. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
