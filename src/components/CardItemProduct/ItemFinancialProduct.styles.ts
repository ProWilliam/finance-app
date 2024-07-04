import React from 'react';
import { StyleSheet } from 'react-native';

import theme from '../../theme/theme';

const StylesItemFinancial = StyleSheet.create({
  containerItem: {
    padding: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  text: {
    marginBottom: 2,
    fontSize: theme.size.fontSmaller,
    backgroundColor: theme.light.primary,
  },
  textId:{
    fontSize: theme.size.fontSmaller,
    color: theme.light.quintary,
  },
  icon: {
    marginTop: 5,
    fontSize: theme.size.iconMedium,
    color: theme.light.tertiary,
  }
})

export default StylesItemFinancial;
