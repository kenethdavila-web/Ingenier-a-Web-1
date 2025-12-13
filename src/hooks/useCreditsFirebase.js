import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

export default function useCreditsFirebase() {
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCredits() {
      try {
        const ref = collection(db, "credits");
        const snap = await getDocs(ref);

        const list = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setCredits(list);
      } catch (err) {
        setError("Error cargando créditos desde Firebase");
      } finally {
        setLoading(false);
      }
    }

    loadCredits();
  }, []);

  return { credits, loading, error };
}
