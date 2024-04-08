import { createContext, useContext } from 'react';
import firebaseInstance from '../services/firebase';

const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={firebaseInstance}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);
