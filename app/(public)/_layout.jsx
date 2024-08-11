import React from 'react';
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

const PublicLayout = () => {
  const { isSignedIn } = useAuth()
  // useAuth
console.log("isLoggedIn",isSignedIn)
console.log("aman chain")
  if (isSignedIn) {
    return <Redirect href={'/Home'} />
    // <Redirect
  }
  // if (!isSignedIn) {
  //   return <Redirect href={'/Login'} />
  //   // <Redirect
  // }
  // if(!isSignedIn){
  //   return <Redirect href={'/Login'}/>
  // }
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6c47ff',
        },
        headerTintColor: '#fff',
        headerBackTitle: 'Back',
      }}>
      <Stack.Screen
        name="Login"
        options={{
          headerTitle: 'Login Here',
        }}></Stack.Screen>
      <Stack.Screen
        name="Register"
        options={{
          headerTitle: 'Create Account',
        }}></Stack.Screen>
      <Stack.Screen
        name="Reset"
        options={{
          headerTitle: 'Reset Password',
        }}></Stack.Screen>
    </Stack>
  );
};

export default PublicLayout;
