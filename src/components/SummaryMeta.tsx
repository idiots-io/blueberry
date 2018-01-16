import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { subColor, fontColor } from '../config'

const SummaryMeta = ({
  todosCount,
  blueberriesCount,
}: {
  todosCount: number
  blueberriesCount: number
  totalTime?: string
}) => (
  <View style={{ height: 125 }}>
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Image source={require('../assets/Summary/sectionFace.png')} />
    </View>
    <View
      style={{
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: subColor.dark,
        borderBottomColor: subColor.dark,
        borderBottomWidth: 1,
        marginRight: 24,
        marginLeft: 24,
        paddingTop: 16,
        paddingBottom: 24,
      }}
    >
      <View style={styles.itemWrapper}>
        <Text style={styles.valueText}>{blueberriesCount}</Text>
        <Text style={styles.labelText}>블루베리</Text>
      </View>
      <View style={styles.itemWrapper}>
        <Text style={styles.valueText}>{todosCount}</Text>
        <Text style={styles.labelText}>완료</Text>
      </View>
      <View style={styles.totalTimeWrapper}>
        <Text style={styles.totalTimeText}>99시간</Text>
        <Text style={styles.totalTimeText}>40분</Text>
      </View>
    </View>
  </View>
)

const styles = StyleSheet.create({
  itemWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    // flexGrow: 1,
    width: '33%',
  },
  totalTimeWrapper: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    // flexGrow: 1,
    width: '33%',
  },
  valueText: {
    fontSize: 20,
    color: fontColor.main,
  },
  labelText: {
    fontSize: 16,
    color: fontColor.main,
  },
  totalTimeText: {
    fontSize: 20,
    color: fontColor.main,
  },
})

export default SummaryMeta
