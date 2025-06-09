// Servicio para manejar asientos en Firestore
import { getFirestore, doc, setDoc, getDoc, onSnapshot, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase';

// Inicializar Firebase y Firestore solo si no está inicializado
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Referencia a la colección de asientos por función (película, fecha, hora, sala)
function getFuncionRef(funcionId) {
  return doc(db, 'funciones', funcionId);
}

// Inicializar documento si no existe
async function ensureFuncionDoc(funcionId) {
  const ref = getFuncionRef(funcionId);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, { asientosOcupados: [], asientosEnEspera: [] });
  }
}

// Marcar asientos como "en espera" (seleccionados pero no confirmados)
export async function setAsientosEnEspera(funcionId, asientos, usuarioId) {
  await ensureFuncionDoc(funcionId);
  const ref = getFuncionRef(funcionId);
  await updateDoc(ref, {
    asientosEnEspera: arrayUnion({ usuarioId, asientos })
  });
}

// Confirmar asientos (bloquearlos)
export async function confirmarAsientos(funcionId, asientos, usuarioId) {
  await ensureFuncionDoc(funcionId);
  const ref = getFuncionRef(funcionId);
  await updateDoc(ref, {
    asientosOcupados: arrayUnion(...asientos),
    asientosEnEspera: arrayRemove({ usuarioId, asientos })
  });
}

// Liberar asientos en espera (si el usuario cancela o sale)
export async function liberarAsientosEnEspera(funcionId, usuarioId) {
  await ensureFuncionDoc(funcionId);
  const ref = getFuncionRef(funcionId);
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    const data = docSnap.data();
    const nuevosEnEspera = Array.isArray(data.asientosEnEspera) ? data.asientosEnEspera.filter(a => a.usuarioId !== usuarioId) : [];
    await updateDoc(ref, { asientosEnEspera: nuevosEnEspera });
  }
}

// Escuchar cambios en tiempo real de los asientos de una función
export function onAsientosChange(funcionId, callback) {
  const ref = getFuncionRef(funcionId);
  return onSnapshot(ref, (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      callback({
        asientosOcupados: Array.isArray(data.asientosOcupados) ? data.asientosOcupados : [],
        asientosEnEspera: Array.isArray(data.asientosEnEspera) ? data.asientosEnEspera : []
      });
    } else {
      callback({ asientosOcupados: [], asientosEnEspera: [] });
    }
  });
}
