import { View, Text, Image, StatusBar } from 'react-native'
import React from 'react'
import Navbar from '../../../../components/navbar/Navbar'
import { ScrollView, SafeAreaView } from 'react-native'
// import Link from react native
import { Link } from 'expo-router'
import globalStyels from '../../../../../styles/globalStyels'
// imort global styles

const index = () => {
    
    //4 random images in an object
    const images = {
        image1: "https://source.unsplash.com/200x200/?fashion?1",
        image2: "https://source.unsplash.com/200x200/?fashion?2",
        image3: "https://source.unsplash.com/200x200/?fashion?3",
        image4: "https://source.unsplash.com/200x200/?fashion?4",
      };
  return (
    <>
          <StatusBar barStyle="light-content" backgroundColor="#2c3e50" />
    <SafeAreaView style={globalStyels.droidSafeArea} >
    <Navbar />
    <ScrollView className="py-2">
	<View className="container p-3 space-y-8">
		<View className="space-y-2 text-center">
			<Text className="text-3xl font-bold">Partem reprimique an pro</Text>
			<Text className=" text-sm ">Qualisque erroribus usu at, duo te agam soluta mucius.</Text>
		</View>
		<View className=" grid grid-cols-1 gap-y-8 ">
			<View className="flex flex-col ">
					<Image alt="" className="object-cover w-full h-52 object-top rounded-t" source={{uri: images.image1}} />
				<View className="flex flex-col flex-1 p-1">
					<Link rel="noopener noreferrer" href="#" className="text-xs tracki uppercase hover:underline dark:text-default-400">Convenire</Link>
					<Text className="flex-1 py-2 text-lg font-semibold ">Te nulla oportere reprimique his dolorum</Text>
					<View className="flex flex-wrap justify-between pt-3 text-xs ">
						<Text>June 1, 2020</Text>
						<Text>2.1K views</Text>
					</View>
				</View>
			</View>
			<View className="flex flex-col ">
					<Image alt="" className="object-cover w-full h-52  object-top rounded-t" source={{uri: images.image2}} />
				<View className="flex flex-col flex-1 p-1">
					<Link rel="noopener noreferrer" href="#" className="text-xs tracki uppercase hover:underline dark:text-default-400">Convenire</Link>
					<Text className="flex-1 py-2 text-lg font-semibold leadi">Te nulla oportere reprimique his dolorum</Text>
					<View className="flex flex-wrap justify-between pt-3 text-xs ">
						<Text>June 2, 2020</Text>
						<Text>2.2K views</Text>
					</View>
				</View>
			</View>
			<View className="flex flex-col ">
					<Image alt="" className="object-cover object-top w-full h-52 rounded-t" source={{uri: images.image3}} />
				<View className="flex flex-col flex-1 p-1">
					<Link rel="noopener noreferrer" href="#" className="text-xs tracki uppercase hover:underline dark:text-default-400">Convenire</Link>
					<Text className="flex-1 py-2 text-lg font-semibold leadi">Te nulla oportere reprimique his dolorum</Text>
					<View className="flex flex-wrap justify-between pt-3 text-xs ">
						<Text>June 3, 2020</Text>
						<Text>2.3K views</Text>
					</View>
				</View>
			</View>
			<View className="flex flex-col ">
					<Image alt="" className="object-cover w-full h-52 object-top rounded-t" source={{uri: images.image4}} />
				<View className="flex flex-col flex-1 p-1">
					<Link rel="noopener noreferrer" href="#" className="text-xs tracki uppercase hover:underline dark:text-default-400">Convenire</Link>
					<Text className="flex-1 py-2 text-lg font-semibold leadi">Te nulla oportere reprimique his dolorum</Text>
					<View className="flex flex-wrap justify-between pt-3 text-xs ">
						<Text>June 4, 2020</Text>
						<Text>2.4K views</Text>
					</View>
				</View>
			</View>
		</View>
	</View>
</ScrollView>
    </SafeAreaView>
    </>
  )
}

export default index
