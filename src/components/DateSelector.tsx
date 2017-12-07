import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { fontColor } from '../config'
/*
 * DateSelector 
 * 수동적으로 값을 받아서 표시만 하는 Component
 * 날짜 이동 제한이나 각각의 Left, Right 버튼을 눌렀을 때의
 * Behavior는 상위에서 관리한다 
 */
const DateSelector = ({
  currentDate,
  onNextDayClick,
  onPrevDayClick,
  selectedMode,
}: {
  currentDate?: string
  onNextDayClick?: any
  onPrevDayClick?: any
  selectedMode: string
}) => {
  let displayedDate = currentDate
  if (selectedMode === 'date') {
    displayedDate = currentDate
  }
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={onPrevDayClick}>
          <Image source={require('../assets/Summary/arrowLeft.png')} />
        </TouchableOpacity>
        <View
          style={{
            marginHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: fontColor.darkNavy,
              fontSize: 16,
              letterSpacing: 1.2,
            }}>
            {displayedDate}
          </Text>
        </View>
        <TouchableOpacity onPress={onNextDayClick}>
          <Image source={require('../assets/Summary/arrowRight.png')} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default DateSelector
