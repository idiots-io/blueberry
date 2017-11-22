import React from 'react'
import { Picker } from 'react-native'

const SettingPicker = ({ time, select, updateTime }) => (
  <Picker selectedValue={select} onValueChange={updateTime}>
    {time.map(time => <Picker.Item label={time} value={time} />)}
  </Picker>
)

export default SettingPicker
