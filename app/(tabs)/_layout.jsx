import { View, Text } from 'react-native'
import React from 'react'
import {Tabs} from "expo-router"
// import { Colors } from 'react-native/Libraries/NewAppScreen'
import Ionicons from '@expo/vector-icons/Ionicons';
import {Colors} from "./../../constants/Colors"

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
        headerShown:false,
        tabBarActiveTintColor:Colors.PRIMARY
    }}>
        <Tabs.Screen name='Home'
        options={{
            tabBarLabel:"Home",
            tabBarIcon:({colors})=><Ionicons name="home" size={24} color= {colors}/>
        }}/>
        <Tabs.Screen name='AddTask'
          options={{
            tabBarLabel:"Add Task",
            tabBarIcon:({colors})=><Ionicons name="clipboard" size={24} color={colors} />
        }}/>
        <Tabs.Screen name='Profile'
          options={{
            tabBarLabel:"Profile",
            tabBarIcon:({colors})=><Ionicons name="person" size={24} color={colors} />
        }}/>
        
    </Tabs>
  )
}