import { FC } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface Props {
  icon: string;
  size: number;
  color: string;
  onPress: () => void;
}

const IconButton: FC<Props> = ({ icon, color, onPress, size }) => {

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => pressed && styles.pressed}
    >
      <View>
        <Ionicons name={icon as any} color={color} size={size} />
      </View>
    </Pressable>
  );
};

export default IconButton

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    margin: 10,
  },
  pressed: {
    opacity: 0.75
  }
});