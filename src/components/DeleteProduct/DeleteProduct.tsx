import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';

import styles from './DeleteProduct.styles';
import ButtonSubmit from '../Button/ButtonSubmit';
import DeletedProductProps from '../../types/components/DeletedProduct.types';
import config from '../../../app.config';

const DeleteProduct: React.FC<DeletedProductProps> = ({ visible, onConfirm, onCancel, info, id }) => {

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          <Text style={styles.alertTitle}>{`¿Estás seguro de eliminar el producto? \nNombre: ${info} \nId: ${id} ?`}</Text>
          <View style={styles.buttonContainer}>
            <ButtonSubmit title='Eliminar' color='deleted' press={onConfirm} navigationRoot={config.extra.rootHome}></ButtonSubmit>
            <ButtonSubmit title='Cancelar' color='edit' press={onCancel}></ButtonSubmit>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteProduct;