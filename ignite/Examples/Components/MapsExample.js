import React from 'react'
import { View } from 'react-native'
import ExamplesRegistry from '../../../App/Services/ExamplesRegistry'

// Example
ExamplesRegistry.addPluginExample('Maps', () =>
  <View
    style={{
      alignItems: 'center'
    }}>
  </View>
)
