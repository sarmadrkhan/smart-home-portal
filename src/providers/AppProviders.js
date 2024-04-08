import { FirebaseProvider } from './FirebaseContext';

const AppProviders = ({ children }) => {
  return (
    <FirebaseProvider>
      {children}
    </FirebaseProvider>
  );
};

export default AppProviders;
