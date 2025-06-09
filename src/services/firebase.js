// Configuración de Firebase para React
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDMf0_s4u1BRUAU0wki_xsl97UdXfA68no",
  authDomain: "recvelvet-58027.firebaseapp.com",
  projectId: "recvelvet-58027",
  storageBucket: "recvelvet-58027.firebasestorage.app",
  messagingSenderId: "1015889951315",
  appId: "1:1015889951315:web:189ae182c2315d1b4664a6"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, firebaseConfig };
