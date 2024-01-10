import { View, Text, SafeAreaView } from 'react-native'
import React from 'react';

import HeroCarousel from '../../../components/carousel/herocarousel/heroCarousel';
import Navbar from '../../../components/navbar/Navbar';
import globalStyels from '../../../../styles/globalStyels';

const index = () => {
  return (
    <View >
             <SafeAreaView style={globalStyels.droidSafeArea}>

<Navbar />

   </SafeAreaView> 
      <View className="">

      <HeroCarousel />
      </View>
    </View>
  )
}

export default index