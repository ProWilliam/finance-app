import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import theme from '../../theme/theme';

const StyleHeader = StyleSheet.create({
  container: {
    width: `${theme.withScreen.big}%`,
    borderBottomWidth: 2, 
    paddingBottom: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
    borderBottomColor: theme.light.border,
    backgroundColor: theme.light.backgroundPrimary, 

  },
  icon: {
    marginRight: 10,
    color: theme.light.icon,
    fontSize: theme.size.iconMedium,
  },
  title: {
    fontSize: theme.size.fontMedium,
    fontWeight: 'bold',
    justifyContent: 'flex-start'
  }
});

export default StyleHeader;