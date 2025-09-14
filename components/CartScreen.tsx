import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrementQuantity, incrementQuantity } from './Redux/CartSlice';
import { RootState } from './Redux/Store';

export default function CartScreen() {
  const dispatch = useDispatch();
  const { items, totalItems, totalPrice } = useSelector(
    (state: RootState) => state.cart,
  );
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {totalPrice === 0 ? <Text>No Items Found in Cart</Text> : ''}
      </View>
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 8,
            }}
          >
            <Image
              source={{ uri: item.thumbnail }}
              style={{ width: 50, height: 50, marginRight: 8 }}
            />
            <View style={{ flex: 1 }}>
              <Text>{item.title}</Text>
              <Text>₹{item.price}</Text>
              <Text>Qty: {item.quantity}</Text>
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-around' }}
            >
              <TouchableOpacity
                onPress={() => dispatch(decrementQuantity(item.id))}
                style={{
                  backgroundColor: 'orange',
                  padding: 4,
                  borderRadius: 4,
                  width: '20%',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}
              >
                <Text style={{ fontSize: 20 }}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => dispatch(incrementQuantity(item.id))}
                style={{
                  backgroundColor: 'orange',
                  padding: 4,
                  borderRadius: 4,
                  width: '20%',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}
              >
                <Text style={{ fontSize: 20 }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      {totalPrice == 0 ? (
        ''
      ) : (
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
          Total Price: ₹{totalPrice.toFixed(2)}
        </Text>
      )}
      {totalPrice == 0 ? (
        ''
      ) : (
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
          Total Items: {totalItems}
        </Text>
      )}
    </View>
  );
}
