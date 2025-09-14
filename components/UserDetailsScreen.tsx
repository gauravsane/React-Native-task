import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';

export default function UserDetailsScreen() {
  const route = useRoute();
  const { id } = route.params as { id: string };

  //npx uri-scheme open myapp://user/1 --android
  return (
   <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>User Details Screen</Text>
      <Text>ID: {id}</Text>
    </View>
  )
}