import React, { useState, useEffect } from 'react';
import useCreditsFirebase from "../hooks/useCreditsFirebase";
import { formatCOP } from '../utils/format';
import { monthlyPayment } from "../utils/calc";
import { useLocation } from 'react-router-dom';
import { createRequest } from "../firebase/requests";

const initial = {
  fullname: '',
  cedula: '',
  email: '',
  telefono: '',
  creditId: '',
  monto: '',
  plazo: 12,
  destino: '',
  empresa: '',
  cargo: '',
  ingresos: ''
};

export default function RequestForm() {

  
  const { credits, loading } = useCreditsFirebase();

  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [monthly, setMonthly] = useState(0);
  const location = useLocation();

  
  useEffect(() => {
    if (!loading && credits.length > 0 && !form.creditId) {
      setForm(prev => ({ ...prev, creditId: credits[0].id }));
    }
  }, [loading, credits]);

  useEffect(() => {
    const credit = credits.find(c => c.id === form.creditId);
    const P = Number(form.monto);
    const r = credit?.rateMonthly ?? 0;
    const n = Number(form.plazo);

    if (P > 0 && n > 0) {
      setMonthly(monthlyPayment(P, r, n));
    } else {
      setMonthly(0);
    }
  }, [form.monto, form.plazo, form.creditId, credits]);


  const validate = () => {
    const e = {};
    if (!form.fullname) e.fullname = 'Nombre requerido';
    if (!/^\d{6,12}$/.test(form.cedula)) e.cedula = 'Cédula inválida';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email inválido';
    if (!/^\d{7,10}$/.test(form.telefono)) e.telefono = 'Teléfono inválido';
    if (!form.monto || Number(form.monto) < 100000) e.monto = 'Monto mínimo 100.000';
    if (!form.ingresos || Number(form.ingresos) <= 0) e.ingresos = 'Ingrese ingresos';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onChange = field => e => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;

    setErrors({ loading: "Enviando solicitud..." });

    const data = {
      ...form,
      cuota: Math.round(monthly)
    };

    const res = await createRequest(data);

    if (res.ok) {
      setErrors({ success: "Solicitud enviada correctamente." });
      setForm(initial);
    } else {
      setErrors({ submit: "Error enviando la solicitud. Revisa tu conexión." });
    }
  };

  if (loading) return <p>Cargando créditos...</p>;

  const selectedCredit = credits.find(c => c.id === form.creditId);


  return (
    <main className="container form-layout">
      <div className="form-image"></div>

      <form className="form-grid" onSubmit={onSubmit} noValidate>
        <h3 className="form-title">Datos Personales</h3>

        {errors.loading && <div className="info">{errors.loading}</div>}
        {errors.success && <div className="success">{errors.success}</div>}
        {errors.submit && <div className="error">{errors.submit}</div>}

        <div className="form-group">
          <label>Nombre completo</label>
          <input value={form.fullname} onChange={onChange("fullname")} />
          {errors.fullname && <small className="error">{errors.fullname}</small>}
        </div>

        <div className="form-group">
          <label>Cédula</label>
          <input value={form.cedula} onChange={onChange("cedula")} />
          {errors.cedula && <small className="error">{errors.cedula}</small>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input value={form.email} onChange={onChange("email")} />
          {errors.email && <small className="error">{errors.email}</small>}
        </div>

        <div className="form-group">
          <label>Teléfono</label>
          <input value={form.telefono} onChange={onChange("telefono")} />
          {errors.telefono && <small className="error">{errors.telefono}</small>}
        </div>

        <h3 className="form-title">Datos del Crédito</h3>

        <div className="form-group">
          <label>Tipo de crédito</label>
          <select value={form.creditId} onChange={onChange("creditId")}>
            {credits.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Monto solicitado</label>
          <input type="number" value={form.monto} onChange={onChange("monto")} />
          {errors.monto && <small className="error">{errors.monto}</small>}
        </div>

        <div className="form-group">
          <label>Plazo (meses)</label>
          <select value={form.plazo} onChange={onChange("plazo")}>
            {[12, 24, 36, 48, 60, 72, 84].map(n => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group full">
          <label>Destino del crédito</label>
          <input value={form.destino} onChange={onChange("destino")} />
        </div>

        <h3 className="form-title">Datos Laborales</h3>

        <div className="form-group">
          <label>Empresa</label>
          <input value={form.empresa} onChange={onChange("empresa")} />
        </div>

        <div className="form-group">
          <label>Cargo</label>
          <input value={form.cargo} onChange={onChange("cargo")} />
        </div>

        <div className="form-group full">
          <label>Ingresos mensuales</label>
          <input type="number" value={form.ingresos} onChange={onChange("ingresos")} />
          {errors.ingresos && <small className="error">{errors.ingresos}</small>}
        </div>

        <div className="form-group full">
          <p>
            Cuota estimada: <strong>{formatCOP(Math.round(monthly))}</strong> / mes
            (tasa: {(selectedCredit?.rateMonthly * 100).toFixed(2)}%)
          </p>
        </div>

        <div className="form-group full buttons">
          <button className="btn-primary" type="submit">
            Enviar solicitud
          </button>
        </div>

        <div className="form-group full buttons">
          <button className="btn-primary" type="button" onClick={() => setForm(initial)}>
            Limpiar
          </button>
        </div>
      </form>
    </main>
  );
}


