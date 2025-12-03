import { Link } from "react-router-dom";
import { useState } from "react";


function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container nav-content">

        {/* LOGO IZQUIERDA */}
        <h1 className="logo">💳 CreditSmart</h1>

        {/* BOTÓN HAMBURGUESA MÓVIL */}
        <div 
          className="menu-toggle" 
          onClick={() => setOpen(!open)}
        >
          ☰
        </div>

        {/* MENÚ */}
        <ul className={`menu ${open ? "active" : ""}`}>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/simulador">Buscar</Link></li>
          <li><Link to="/solicitar">Solicitar crédito</Link></li>
        </ul>

      </div>
    </nav>
  );
}

export default Navbar;


