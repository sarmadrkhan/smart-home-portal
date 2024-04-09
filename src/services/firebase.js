import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDocs, setDoc, deleteDoc, getDoc } from "firebase/firestore";
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

  async getUser(userId) {
    const userDoc = await getDoc(doc(this.db, 'users', userId));
    return { id: userDoc.id, ...userDoc.data() };
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

  // Homes
  async getHomes() {
    const snapshot = await getDocs(collection(this.db, 'homes'))
    const homes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return homes;
  }

  async getHome(homeId) {
    const homeDoc = await getDoc(doc(this.db, 'homes', homeId));
    return { id: homeDoc.id, ...homeDoc.data() };
  }

  async addHome(homeData) {
    const docRef = doc(collection(this.db, 'homes'));
    const homeDataWithId = { ...homeData, id: docRef.id };
    await setDoc(docRef, homeDataWithId);
    return docRef.id;
  }

  async deleteHome(homeId) {
    await deleteDoc(doc(this.db, 'homes', homeId));
  }

  async getHomeOwner(homeId) {
    const usersSnapshot = await getDocs(collection(this.db, 'users'));
    const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const owner = users.find(user => user.homeRefs && user.homeRefs.includes(homeId));
    return owner || null;
  }

  // Rooms
  async getRooms() {
    const snapshot = await getDocs(collection(this.db, 'rooms'));
    const rooms = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return rooms;
  }

  async getRoom(roomId) {
    const roomDoc = await getDoc(doc(this.db, 'rooms', roomId));
    return { id: roomDoc.id, ...roomDoc.data() };
  }

  async addRoom(roomData) {
    const docRef = doc(collection(this.db, 'rooms'));
    const roomDataWithId = { ...roomData, id: docRef.id };
    await setDoc(docRef, roomDataWithId);
    return docRef.id;
  }

  async deleteRoom(roomId) {
    await deleteDoc(doc(this.db, 'rooms', roomId));
  }

  async getRoomOwner(roomId) {
    const homesSnapshot = await getDocs(collection(this.db, 'homes'));
    const homes = homesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const owner = homes.find(home => home.roomRefs && home.roomRefs.includes(roomId));
    return owner || null;
  }

  // HomeObjects
  async getHomeObjects() {
    const snapshot = await getDocs(collection(this.db, 'homeObjects'));
    const homeObjects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return homeObjects;
  }

  async getHomeObject(homeObjectId) {
    const homeObjectDoc = await getDoc(doc(this.db, 'homeObjects', homeObjectId));
    return { id: homeObjectDoc.id, ...homeObjectDoc.data() };
  }

  async addHomeObject(homeObjectData) {
    const docRef = doc(collection(this.db, 'homeObjects'));
    const homeObjectDataWithId = { ...homeObjectData, id: docRef.id };
    await setDoc(docRef, homeObjectDataWithId);
    return docRef.id;
  }

  async deleteHomeObject(homeObjectId) {
    await deleteDoc(doc(this.db, 'homeObjects', homeObjectId));
  }

  async getHomeObjectOwner(homeObjectId) {
    const roomsSnapshot = await getDocs(collection(this.db, 'rooms'));
    const rooms = roomsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const owner = rooms.find(room => room.homeObjectRefs && room.homeObjectRefs.includes(homeObjectId));
    return owner || null;
  }
}

const firebaseInstance = new Firebase();

export default firebaseInstance;