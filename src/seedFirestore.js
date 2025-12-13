import { db } from './firebase/config';
import { collection, addDoc } from 'firebase/firestore';


const creditsData  = [ 
    { 
    icon: "💰",
    name: "Crédito Personal de Libre Inversión",
    rateMonthly: 0.018,
    min: 1000000,
    max: 30000000,
    termMax: 60,
    description:
    "Dinero rápido para lo que necesites sin justificar su uso."
    },
    {
    icon: "🚗",
    name: "Crédito de Vehículos",
    rateMonthly: 0.015,
    min: 5000000,
    max: 100000000,
    termMax: 72,
    description: "Financia la compra de tu próximo vehículo."
  },

  {
    icon: "🏠",
    name: "Crédito Hipotecario",
    rateMonthly: 0.012,
    min: 50000000,
    max: 500000000,
    termMax: 240,
    description:
    "Financia la compra o construcción de tu vivienda con nuestras tasas competitivas."
  },

  {
    icon: "🎓",
    name: "Crédito Educativo",
    rateMonthly: 0.014,
    min: 2000000,
    max: 50000000,
    termMax: 84,
    description: "Invierte en tu futuro académico."
  },

  {
    icon: "🏢",
    name: "Crédito Empresarial",
    rateMonthly: 0.016,
    min: 20000000,
    max: 200000000,
    termMax: 120,
    description: "Impulsa el crecimiento de tu negocio."
  },

  {
    icon: "💼",
    name: "Crédito de Consumo",
    rateMonthly: 0.017,
    min: 1000000,
    max: 25000000,
    termMax: 48,
    description: "Financia tus compras y proyectos personales."
  }

 ];
const seedFirestore = async () => {
  try {console.log( 'Iniciando carga de datos a Firestore' )

    for (const credit of creditsData) {const docRef = await addDoc(collection(db, 'credits' ), credit);
     console.log('${credit.name}agregado con ID: ${docRef.id}' );
    }

   console.log('Todos los créditos fueron agregados exitosamente' );
   console.log('En cuanto se guarden los registros, borrar este archivo');

  } catch (error) {console.error('Error al cargar datos: ', error ); }
   
  
}

seedFirestore();