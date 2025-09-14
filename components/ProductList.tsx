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
  //defines what properties and its types
  interface ProductData {
    id: string;
    title: string;
    category: string;
    price: number;
    brand: string;
    thumbnail: string;
  }
  //set states here for data
  const [data, setData] = useState<ProductData[] | null>([]);
  //send action to the redux store to update state 
  const dispatch = useDispatch();
  //navigation object to navigate betw screens
  const navigation = useNavigation();

  //call first time when page is loaded and set data in state
  useEffect(() => {
    (async () => {
      const fetchData = await axios.get('https://dummyjson.com/products');
      setData(fetchData.data.products);
    })();
  }, []);

  //to add items in cart and navigate to cart page
  const handleAddToCart = (item:any) => {
    // add item to Redux state
    dispatch(addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      thumbnail: item.thumbnail,
    }));
    // jump to Cart tab
    navigation.navigate('Cart');
  };

  //render each row with Add to cart button
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
        keyExtractor={item => item.id} //for uniqueness
        renderItem={renderItem} //render each row
      />
    </View>
  );
}
