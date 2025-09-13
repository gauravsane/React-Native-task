import { View, Text, Button } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

interface SecureTokenProps {
  dummyToken: string | null;
  handleStore: () => void;
  handleResetStore: () => void;
}

export default function SecureToken({dummyToken,handleStore,handleResetStore}: SecureTokenProps) {
  return (
     <SafeAreaView>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Text style={{ marginBottom: 20 }}>
          Stored Token: {dummyToken || 'Not Found'}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Button title="Secure Token" onPress={handleStore} />
          <Button
            title="Reset Token"
            onPress={handleResetStore}
            color={'red'}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}