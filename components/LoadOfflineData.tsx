import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoadOfflineData() {
  //defines what properties and its types
  interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  }

  interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
  }
  interface Details {
    id: number;
    name: string;
    username: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
  }

  //set states for internet connection and data
  const [isInternet, setIsInternet] = useState<Boolean | null>(false);
  const [loadData, setLoadData] = useState<Details[]>([]);

  //function fetchData if internet connection is available then get data and  store it in Asyncstorage
  //if no internet then get data from async storage
  const fetchData = async (internet: boolean) => {
  try {
    if (internet) {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users',
      );
      await AsyncStorage.setItem('offline-data', JSON.stringify(response.data));
      setLoadData(response.data);
    } else {
      const stored = await AsyncStorage.getItem('offline-data');
      if (stored) setLoadData(JSON.parse(stored));
    }
  } catch (error) {
    console.log('error', error);
  }
};

  //To check internet connection using Netinfo pacakge and call fetchData func and set internet state
  useEffect(() => {
  const unsubscribe = NetInfo.addEventListener(state => {
    setIsInternet(state.isConnected ?? false);
    fetchData(state.isConnected ?? false);
  });
  return () => unsubscribe();
}, []);

  //Render items in each rows
  const renderItem = ({ item }: { item: Details }) => (
    <View style={{ padding: 4, borderBottomWidth: 1 }}>
      <Text>Id: {item.id}</Text>
      <Text>Name: {item.name}</Text>
      <Text>UserName: {item.username}</Text>
      <Text>Phone: {item.phone}</Text>
      <Text>Website: {item.website}</Text>
      <Text>
        Address: {item.address.street}, {item.address.suite}
      </Text>
      <Text>
        {item.address.city} - {item.address.zipcode}
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          justifyContent: 'flex-end',
          width: '100%',
          flexDirection: 'row',
        }}
      >
        <Text
          style={{
            margin: 20,
            backgroundColor: `${isInternet ? 'green' : 'red'}`,
            color: 'white',
            padding: 10,
          }}
        >
          {isInternet ? 'Online' : 'Offline'}   
        </Text>
      </View>
      <FlatList
        data={loadData} //data
        keyExtractor={item => item.name}  //for uniqueness
        renderItem={renderItem}  //rows
      />
    </View>
  );
}

