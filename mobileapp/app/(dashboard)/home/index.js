import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import globalStyels from '../../../styles/globalStyels';
import HeroCarousel from '../../components/carousel/herocarousel/heroCarousel';

const index = () => {
  return (
    <View >
      <View className="">

      <HeroCarousel />
      </View>
    </View>
  )
}

export default index