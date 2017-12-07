import React from 'react'
import { View, TouchableOpacity, Text, ImageBackground } from 'react-native'
import { fontColor /*subColor*/ } from '../config'

const btnImages = {
  dailyBtn: {
    active: require('../assets/Summary/dailyBtnActive.png'),
    default: require('../assets/Summary/dailyBtnDefault.png'),
  },
  weekBtn: {
    active: require('../assets/Summary/weekBtnActive.png'),
    default: require('../assets/Summary/weekBtnDefault.png'),
  },
  monthBtn: {
    active: require('../assets/Summary/monthBtnActive.png'),
    default: require('../assets/Summary/monthBtnDefault.png'),
  },
}

const ModeItem = ({ label, onPress, isActive = false }) => {
  let bgImage
  if (label === '일간' && isActive) {
    bgImage = btnImages.dailyBtn.active
  } else if (label === '일간' && !isActive) {
    bgImage = btnImages.dailyBtn.default
  } else if (label === '주간' && isActive) {
    bgImage = btnImages.weekBtn.active
  } else if (label === '주간' && !isActive) {
    bgImage = btnImages.weekBtn.default
  } else if (label === '월간' && isActive) {
    bgImage = btnImages.monthBtn.active
  } else if (label === '월간' && !isActive) {
    bgImage = btnImages.monthBtn.default
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        flexDirection: 'row',
        height: '100%',
      }}
      activeOpacity={0.8}>
      <ImageBackground
        source={bgImage}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 14,
            color: isActive ? 'white' : fontColor.sub,
          }}>
          {label}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  )
}

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
      backgroundColor: 'transparent',
    }}>
    <ModeItem
      onPress={onSelectDay}
      isActive={selectedMode === 'day'}
      label="일간"
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
    />
  </View>
)

export default GraphModeSelector
