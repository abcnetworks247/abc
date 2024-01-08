
import {Stack } from  "expo-router";
import { SafeAreaView } from "react-native";

export default function RootLayout( ){
   return<Stack>
    <Stack.Screen name="index" options={{ header: () => null , animation: "slide_from_left"} } />
    <Stack.Screen name="auth/signup/index" options={{ header: () => null , animation: "slide_from_left"} } />
    <Stack.Screen name="auth/signin/index" options={{ header: () => null , animation: "slide_from_left"} } />
    <Stack.Screen name="auth/recovery/index" options={{ header: () => null , animation: "slide_from_left"} } />
    <Stack.Screen name="auth/updatepassword/index" options={{ header: () => null , animation: "slide_from_left"} } />
    <Stack.Screen name="(dashboard)" options={{ header: () => null , animation: "slide_from_left"} } />

   </Stack> 
}