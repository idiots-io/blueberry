import React from 'react'
import { View, Dimensions } from 'react-native'
import {
  VictoryLine,
  VictoryAxis,
  VictoryChart,
  VictoryBar,
  VictoryScatter,
  // VictoryLabel,
} from 'victory-native'
import moment from 'moment'

const SummaryGraph = ({
  mode = 'day',
}: // currentDate,
{
  mode: string
  currentDate: any
}) => {
  let xAxisLabels: any = [6, 5, 4, 3, 2, 1, 0]

  if (mode === 'day') {
    xAxisLabels = xAxisLabels.map(gap =>
      moment()
        .subtract(gap, 'days')
        .format('DD'),
    )
  } else if (mode === 'week') {
    xAxisLabels = xAxisLabels.map(gap =>
      moment()
        .subtract(gap, 'weeks')
        .format('DD'),
    )
  } else if (mode === 'month') {
    xAxisLabels = xAxisLabels.map(gap =>
      moment()
        .subtract(gap, 'months')
        .format('MM'),
    )
  }

  let yAxisValues = [2, 9, 7, 12, 3, 4, 11]

  return (
    <View>
      <VictoryChart
        animate={{ duration: 500 }}
        width={Dimensions.get('window').width * 1.05}
        padding={{
          top: 50,
          left: 30,
          right: 50,
          bottom: 50,
        }}>
        <VictoryAxis
          style={{
            axis: { stroke: 'rgb(239, 243, 248)' }, // grid: { stroke: 'rgb(239, 243, 248)' },
            tickLabels: {
              // fill: 'rgb(168, 183, 199)',
              padding: -8,
              fontSize: 12,
            },
          }}
        />
        <VictoryAxis
          dependentAxis
          domain={[0, 15]}
          tickCount={4}
          style={{
            axis: { stroke: 'transparent' },
            grid: { stroke: 'rgb(239, 243, 248)' },
            ticks: { stroke: 'rgb(239, 243, 248)', size: 0 },
            tickLabels: {
              fill: 'rgb(168, 183, 199)',
              padding: 0,
              fontSize: 12,
            },
          }}
        />
        <VictoryLine
          style={{
            data: { stroke: 'rgb(55, 127, 216)' },
            parent: { border: '1px solid #ccc' },
          }}
          data={xAxisLabels.map((label, i) => ({
            x: label,
            y: yAxisValues[i],
          }))}
        />
        <VictoryBar
          style={{ data: { fill: 'rgba(55, 127, 216, 0.2)', width: 20 } }}
          data={[{ x: xAxisLabels[6], y: 15 }]}
        />
        <VictoryScatter
          style={{
            data: {
              fill: 'white',
              stroke: 'rgb(55, 127, 216)',
              strokeWidth: 2,
            },
          }}
          size={4}
          data={[{ x: xAxisLabels[6], y: yAxisValues[6] }]}
        />
      </VictoryChart>
    </View>
  )
}

export default SummaryGraph
