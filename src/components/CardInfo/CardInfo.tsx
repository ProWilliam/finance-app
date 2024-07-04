import React, { useState } from 'react';
import { Image ,View, Text, TouchableOpacity } from 'react-native';

// Hook and Components
import useAppNavigation from '../../hooks/useAppNavigation';
import IconClose from '../../assets/icons/IconClose';
import RowText from '../../components/RowText/RowText';

// Style and Types
import styles from './CardInfo.styles';
import CardInfoProps from '../../types/components/CardInfo.types'

const CardInfo: React.FC<CardInfoProps> = ({id, infoText, name, description, logo, dataRelease, dataRevision}) => {

  const [route, setRoute] = useState('');
  const { appNavigation } = useAppNavigation();

  appNavigation(route)
  
  const goBack = () => {
    setRoute('home');
  }

  return(
    <View style={styles.containerCard}>
      <View style={styles.titleCard}>
        <View>
          <Text style={styles.textTitle}>ID:{id}</Text>
          <Text>{infoText}</Text>
        </View>
        <TouchableOpacity
          onPress={goBack}
        >
          <IconClose style={styles.iconCard}/>
        </TouchableOpacity>
      </View>
      <View style={styles.bodyCard}>
        <RowText title='Nombre:'>{name}</RowText>
        <RowText title='Description:'>{description}</RowText>
        <View style={styles.sectionLogo}>
          <Text>Logo:</Text>
          <Image style={styles.imageCard} source={{ uri: logo }} />
        </View>
        <RowText title='Fecha liberación:'>{dataRelease.toDateString()}</RowText>
        <RowText title='Fecha revisión:'>{dataRevision.toDateString()}</RowText>  
      </View>
    </View>
  )
}
export default CardInfo;