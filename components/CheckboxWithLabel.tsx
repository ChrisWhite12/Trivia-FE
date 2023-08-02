import { FC, PropsWithChildren } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Checkbox from 'expo-checkbox';

interface Props extends PropsWithChildren {
  checked: boolean,
  onChange: (value: boolean) => void;
}

const CheckboxWithLabel: FC<Props> = ({ children, checked, onChange }) => {

  return (
    <View style={styles.categoryContainer}>
      <Checkbox value={checked} onValueChange={onChange} />
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row'
  },
  text: {
    textAlign: 'center',
    padding: 5,
    color: 'white'
  }
});
export default CheckboxWithLabel