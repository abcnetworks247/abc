import { View, Text, SafeAreaView, KeyboardAvoidingView, ScrollView,Image  } from 'react-native'
import React from 'react';
import Navbar from '../../../components/navbar/Navbar';
import globalStyels from '../../../../styles/globalStyels';
import User from "../../../../assets/user.jpg"

export default function index() {
  return (
    <SafeAreaView style={globalStyels.droidSafeArea}>
          <Navbar />
           <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
             <View className="mt-10">
                <View>
                  <View className="flex flex-row items-center  px-4 gap-4">

                    <Image source={User} style={{width:100,height:100,borderRadius:50}} />
                      <View>
                        <Text className="text-sm font-semibold  w-full text-gray-600">Prince Ajuzie</Text>
                        <Text className="text-xs text-gray-600">princeajuzie12@gmail.com</Text>
                        <View className="flex flex-row items-center gap-2">
                          <Text className="text-sm font-semibold  w-full text-gray-600">Basic</Text>
                        </View>
                      </View>
                  </View>

                </View>
             </View>

           </ScrollView>
    </SafeAreaView>
  )
}