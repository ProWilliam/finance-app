import React from 'react';
import { View, Text } from 'react-native';

// Component
import IconBank from '../../assets/icons/IconBank';

// Styles
import styles from './Header.styles';


const Header = () => {
  return(
    <View style={styles.container}>
      <IconBank style={styles.icon} />
      <Text style={styles.title}>
        Banco
      </Text>
    </View>
  )
}
export default Header;