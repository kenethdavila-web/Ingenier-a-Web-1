import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Simulator from "./pages/Simulator.jsx";
import Apply from "./pages/Apply.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import RequestsList from "./pages/RequestsList";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/simulador" element={<Simulator />} />
        <Route path="/solicitar" element={<Apply />} />
        
        {/* NUEVA RUTA */}
        <Route path="/solicitudes" element={<RequestsList />} />

      </Routes>

      <Footer />
    </>
  );
}


