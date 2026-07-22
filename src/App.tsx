import { Route, Routes } from "react-router-dom";
import AboutPage from "./routes/about";
import BlogPage from "./routes/blog";
import ContactPage from "./routes/contact";
import HomePage from "./routes/index";
import NotFoundPage from "./routes/not-found";
import OriginsPage from "./routes/origins";
import ProcessPage from "./routes/process";
import ServicesPage from "./routes/services";

// Define the application's routes and map each URL path to its corresponding page component.
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/origins" element={<OriginsPage />} />
      <Route path="/process" element={<ProcessPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
