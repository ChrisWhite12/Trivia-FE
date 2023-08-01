import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FC } from 'react'
import { View, StyleSheet, Pressable, Text } from 'react-native'

interface Props {

}

const SigninScreen: FC<Props> = ({ }) => {
  const { navigate } = useNavigation<StackNavigationProp<any>>()

  return (
    <View style={styles.screen}>
      <View>
        <Pressable onPress={() => navigate('MainScreen')}>
          <Text>
            Sign In
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

// simple button
// oauth later

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    padding: 20,
  }
});
export default SigninScreen