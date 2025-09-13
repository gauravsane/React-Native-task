import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoadOfflineData from './components/LoadOfflineData';
import { NavigationContainer } from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';
import SecureToken from './components/SecureToken';
import LargeListData from './components/LargeListData';

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

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Offline-Support">
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
