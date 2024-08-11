import { ClerkLoaded, ClerkProvider, } from "@clerk/clerk-expo";
import { useFonts } from "expo-font";
import { Link, Slot, Stack, useRouter } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
// import Login from "./aaa"

import * as SecureStore from 'expo-secure-store';
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;



const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};


export default function RootLayout() {

  
  // const [loaded, error] = useFonts({
  //   'outfit': require('./assets/fonts/Outfit-Regular.ttf'),
  //   'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf'),
  //   'outfit-light': require('./assets/fonts/Outfit-Light.ttf'),
  // });
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
      <SignedIn>
        <Stack screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SignedIn>
      <SignedOut>
      
      <Stack screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="(public)" />
        </Stack>
         

      </SignedOut>
      </ClerkLoaded>

    </ClerkProvider>

  );
}
const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});