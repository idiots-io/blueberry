import React from 'react'
import { subColor, fontColor } from '../config'
import Hr from './Hr'

const TodoListSectionHeader = ({ date, dayOfWeek = '화요일' }) => (
  <Hr
    text={`${date} ${dayOfWeek}`}
    hrStyle={{
      backgroundColor: 'white',
      justifyContent: 'flex-end'
    }}
    textWrapperStyle={{
      backgroundColor: subColor.dark,
      borderRadius: 100,
      padding: 4,
      // flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-start'
    }}
    textStyle={{
      fontSize: 12,
      color: fontColor.dark,
      letterSpacing: 0.5
    }}
    lineStyle={{
      height: 2,
      backgroundColor: subColor.dark
    }}
    leadingLineStyle={{
      width: 10
    }}
    trailingLineStyle={{
      flex: 1
    }}
  />
)

export default TodoListSectionHeader
