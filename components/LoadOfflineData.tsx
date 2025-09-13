import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoadOfflineData() {
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

  const [isInternet, setIsInternet] = useState<Boolean | null>(false);
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
        data={loadData}
        keyExtractor={item => item.name}
        renderItem={renderItem}
      />
    </View>
  );
}
