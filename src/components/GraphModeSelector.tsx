import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { fontColor, subColor } from '../config'
import LinearGradient from 'react-native-linear-gradient'

const ModeItem = ({
  label,
  onPress,
  isFirst = false,
  isLast = false,
  isActive = false,
}) => (
  <LinearGradient
    colors={
      isActive ? ['rgb(55, 127, 216)', 'rgb(69, 81, 246)'] : ['transparent']
    }
    start={{ x: 0, y: 0.5 }}
    style={{
      flex: 1,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
      borderColor: subColor.dark,
      borderWidth: isActive ? 0 : 1,
      // borderRadius: 50,
      borderTopLeftRadius: isFirst ? 50 : 0,
      borderBottomLeftRadius: isFirst ? 50 : 0,
      borderTopRightRadius: isLast ? 50 : 0,
      borderBottomRightRadius: isLast ? 50 : 0,
    }}>
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
      }}>
      <Text
        style={{
          fontSize: 14,
          color: isActive ? 'white' : fontColor.sub,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  </LinearGradient>
)
const GraphModeSelector = ({
  selectedMode = 'day',
  onSelectDay,
  onSelectWeek,
  onSelectMonth,
}) => (
  <View
    style={{
      flexDirection: 'row',
      height: 36,
      marginTop: 24,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 30,
    }}>
    <ModeItem
      onPress={onSelectDay}
      isActive={selectedMode === 'day'}
      label="일간"
      isFirst
    />
    <ModeItem
      onPress={onSelectWeek}
      isActive={selectedMode === 'week'}
      label="주간"
    />
    <ModeItem
      onPress={onSelectMonth}
      isActive={selectedMode === 'month'}
      label="월간"
      isLast
    />
  </View>
)

export default GraphModeSelector
