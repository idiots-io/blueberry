import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const DateSelector = ({
  currentDate,
  onNextDayClick,
  onPrevDayClick,
}: {
  currentDate?: string
  onNextDayClick?: any
  onPrevDayClick?: any
}) => (
  <View
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    }}>
    <View
      style={{
        flexDirection: 'row',
      }}>
      <TouchableOpacity onPress={onPrevDayClick}>
        <Text>{'<'}</Text>
      </TouchableOpacity>
      <Text>{currentDate}</Text>
      <TouchableOpacity onPress={onNextDayClick}>
        <Text>{'>'}</Text>
      </TouchableOpacity>
    </View>
  </View>
)

export default DateSelector
