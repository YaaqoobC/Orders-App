import { View, Text, StyleSheet } from 'react-native'
import { Colors } from '@/constants/Colors'
import React from 'react'

const app = () => {
  return (
    <View>
      <Text style={styles.title}>APP</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    color: Colors.accentColor.color,
    fontSize: 200,
    textAlign: 'center'
  }
})

export default app