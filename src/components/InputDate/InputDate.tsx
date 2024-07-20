import { useState } from 'react';
import { View, Platform, Text, TouchableOpacity } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FormatingDate } from '../../utils/FormatingDate';

// Type and Styles.
import styles from './InputDate.style';
import DateProps from '../../types/components/InputDate.types';



const InputDate: React.FC<DateProps> = ({ title, keyValue, onChangeForm, value }) => {

  const [dateWeb, setDateWeb] = useState('2026-08-22')
  
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [buttonTitle, setButtonTitle] = useState<string>(title);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const onDateWeb = (event: any) => {
    const dateFormWeb = event.target.value;

    onChangeForm(keyValue, dateFormWeb);
    setDateWeb(dateFormWeb)
  }

  const handleConfirm = (date: any) => {
    const dateFormat = FormatingDate(date);

    onChangeForm(keyValue, dateFormat);
    setButtonTitle(dateFormat);
    hideDatePicker();
  };

  return (
    <View>
      { Platform.OS == 'web' && (
        <input
          style={styles.inputWeb}
          type="date"
          value={dateWeb}
          onChange={onDateWeb}
        />
      )}
      { Platform.OS != 'web' && (
        <View>
          <TouchableOpacity
            style={styles.container}
            onPress={showDatePicker}
          >
            <Text
              style={styles.textInput}
            >
              {value || buttonTitle}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        
      )}
    </View>
  );
};

export default InputDate;