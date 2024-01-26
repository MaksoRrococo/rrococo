import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

   
    const firebaseConfig = {
        apiKey: "AIzaSyC1OI3yXuORwI_8wxnzLFHLEvu3oc953ik",
        authDomain: "rrococo-57d09.firebaseapp.com",
        projectId: "rrococo-57d09",
        storageBucket: "rrococo-57d09.appspot.com",
        messagingSenderId: "789511078262",
        appId: "1:789511078262:web:261fdd580ea5d79fbc7a57",
        measurementId: "G-TE0GEHX4CX"
    };
  

    const app = initializeApp(firebaseConfig)

    const auth = getAuth(app)
    const db = getFirestore(app)
    const storage = getStorage(app)

export {
    auth,
    db,
    storage
}  