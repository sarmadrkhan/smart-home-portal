import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDocs, setDoc, deleteDoc } from "firebase/firestore";
import firebaseConfig from "./config";

class Firebase {
  constructor() {
    const app = initializeApp(firebaseConfig);
    this.db = getFirestore(app);
  }

  // Users

  async getUsers() {
    const snapshot = await getDocs(collection(this.db, 'users'))
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return users;
  }

  async addUser(userData) {
    const docRef = doc(collection(this.db, 'users'));
    const userDataWithId = { ...userData, id: docRef.id };
    await setDoc(docRef, userDataWithId);
    return docRef.id;
  }

  async deleteUser(userId) {
    await deleteDoc(doc(this.db, 'users', userId));
  }
}

const firebaseInstance = new Firebase();

export default firebaseInstance;