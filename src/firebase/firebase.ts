import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: import.meta.env.VITE_AUTH_DOMAIN,
//   databaseURL: import.meta.env.VITE_DATABASE_URL,
//   projectId: import.meta.env.VITE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_APP_ID,
//   measurementId: import.meta.env.VITE_MEASUREMENT_ID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyBPjL3U_H0sNp2GCAV9eYCy0w7tFq35Bc8",
  authDomain: "place-c36d0.firebaseapp.com",
  databaseURL: "https://place-c36d0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "place-c36d0",
  storageBucket: "place-c36d0.appspot.com",
  messagingSenderId: "283704752937",
  appId: "1:283704752937:web:0a0d173d64ece6d87b9538"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); 
const database = getDatabase(app);

export { app, analytics, auth, database };