import { FC } from 'react'
import { View, StyleSheet } from 'react-native'

interface Props {

}

const RoomListScreen: FC<Props> = ({}) => {
  
  return (
    <View style={styles.screen}>
     
    </View>
  );
};

// list of rooms to join

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
}
});
export default RoomListScreen