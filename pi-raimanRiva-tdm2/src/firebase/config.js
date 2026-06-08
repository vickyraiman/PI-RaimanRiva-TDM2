import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBS62NuN72jOGu75eUM3Wp4CEYWhP9S7jw",
  authDomain: "pi-raimanriva-tdm2.firebaseapp.com",
  projectId: "pi-raimanriva-tdm2",
  storageBucket: "pi-raimanriva-tdm2.firebasestorage.app",
  messagingSenderId: "1098819241566",
  appId: "1:1098819241566:web:cc0c0acd5b3761d5cc56cf",
  measurementId: "G-F92YCFYJ9Q"
};

app.initializeApp(firebaseConfig);

export const auth = app.auth();
export const firestore = app.firestore();