import { useEffect, useRef, useState, useCallback, forwardRef } from "react";
import HTMLFlipBook from "react-pageflip";
import * as pdfjsLib from "pdfjs-dist";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

const PDF_PATH = "/catalogue/BAL_Marketing_Booklet_double.pdf";

interface PageProps {
  src: string;
  pageNumber: number;
}

const Page = forwardRef<HTMLDivElement, PageProps>(({ src, pageNumber }, ref) => (
  <div ref={ref} className="page-content bg-transparent" data-page={pageNumber}>
    <img
      src={src}
      alt={`Page ${pageNumber}`}
      className="w-full h-full object-contain select-none"
      draggable={false}
    />
  </div>
));
Page.displayName = "Page";

const Catalogue = () => {
  const [pages, setPages] = useState<string[]>([]);
  const [mobilePages, setMobilePages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [bookReady, setBookReady] = useState(false);

  const bookRef = useRef<any>(null);
  const navigate = useNavigate();

  const renderPDF = useCallback(async () => {
    setLoading(true);
    setBookReady(false);

    try {
      const pdf = await pdfjsLib.getDocument(PDF_PATH).promise;
      setTotalPages(pdf.numPages);

      const renderedDesktop: string[] = [];
      const renderedMobile: string[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);

        // Good resolution without being too heavy
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);

        const ctx = canvas.getContext("2d");
        if (!ctx) continue;

        await page.render({
          canvasContext: ctx,
          viewport,
        }).promise;

        const desktopImage = canvas.toDataURL("image/jpeg", 0.9);
        renderedDesktop.push(desktopImage);

        // Mobile fallback:
        // Split each spread into left and right halves so each half is readable on phone.
        const halfWidth = Math.floor(canvas.width / 2);
        const fullHeight = canvas.height;

        const leftCanvas = document.createElement("canvas");
        leftCanvas.width = halfWidth;
        leftCanvas.height = fullHeight;
        const leftCtx = leftCanvas.getContext("2d");

        if (leftCtx) {
          leftCtx.drawImage(
            canvas,
            0,
            0,
            halfWidth,
            fullHeight,
            0,
            0,
            halfWidth,
            fullHeight
          );
          renderedMobile.push(leftCanvas.toDataURL("image/jpeg", 0.9));
        }

        const rightWidth = canvas.width - halfWidth;
        const rightCanvas = document.createElement("canvas");
        rightCanvas.width = rightWidth;
        rightCanvas.height = fullHeight;
        const rightCtx = rightCanvas.getContext("2d");

        if (rightCtx) {
          rightCtx.drawImage(
            canvas,
            halfWidth,
            0,
            rightWidth,
            fullHeight,
            0,
            0,
            rightWidth,
            fullHeight
          );
          renderedMobile.push(rightCanvas.toDataURL("image/jpeg", 0.9));
        }
      }

      setPages(renderedDesktop);
      setMobilePages(renderedMobile);
    } catch (error) {
      console.error("Error loading PDF:", error);
      setPages([]);
      setMobilePages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    renderPDF();
  }, [renderPDF]);

  const flipPrev = () => {
    bookRef.current?.pageFlip()?.flipPrev();
  };

  const flipNext = () => {
    bookRef.current?.pageFlip()?.flipNext();
  };

  const onFlip = (e: any) => {
    setCurrentPage(e.data ?? 0);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") flipPrev();
      if (e.key === "ArrowRight") flipNext();
      if (e.key === "Escape") navigate("/");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-navy flex items-center justify-center">
        <div className="text-center px-6">
          <div className="w-14 h-14 border-4 border-sky/30 border-t-sky rounded-full animate-spin mx-auto mb-5" />
          <p className="font-heading text-base sm:text-lg text-primary-foreground/70">
            Loading catalogue…
          </p>
        </div>
      </div>
    );
  }

  if (pages.length === 0) {
    return (
      <div className="fixed inset-0 z-50 bg-navy flex items-center justify-center">
        <div className="text-center px-6">
          <p className="font-heading text-base sm:text-lg text-primary-foreground/70 mb-4">
            Unable to load catalogue.
          </p>
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="text-primary-foreground border-primary-foreground/30"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ backgroundColor: "hsl(220, 35%, 12%)" }}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/5">
        <h2 className="font-heading text-sm sm:text-lg text-primary-foreground font-semibold tracking-tight pr-4">
          BAL Foods Group — Product Catalogue
        </h2>

        <Button
          onClick={() => navigate("/")}
          variant="ghost"
          size="icon"
          className="shrink-0 text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10"
          aria-label="Close catalogue"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Mobile */}
      <div className="flex-1 overflow-y-auto md:hidden px-3 py-3">
        <div className="max-w-[560px] mx-auto">
          <p className="font-body text-xs text-primary-foreground/45 mb-3 px-1">
            Scroll to view the full catalogue.
          </p>

          <div className="space-y-3">
            {mobilePages.map((src, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden bg-black/20 ring-1 ring-white/5 shadow-sm"
              >
                <img
                  src={src}
                  alt={`Page ${i + 1}`}
                  className="w-full h-auto block"
                  loading="lazy"
                  draggable={false}
                />
                <div className="px-3 py-2 text-xs text-primary-foreground/50 border-t border-white/5">
                  Page {i + 1} / {mobilePages.length}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop / tablet */}
      <div className="hidden md:flex flex-1 items-center justify-center overflow-hidden relative px-3 sm:px-6 lg:px-10 py-4">
        <button
          onClick={flipPrev}
          className="absolute left-2 sm:left-4 lg:left-8 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground/70 hover:text-primary-foreground transition-all duration-200"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <div
          className={`transition-opacity duration-700 w-full h-full flex items-center justify-center ${
            bookReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="origin-center scale-[0.8] lg:scale-[0.8] xl:scale-[0.82] transition-transform duration-300">
            {/* @ts-ignore */}
            <HTMLFlipBook
              ref={bookRef}
              width={800}
              height={1066}
              size="fixed"
              minWidth={800}
              maxWidth={800}
              minHeight={1066}
              maxHeight={1066}
              maxShadowOpacity={0.5}
              showCover={true}
              mobileScrollSupport={true}
              onFlip={onFlip}
              onInit={() => setBookReady(true)}
              className="catalogue-flipbook"
              startPage={0}
              drawShadow={true}
              flippingTime={800}
              usePortrait={false}
              startZIndex={0}
              autoSize={false}
              clickEventForward={false}
              useMouseEvents={true}
              swipeDistance={30}
              showPageCorners={true}
              disableFlipByClick={false}
            >
              {pages.map((src, i) => (
                <Page key={i} src={src} pageNumber={i + 1} />
              ))}
            </HTMLFlipBook>
          </div>
        </div>

        <button
          onClick={flipNext}
          className="absolute right-2 sm:right-4 lg:right-8 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground/70 hover:text-primary-foreground transition-all duration-200"
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-4 px-4 sm:px-6 py-3 border-t border-white/5">
        <span className="hidden md:inline font-body text-sm text-primary-foreground/50">
          {currentPage + 1} / {totalPages}
        </span>

        <a
          href={PDF_PATH}
          download="BAL_Marketing_Booklet.pdf"
          className="font-body text-sm text-sky hover:text-sky/80 transition-colors"
        >
          Download PDF
        </a>
      </div>
    </div>
  );
};

export default Catalogue;
