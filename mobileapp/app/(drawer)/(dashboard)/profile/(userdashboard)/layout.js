import { View, Text } from 'react-native'
import React from 'react';
import { Tabs } from 'expo-router';

const _Layout = () => {
  return (
    <Tabs>
        <Tabs.Screen name='orders/index' options={{
           header: () => null,
          tabBarItemStyle: {
       display: 'none',
      },
   }}></Tabs.Screen>
    </Tabs>
  )
}

export default _Layout