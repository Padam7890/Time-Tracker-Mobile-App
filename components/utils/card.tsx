import { View, Text } from 'react-native'
import React from 'react'

interface Props {
  children: React.ReactNode;  
  className?: string;
}

const Card = ({children,className}:Props) => {
  return (
    <View  className={`bg-white rounded-l ${className}`}>
        {children}
    </View>
  )
}

export default Card