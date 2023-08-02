import { StackView, createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SigninScreen from './screens/SigninScreen';
import MainScreen from './screens/MainScreen';
import CreateRoomScreen from './screens/game/CreateRoomScreen';
import JoinScreen from './screens/game/JoinScreen';
import GameScreen from './screens/game/GameScreen';
import QAListScreen from './screens/questions/QAListScreen';
import CreateQAScreen from './screens/questions/CreateQAScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name='SigninScreen' component={SigninScreen} />
        <Stack.Screen options={{ headerShown: false }} name='MainScreen' component={MainScreen} />
        <Stack.Screen options={{ headerShown: false }} name='CreateGame' component={CreateRoomScreen} />
        <Stack.Screen options={{ headerShown: false }} name='JoinGame' component={JoinScreen} />
        <Stack.Screen options={{ headerShown: false }} name='GameScreen' component={GameScreen} />
        <Stack.Screen options={{ headerShown: false }} name='QuestionList' component={QAListScreen} />
        <Stack.Screen options={{ headerShown: false }} name='QuestionCreate' component={CreateQAScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
