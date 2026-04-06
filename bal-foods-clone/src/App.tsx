import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import Catalogue from "./pages/Catalogue";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
