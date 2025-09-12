import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoadOfflineData() {

interface Details {
  id: number;
  name: string;
  username: string,
  address: object,
  phone: string,
  website: string,
  company: object
}


  const [isInternet, setIsInternet] = useState(false);
  const [loadData, setLoadData] = useState<Details[]>([]);

  const fetchData = async () => {
    try {
      if (isInternet) {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/users',
        );
        await AsyncStorage.setItem(
          'offline-data',
          JSON.stringify(response.data),
        );
        setLoadData(response.data);
      } else {
        const loadData = await AsyncStorage.getItem('offline-data');
        setLoadData(JSON.parse(loadData) as Details[]);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      fetchData();
      return setIsInternet(state?.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View>
      <Text
        style={{
          margin: 2,
          backgroundColor: `${isInternet ? 'green' : 'red'}`,
          color: 'white',
        }}
      >
        Device Status: {isInternet ? 'Online' : 'Offline'}
      </Text>
      <Text>{JSON.stringify(loadData)}</Text>
    </View>
  );
}
