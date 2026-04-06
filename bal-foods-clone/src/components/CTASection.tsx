import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const interestOptions = [
  "Poultry",
  "Beef",
  "Lamb",
  "Pork",
  "Seafood",
  "Smallgoods",
  "Produce",
];

const CTASection = () => {
  const anim = useScrollAnimation();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
  });

  const [interests, setInterests] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleInterest = (value: string) => {
    setInterests((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      name: formData.name,
      company: formData.company,
      email: formData.email,
      interest: interests.join(", "),
      _subject: "New BAL Foods Website Enquiry",
    };

    try {
      const response = await fetch("https://formspree.io/f/xqegwdzb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          company: "",
          email: "",
        });
        setInterests([]);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden section-navy">
      <div
        className="absolute w-[500px] h-[500px] rounded-full top-[-150px] right-[-100px] opacity-40"
        style={{
          background: "radial-gradient(circle, hsl(210 40% 28%), hsl(220 35% 15%) 70%)",
        }}
      />
      <div
        className="absolute w-[350px] h-[350px] rounded-full bottom-[-100px] left-[-80px] opacity-30"
        style={{
          background: "radial-gradient(circle, hsl(225 30% 30%), hsl(220 35% 15%) 70%)",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div
          ref={anim.ref}
          className={`max-w-3xl mx-auto text-center scroll-hidden ${
            anim.isVisible ? "scroll-visible" : ""
          }`}
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight mb-6 text-primary-foreground italic text-center">
            Let BAL Bring Australia to You
          </h2>

          <p className="font-body text-lg text-primary-foreground/60 mb-10 leading-relaxed text-center">
            Whether you're an importer, distributor, or foodservice buyer
            <br />
            — we'd love to hear from you.
          </p>

          <div className="flex justify-center">
            <Button
              type="button"
              variant="hero"
              size="lg"
              onClick={() => setIsFormOpen((prev) => !prev)}
              className="px-10 py-6 text-base bg-primary-foreground text-navy hover:bg-primary-foreground/90"
            >
              {isFormOpen ? "Close Form" : "Get in Touch"}
            </Button>
          </div>

          {isFormOpen && (
            <div className="mt-10 max-w-2xl mx-auto rounded-2xl border border-primary-foreground/10 bg-white/95 p-6 md:p-8 text-left shadow-xl">
              {isSubmitted ? (
                <div className="text-center py-6">
                  <h3 className="font-heading text-2xl text-navy mb-3">Thank you</h3>
                  <p className="font-body text-slate-600 leading-relaxed">
                    Your enquiry has been submitted successfully. We’ll be in touch soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-body font-medium text-navy"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-slate-500"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="company"
                        className="block mb-2 text-sm font-body font-medium text-navy"
                      >
                        Company
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-slate-500"
                        placeholder="Your company"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-body font-medium text-navy"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-slate-500"
                      placeholder="you@company.com"
                    />
                  </div>

                  <div>
                    <p className="block mb-3 text-sm font-body font-medium text-navy">
                      Interest
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {interestOptions.map((option) => {
                        const checked = interests.includes(option);

                        return (
                          <label
                            key={option}
                            className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm cursor-pointer transition-colors ${
                              checked
                                ? "border-navy bg-slate-100 text-navy"
                                : "border-slate-300 bg-white text-slate-700"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleInterest(option)}
                              className="h-4 w-4 accent-slate-700"
                            />
                            <span>{option}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-center pt-2">
                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      disabled={isSubmitting}
                      className="px-10 py-5 text-base bg-navy text-primary-foreground hover:bg-navy/90 disabled:opacity-50"
                    >
                      {isSubmitting ? "Sending..." : "Send Enquiry"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
