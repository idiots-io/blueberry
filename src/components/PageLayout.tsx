import React from 'react'
import { View } from 'react-native'

const PageLayout = ({ statusBarBackgroundColor = 'transparent', children }) => (
  <View>
    {/* Status Bar */}
    <View style={{ height: 20, backgroundColor: statusBarBackgroundColor }} />
    {children}
  </View>
)

export default PageLayout
