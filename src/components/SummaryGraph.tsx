import React from 'react'
import { View } from 'react-native'
import {
  VictoryLine,
  // VictoryAxis,
  VictoryChart,
  // VictoryLabel,
} from 'victory-native'

const SummaryGraph = ({}) => (
  <View>
    <VictoryChart domain={{ y: [0, 15] }}>
      <VictoryLine
        style={{
          data: { stroke: '#c43a31' },
          parent: { border: '1px solid #ccc' },
        }}
        data={[
          { x: '10월 29일', y: 2 },
          { x: '30일', y: 3 },
          { x: '31일', y: 5 },
          { x: '11월 1일', y: 4 },
          { x: '2일', y: 7 },
          { x: '3일', y: 9 },
          { x: '4일', y: 8 },
        ]}
      />
    </VictoryChart>
  </View>
)

export default SummaryGraph
