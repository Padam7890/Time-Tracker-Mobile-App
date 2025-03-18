import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router';

const TaskDetails = () => {
  const {itemId} =useLocalSearchParams()
  console.log(itemId)
    return (
    <View>
      <Text>TaskDetails</Text>
    </View>
  )
}

export default TaskDetails