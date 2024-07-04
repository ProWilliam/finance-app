import React from 'react'
import { View, Text } from 'react-native'

// Styles and Types
import styles from './RowText.styles'
import RowTextProps from '../../types/components/RowText.types';


const StyledText: React.FC<RowTextProps> = ({ title, children}) => {
  
  return (
    <View style={styles.rowInfo}>
      <Text testID='title-text' style={styles.text}>{title}</Text>
      <Text testID='content-text' style={styles.text}>{children}</Text>
    </View>
  )
}
export default StyledText;
