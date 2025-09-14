import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoadOfflineData from './components/LoadOfflineData';
import { NavigationContainer } from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';
import SecureToken from './components/SecureToken';
import LargeListData from './components/LargeListData';
import HomeScreen from './components/HomeScreen';
import UserDetailsScreen from './components/UserDetailsScreen';
import { Provider } from 'react-redux';
import { store } from './components/Redux/Store';
import CartScreen from './components/CartScreen';
import ProductList from './components/ProductList';

const Stack = createNativeStackNavigator();

export default function App() {
  const [dummyToken, setDummyToken] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) setDummyToken(credentials.password);
    })();
  }, []);

  const handleStore = async () => {
    await Keychain.setGenericPassword('dummyUser', 'SECURE_TOKEN_GAURAV1999');
    setDummyToken('SECURE_TOKEN_GAURAV1999');
  };

  const handleResetStore = async () => {
    await Keychain.resetGenericPassword();
    setDummyToken(null);
  };

  const linking = {
    prefixes: ['myapp://'],
    config: {
      screens: {
        Home: 'Home',
        UserDetails: 'user/:id', // handles myapp://user/1
      },
    },
  };

  return (
    <Provider store={store}>
      <NavigationContainer linking={linking}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" options={{ headerShown: false }}>
            {() => (
              <HomeScreen
                dummyToken={dummyToken}
                handleStore={handleStore}
                handleResetStore={handleResetStore}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Large-Data" component={LargeListData} />
          <Stack.Screen name="Offline-Support" component={LoadOfflineData} />
          <Stack.Screen name="Secure-Token">
            {() => (
              <SecureToken
                dummyToken={dummyToken}
                handleStore={handleStore}
                handleResetStore={handleResetStore}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
          <Stack.Screen name="ProductList" component={ProductList} />
          <Stack.Screen name="CartItems" component={CartScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
