import { useEffect, useRef, useState, useCallback, forwardRef } from "react";
import HTMLFlipBook from "react-pageflip";
import * as pdfjsLib from "pdfjs-dist";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
const PDF_PATH = "/catalogue/BAL_Marketing_Booklet_double.pdf";

interface PageProps { src: string; pageNumber: number; }

const Page = forwardRef<HTMLDivElement, PageProps>(({ src, pageNumber }, ref) => (
  <div ref={ref} className="page-content" data-page={pageNumber}>
    <img src={src} alt={`Page ${pageNumber}`} className="w-full h-full object-contain" draggable={false} />
  </div>
));
Page.displayName = "Page";

const Catalogue = () => {
  const [pages, setPages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [bookReady, setBookReady] = useState(false);
  const bookRef = useRef<any>(null);
  const navigate = useNavigate();

  const renderPDF = useCallback(async () => {
    try {
      const pdf = await pdfjsLib.getDocument(PDF_PATH).promise;
      setTotalPages(pdf.numPages);
      const rendered: string[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d')!;
        await page.render({ canvasContext: ctx, viewport }).promise;
        rendered.push(canvas.toDataURL('image/jpeg', 0.92));
      }
      setPages(rendered);
    } catch (err) {
      console.error('Error loading PDF:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { renderPDF(); }, [renderPDF]);
  const flipPrev = () => bookRef.current?.pageFlip()?.flipPrev();
  const flipNext = () => bookRef.current?.pageFlip()?.flipNext();
  const onFlip = (e: any) => setCurrentPage(e.data);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') flipPrev();
      if (e.key === 'ArrowRight') flipNext();
      if (e.key === 'Escape') navigate('/');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  if (loading) return <div className="fixed inset-0 bg-navy flex items-center justify-center z-50"><div className="text-center"><div className="w-16 h-16 border-4 border-sky/30 border-t-sky rounded-full animate-spin mx-auto mb-6" /><p className="font-heading text-lg text-primary-foreground/70">Loading catalogue…</p></div></div>;
  if (pages.length === 0) return <div className="fixed inset-0 bg-navy flex items-center justify-center z-50"><div className="text-center"><p className="font-heading text-lg text-primary-foreground/70 mb-4">Unable to load catalogue.</p><Button onClick={() => navigate('/')} variant="outline" className="text-primary-foreground border-primary-foreground/30">Go Back</Button></div></div>;

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ backgroundColor: 'hsl(220, 35%, 12%)' }}>
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/5">
        <h2 className="font-heading text-lg text-primary-foreground font-semibold tracking-tight">BAL Foods Group — Product Catalogue</h2>
        <Button onClick={() => navigate('/')} variant="ghost" size="icon" className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10"><X className="w-5 h-5" /></Button>
      </div>
      <div className="flex-1 flex items-center justify-center overflow-hidden relative px-16">
        <button onClick={flipPrev} className="absolute left-4 md:left-8 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground/70 hover:text-primary-foreground transition-all duration-200" aria-label="Previous page"><ChevronLeft className="w-6 h-6" /></button>
        <div className={`transition-opacity duration-700 w-full max-w-[1600px] ${bookReady ? 'opacity-100' : 'opacity-0'}`} style={{ aspectRatio: '1.5 / 1' }}>
          {/* @ts-ignore */}
          <HTMLFlipBook ref={bookRef} width={800} height={1066} size="stretch" minWidth={500} maxWidth={1600} minHeight={667} maxHeight={2133} maxShadowOpacity={0.5} showCover={true} mobileScrollSupport={true} onFlip={onFlip} onInit={() => setBookReady(true)} className="catalogue-flipbook" startPage={0} drawShadow={true} flippingTime={800} usePortrait={false} startZIndex={0} autoSize={true} clickEventForward={false} useMouseEvents={true} swipeDistance={30} showPageCorners={true} disableFlipByClick={false}>
            {pages.map((src, i) => <Page key={i} src={src} pageNumber={i + 1} />)}
          </HTMLFlipBook>
        </div>
        <button onClick={flipNext} className="absolute right-4 md:right-8 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground/70 hover:text-primary-foreground transition-all duration-200" aria-label="Next page"><ChevronRight className="w-6 h-6" /></button>
      </div>
      <div className="flex items-center justify-center gap-4 px-6 py-3 border-t border-white/5">
        <span className="font-body text-sm text-primary-foreground/50">{currentPage + 1} / {totalPages}</span>
        <a href={PDF_PATH} download="BAL_Marketing_Booklet.pdf" className="font-body text-sm text-sky hover:text-sky/80 transition-colors ml-4">Download PDF</a>
      </div>
    </div>
  );
};

export default Catalogue;
