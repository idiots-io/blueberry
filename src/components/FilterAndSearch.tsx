import React from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import { fontColor, subColor, fontFamily } from '../config'

const FilterAndSearch = ({ selectedTab = 'todo', isSearchMode = false }) => (
  <View style={styles.filterAndSearchWrapper}>
    <View style={styles.btnWrapper}>
      <TouchableOpacity>
        <Text
          style={
            selectedTab === 'todo'
              ? styles.selectedTabText
              : styles.defaultTabText
          }>
          해야 할 일
        </Text>
        <View
          style={{
            marginTop: 3,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          {selectedTab === 'todo' ? (
            <Image
              source={require('../assets/Global/select_circle.png')}
            />
          ) : undefined}
        </View>
      </TouchableOpacity>
    </View>
    <View style={styles.btnWrapper}>
      <TouchableOpacity>
        <Text
          style={
            selectedTab === 'completed'
              ? styles.selectedTabText
              : styles.defaultTabText
          }>
          완료한 작업
        </Text>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {selectedTab === 'completed' ? (
            <Image
              source={require('../assets/Global/select_circle.png')}
            />
          ) : undefined}
        </View>
      </TouchableOpacity>
    </View>
    <TouchableOpacity style={styles.searchBtnWrapper}>
      <Image source={require('../assets/Todo/search.png')} />
      {isSearchMode}
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  filterAndSearchWrapper: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowColor: 'gray',
    shadowOffset: { height: 10, width: 0 },
    zIndex: 10
  },
  selectedTabText: {
    color: fontColor.blue,
    fontFamily: fontFamily.regular,
    marginBottom: 5,
  },
  defaultTabText: {
    color: fontColor.main,
    fontFamily: fontFamily.light,
  },
  btnWrapper: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: subColor.dark,
    height: 30
  },
  searchBtnWrapper: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default FilterAndSearch
