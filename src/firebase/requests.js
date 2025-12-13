import { db } from "../firebase/config";
import { collection, addDoc, getDocs, doc,
  updateDoc,
  deleteDoc } from "firebase/firestore";

const colRef = collection(db, "requests");

// ===============================
//  GUARDAR SOLICITUD
// ===============================
export async function createRequest(data) {
  try {
    await addDoc(collection(db, "requests"), data);
    return { ok: true };
  } catch (err) {
    console.error("Error creando solicitud:", err);
    return { ok: false, error: err };
  }
}

// ===============================
//  OBTENER TODAS LAS SOLICITUDES
// ===============================
export async function getRequests() {
  try {
    const col = collection(db, "requests");
    const snapshot = await getDocs(col);

    const list = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return { ok: true, data: list };

  } catch (err) {
    console.error("Error obteniendo solicitudes:", err);
    return { ok: false, error: err };
  }
}

// EDITAR
export const updateRequest = async (id, data) => {
  const ref = doc(db, "requests", id);
  await updateDoc(ref, data);
};

// ELIMINAR
export const deleteRequest = async (id) => {
  const ref = doc(db, "requests", id);
  await deleteDoc(ref);
};