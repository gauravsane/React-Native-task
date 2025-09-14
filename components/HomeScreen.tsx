import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LargeListData from './LargeListData';
import LoadOfflineData from './LoadOfflineData';
import CartScreen from './CartScreen';
import ProductList from './ProductList';
import SecureToken from './SecureToken';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

//defines what properties and its types
interface SecureTokenProps {
  dummyToken: string | null;
  handleStore: () => void;
  handleResetStore: () => void;
}

//just get stored token from secure storage set token and reset token functions from Main page as Props
//Bottom Tab Navigator and defines tabs
export default function HomeScreen({
  dummyToken,
  handleStore,
  handleResetStore,
}: SecureTokenProps) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string = '';

          switch (route.name) {
            case 'Large-Data':
              iconName = 'list';
              break;
            case 'Offline-Support':
              iconName = 'cloud';
              break;
            case 'ProductList':
              iconName = 'pricetags';
              break;
            case 'Cart':
              iconName = 'cart';
              break;
            case 'Secure-Token':
              iconName = 'lock-closed';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Large-Data" component={LargeListData} />
      <Tab.Screen name="Offline-Support" component={LoadOfflineData} />
      <Tab.Screen name="ProductList" component={ProductList} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Secure-Token">
        {() => (
          <SecureToken
            dummyToken={dummyToken}
            handleStore={handleStore}
            handleResetStore={handleResetStore}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
