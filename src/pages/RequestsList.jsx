import { useEffect, useState } from "react";
import { getRequests, deleteRequest, updateRequest } from "../firebase/requests";


export default function RequestsList() {
  const [requests, setRequests] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // ============================
  // CARGAR SOLICITUDES
  // ============================
  useEffect(() => {
    const load = async () => {
      const res = await getRequests();

      if (res.ok) {
        setRequests(res.data);
        setFiltered(res.data);
      } else {
        console.error("Error cargando solicitudes:", res.error);
      }

      setLoading(false);
    };

    load();
  }, []);

  // ============================
  // BUSCAR EN TIEMPO REAL
  // ============================
  useEffect(() => {
    const q = search.toLowerCase();

    const f = requests.filter((r) =>
      (r.fullname || "").toLowerCase().includes(q) ||
      (r.email || "").toLowerCase().includes(q) ||
      (r.cedula || "").toString().includes(q)
    );

    setFiltered(f);
  }, [search, requests]);

  if (loading) return <p>Cargando solicitudes...</p>;

  const handleDelete = async (id) => {
  if (!confirm("¿Eliminar esta solicitud?")) return;

  await deleteRequest(id);
  setRequests(prev => prev.filter(r => r.id !== id));
};

const handleEdit = async (req) => {
  const nuevoMonto = prompt("Nuevo monto:", req.monto);
  if (!nuevoMonto) return;

  await updateRequest(req.id, { monto: Number(nuevoMonto) });
  alert("Solicitud actualizada");
};


  return (
  <main className="container requests-page">
      <h2>Solicitudes Enviadas</h2>
      ...


      <input
        className="filter-input"
        placeholder="Buscar por nombre, correo o cédula"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="requests-grid">
        {filtered.map((req) => (
          <div key={req.id} className="request-card">
            <h3>{req.fullname}</h3>
            <p><strong>Cédula:</strong> {req.cedula}</p>
            <p><strong>Email:</strong> {req.email}</p>
            <p><strong>Monto:</strong> ${req.monto}</p>
            <p><strong>Cuota:</strong> ${req.cuota}/mes</p>

            <details className="details-box">
              <summary>Ver solicitud completa</summary>

              <p><strong>Teléfono:</strong> {req.telefono}</p>
              <p><strong>Destino:</strong> {req.destino}</p>
              <p><strong>Empresa:</strong> {req.empresa}</p>
              <p><strong>Cargo:</strong> {req.cargo}</p>
              <p><strong>Ingresos:</strong> ${req.ingresos}</p>
              <p><strong>Plazo:</strong> {req.plazo} meses</p>
              <p><strong>Crédito:</strong> {req.creditId}</p>

              <button
             className="btn-primary"
              onClick={() => handleEdit(req)}
             >
              ✏️ Editar
             </button>

             <button
             className="btn-danger"
              onClick={() => handleDelete(req.id)}
             >
             🗑️ Eliminar
             </button>

            </details>
          </div>
        ))}
      </div>
    </main>
  );
}
