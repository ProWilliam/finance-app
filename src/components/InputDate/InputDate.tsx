import { useState } from 'react';
import { View, Button } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

// Type
import DateProps from '../../types/components/InputDate.types';

const InputDate: React.FC<DateProps> = ({ title, keyValue, onChangeForm, value }) => {
  const [date, setDate] = useState(new Date());

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [buttonTitle, setButtonTitle] = useState<string>(title);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');

    const dateFormat = `${year}-${month}-${day}`;

    onChangeForm(keyValue, dateFormat);
    setButtonTitle(dateFormat);
    hideDatePicker();
  };

  return (
    <View>
      <Button title={ value || buttonTitle} onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default InputDate;