import { Route, Routes } from "react-router-dom";
import AboutPage from "./routes/about";
import ContactPage from "./routes/contact";
import ServicesPage from "./routes/services";
import OriginsPage from "./routes/origins";
import ProcessPage from "./routes/process";
import BlogPage from "./routes/blog";
import HomePage from "./routes/index";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/origins" element={<OriginsPage />} />
      <Route path="/process" element={<ProcessPage />} />
      <Route path="/blog" element={<BlogPage />} />
    </Routes>
  );
}
