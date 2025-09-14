import {
  View,
  Text,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from './Redux/CartSlice';
import { useNavigation } from '@react-navigation/native';

export default function ProductList() {
  interface ProductData {
    id: string;
    title: string;
    category: string;
    price: number;
    brand: string;
    thumbnail: string;
  }
  const [data, setData] = useState<ProductData[] | null>([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const fetchData = await axios.get('https://dummyjson.com/products');
      setData(fetchData.data.products);
    })();
  }, []);

  const handleAddToCart = (item:any) => {
    // add item to Redux
    dispatch(addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      thumbnail: item.thumbnail,
    }));
    // jump to Cart tab:
    navigation.navigate('Cart'); // must match Tab.Screen name exactly
  };

  const renderItem = ({ item }: { item: ProductData }) => {
    return (
      <View
        style={{
          flex: 1,
          padding: 8,
          borderBottomWidth: 1,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text>Name: {item.title}</Text>
            <Text>Category: {item.category}</Text>
            <Text>Price: {item.price}</Text>
            <Text>Brand: {item.brand}</Text>
          </View>

          <Image
            source={{ uri: item.thumbnail }}
            style={{ width: 100, height: 100, borderRadius: 8 }}
          />
        </View>

        <View style={{ marginTop: 8, alignItems: 'center' }}>
          <TouchableOpacity
           onPress={() => handleAddToCart(item)}
            style={{ backgroundColor: 'orange', padding: 6, borderRadius: 40 }}
          >
            <Text style={{ color: 'white' }}>Add To Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}
