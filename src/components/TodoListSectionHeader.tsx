import React from 'react'
import { subColor, fontColor } from '../config'
import Hr from './Hr'

const TodoListSectionHeader = ({ date }) => (
  <Hr
    text={`${date}`}
    hrStyle={{
      backgroundColor: 'white',
      justifyContent: 'flex-end'
    }}
    textWrapperStyle={{
      // backgroundColor: 'white',
      borderColor: subColor.dark,
      borderRadius: 100,
      borderWidth: 1,
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
      height: 1,
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
