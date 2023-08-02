import { FC, PropsWithChildren } from 'react'
import { View, StyleSheet, Pressable, Text } from 'react-native'

interface Props extends PropsWithChildren {
  onPress: () => void;
}

const CustomButton: FC<Props> = ({ children, onPress }) => {

  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CCCCDD',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  text: {
    textAlign: 'center'
  }
});
export default CustomButton