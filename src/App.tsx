import { Route, Routes } from "react-router-dom";
import AboutPage from "./routes/about";
import ContactPage from "./routes/contact";
import ServicesPage from "./routes/services";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4 py-20">
            <div className="max-w-xl text-center">
              <h1 className="font-display text-5xl font-bold">
                BCS Coffee Market Consulting
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Ethiopia's trusted coffee export consultancy, connecting
                verified origin suppliers with global buyers.
              </p>
            </div>
          </div>
        }
      />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/services" element={<ServicesPage />} />
    </Routes>
  );
}
