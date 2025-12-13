import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        
        <p>© {new Date().getFullYear()} CreditSmart. Todos los derechos reservados.</p>

        <ul className="footer-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/simulador">Buscar</Link></li>
          <li><Link to="/solicitar">Solicitar</Link></li>
          <li><Link to="/solicitudes">Solicitudes</Link></li>
        </ul>

        <div className="socials">
          <a href="https://wa.me/573000000000" target="_blank">📱 WhatsApp </a>
          <a href="https://instagram.com" target="_blank">📸 Instagram </a>
          <a href="https://facebook.com" target="_blank">📘 Facebook </a>
        </div>

      </div>
    </footer>
  );
 }

