import { View, Text } from 'react-native'
import React from 'react'
import {Image} from 'expo-image'
export default function index() {
  return (
    <View>
      <Image source={require("../../assets/images/login.gif")} width="100" height="100" contentFit="contain"/>
    </View>
  )
}