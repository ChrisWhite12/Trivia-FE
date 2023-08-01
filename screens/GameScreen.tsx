import { FC } from 'react'
import { View, StyleSheet, Text } from 'react-native'

interface Props {

}

const GameScreen: FC<Props> = ({}) => {
  
  return (
    <View style={styles.screen}>
     <Text>Game Screen</Text>
    </View>
  );
};

// handle game state, load 10 questions

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
}
});
export default GameScreen