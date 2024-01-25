import MainNavigation from "./navigation/mainNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Login from "./screens/login";
import OrderList from "./screens/storeList";
import * as Font from 'expo-font';
import { useEffect, useState } from "react";
import AuthProvider from "./context/AuthContext";
import UserProvider from "./context/UserContext";
import OrderProvider from "./context/OrderContext";



export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Mulish-Regular': require('./fonts/Mulish-Regular.ttf'),
        'Mulish-SemiBold': require('./fonts/Mulish-SemiBold.ttf'),
        'Mulish-Bold': require('./fonts/Mulish-Bold.ttf'),
      });
      setFontLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontLoaded) {
    return (
      <AuthProvider>
        <OrderProvider>
          <UserProvider>
            <SafeAreaProvider>
              <MainNavigation />
            </SafeAreaProvider>
          </UserProvider>
        </OrderProvider>
      </AuthProvider>

    );
  }
  return (
    <AuthProvider>
      <OrderProvider>
        <UserProvider>
          <SafeAreaProvider>
            <MainNavigation />
          </SafeAreaProvider>
        </UserProvider>
      </OrderProvider>
    </AuthProvider>
  );
}