import { View, Text, Image, StatusBar } from "react-native";
import React from "react";
import { ScrollView, SafeAreaView } from "react-native";
// import Link from react native
import { Link } from "expo-router";
import globalStyels from "../../../styles/globalStyels";
import axios from "axios";

// const Api = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
//     withCredentials: true,
//     headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         },
//     });
// import Api from "../../utils/api";
import { useEffect, useState } from "react";






const HomeNews = () => {
  //4 random images in an object
  const images = {
    image1: "https://source.unsplash.com/200x200/?fashion?1",
    image2: "https://source.unsplash.com/200x200/?fashion?2",
    image3: "https://source.unsplash.com/200x200/?fashion?3",
    image4: "https://source.unsplash.com/200x200/?fashion?4",
  };
const [posts, setPosts] = useState([]);
const [highlight, setHighlight] = useState([]);
const [trending, setTrending] = useState([]);
const [topNews, setTopNews] = useState([]);
const [popular, setPopular] = useState([]);
const [loading, setLoading] = useState(true);
const baseURL = process.env.EXPO_PUBLIC_SERVER_URL;



//fetch data from api
const fetchPosts = async () => {
  try {
    const res = await axios.get(`${baseURL}admin/blog`);
    setPosts(res.data);
    setHighlight(res.data.highlight);
    // console.log(res.data.highlight);
    setTrending(res.data.trending);
    // console.log(res.data.trending);
    setTopNews(res.data.top);
    // console.log(res.data.topNews);
    setPopular(res.data.popular);
    // console.log(res.data.popular);
     setLoading(false);
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  fetchPosts();
}, []);

if (loading === true) {
  return <Text>Loading...</Text>;
};

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#2c3e50" />
      <SafeAreaView style={globalStyels.droidSafeArea}>
        <ScrollView className="my-2 space-y-8`">
          {/* trending news */}
          <View className=" mb-16">
            <Text className="py-1 text-xl font-bold h-fit">Trending News</Text>
              {
               trending && trending.map((item, index) => (
                  <View className="flex flex-col " key={index}>
                    <Image
                      alt=""
                      className="object-cover w-full h-52 object-top rounded-t"
                      source={{ uri: item.blogimage }}
                      resizeMode="contain"
                      resizeMethod="resize"
                    />
                    <View className="flex flex-col flex-1 p-1">
                      <Link
                        rel="noopener noreferrer"
                        href="#"
                        className="text-xs tracki uppercase hover:underline dark:text-default-400"
                      >
                        {item.category}
                      </Link>
                      <Text className="flex-1 py-2 text-lg font-semibold ">{item.title}</Text>
                      <View className="flex flex-wrap justify-between pt-3 text-xs ">
                        <Text>{item.date}</Text>
                        <Text>{item.views}</Text>
                      </View>
                    </View>
                  </View>
                ))
              }
            {/* <View className=" grid grid-cols-1 gap-y-10 ">
              <View className="flex flex-col ">
                <Image
                  alt=""
                  className="object-cover w-full h-52 object-top rounded-t"
                  source={{ uri: images.image1 }}
                  resizeMode="contain"
                  resizeMethod="resize"
                />
                <View className="flex flex-col flex-1 p-1">
                  <Link
                    rel="noopener noreferrer"
                    href="#"
                    className="text-xs tracki uppercase hover:underline dark:text-default-400"
                  >
                    Convenire
                  </Link>
                  <Text className="flex-1 py-2 text-lg font-semibold ">
                    Te nulla oportere reprimique his dolorum
                  </Text>
                  <View className="flex flex-wrap justify-between pt-3 text-xs ">
                    <Text>June 1, 2020</Text>
                    <Text>2.1K views</Text>
                  </View>
                </View>
              </View>
              <View className="flex flex-col ">
                <Image
                  alt=""
                  className="object-cover w-full h-52 object-top rounded-t"
                  source={{ uri: images.image1 }}
                  resizeMode="contain"
                  resizeMethod="resize"
                />
                <View className="flex flex-col flex-1 p-1">
                  <Link
                    rel="noopener noreferrer"
                    href="#"
                    className="text-xs tracki uppercase hover:underline dark:text-default-400"
                  >
                    Convenire
                  </Link>
                  <Text className="flex-1 py-2 text-lg font-semibold ">
                    Te nulla oportere reprimique his dolorum
                  </Text>
                  <View className="flex flex-wrap justify-between pt-3 text-xs ">
                    <Text>June 1, 2020</Text>
                    <Text>2.1K views</Text>
                  </View>
                </View>
              </View>
            </View> */}
          </View>
          {/* top news */}
          <View className=" mb-16">
            <Text className="py-1 text-xl font-bold">Top News</Text>
              {
                topNews && topNews.map((item, index) => (
                    <View className="flex flex-col " key={index}>
                      <Image
                        alt=""
                        className="object-cover w-full h-52 object-top rounded-t"
                        source={{ uri: item.blogimage }}
                        resizeMode="contain"
                        resizeMethod="resize"
                      />
                      <View className="flex flex-col flex-1 p-1">
                        <Text
                          
                          className="text-xs w-fit  uppercase hover:underline text-green-400 bg-slate-200 rounded-full"
                        >
                          {item.category}
                        </Text>
                        <Text className="flex-1 py-2 text-lg font-semibold ">{item.title}</Text>
                        <View className="flex flex-wrap justify-between pt-3 text-xs ">
                          <Text>{item.date}</Text>
                          <Text>{item.views}</Text>
                        </View>
                      </View>
                    </View>
                  ))
              }
          </View>

          {/* popular news */}
          <View className=" mb-16">
            <Text className="py-1 text-xl font-bold">Popular News</Text>
              {
                popular && popular.map((item, index) => (
                    <View className="flex flex-col " key={index}>
                      <Image
                        alt=""
                        className="object-cover w-full h-52 object-top rounded-t"
                        source={{ uri: item.blogimage }}
                        resizeMode="contain"
                        resizeMethod="resize"
                      />
                      <View className="flex flex-col flex-1 p-1">
                        <Text
                          
                          className="text-xs w-fit  uppercase hover:underline text-green-400 bg-slate-200 rounded-full"
                        >
                          {item.category}
                        </Text>
                        <Text className="flex-1 py-2 text-lg font-semibold ">{item.title}</Text>
                        <View className="flex flex-wrap justify-between pt-3 text-xs ">
                          <Text>{item.date}</Text>
                          <Text>{item.views}</Text>
                        </View>
                      </View>
                    </View>
                  ))
              }
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default HomeNews;
