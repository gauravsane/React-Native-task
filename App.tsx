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
  //set State for Token and defines its type
  const [dummyToken, setDummyToken] = useState<string | null>(null);

  //if in secure storage data is available then set it.
  useEffect(() => {
    (async () => {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) setDummyToken(credentials.password);
    })();
  }, []);

  //handleStore function is used to set the value in secure storage
  const handleStore = async () => {
    await Keychain.setGenericPassword('dummyUser', 'SECURE_TOKEN_GAURAV1999');
    setDummyToken('SECURE_TOKEN_GAURAV1999');
  };

  //reset secure storage
  const handleResetStore = async () => {
    await Keychain.resetGenericPassword();
    setDummyToken(null);
  };

  //open spcific screen when receive this link 
  const linking = {
    prefixes: ['myapp://'], //any link starting with 
    config: {
      screens: {
        Home: 'Home',
        UserDetails: 'user/:id', // handles myapp://user/1
      },
    },
  };

  return (
    //Provider used to access data anywhere in app
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
