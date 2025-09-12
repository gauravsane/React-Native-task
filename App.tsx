import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import NetInfo from "@react-native-community/netinfo";
import LoadOfflineData from './components/LoadOfflineData';


export default function App() {
  useEffect(() => {
  const unsubscribe = NetInfo.addEventListener((state) => {
    console.log(state);
  });
  return () => {
    unsubscribe();
  };
}, []);

  return (
    <SafeAreaView>
      <View>
        <LoadOfflineData />
      </View>
    </SafeAreaView>
  );
}
