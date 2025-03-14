import { View, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
    iconname: string;   
    bg_color: string;
}

const CirclewithIcon = ({iconname, bg_color="#9B51E0"}:Props) => {
  return (
    <View style={{
      backgroundColor: bg_color,
    }} className={`w-11 h-11 rounded-full flex items-center justify-center`}>
      <Icon color={"#fff"} name={iconname} size={24}/>
    </View>
  )
}

export default CirclewithIcon