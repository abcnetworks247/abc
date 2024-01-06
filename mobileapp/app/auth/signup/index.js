import { View, Text } from 'react-native'
import React from 'react';
import { Link } from 'expo-router';

export default function index() {
  return (
    <View>
      <Link href="/auth/signup">

      <Text>Signup page </Text>
      </Link>
    </View>
  )
}