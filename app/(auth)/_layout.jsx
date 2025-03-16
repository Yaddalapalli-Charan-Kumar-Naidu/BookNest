import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function _layout() {
  return (
    <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name='index' options={{title:"Login"}}/>
        <Stack.Screen name='register' options={{title:"Register"}}/>
    </Stack>
  )
}