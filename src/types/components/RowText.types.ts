import React from 'react';
import {TextProps} from 'react-native';

export default interface RowStylesText extends TextProps {
  children: React.ReactNode;
  title: string
} 