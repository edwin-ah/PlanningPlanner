import { NavigationContainer } from '@react-navigation/native';
import NavContainer from './src/app/components/NavContainer';
import { AuthProvider } from './src/app/context_api/AuthContext';

export default function App() {
  return (
   <NavigationContainer>
      <AuthProvider>
        <NavContainer />
      </AuthProvider>
   </NavigationContainer>
  );
}

