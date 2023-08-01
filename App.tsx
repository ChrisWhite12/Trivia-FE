import { StackView, createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SigninScreen from './screens/SigninScreen';
import MainScreen from './screens/MainScreen';
import CreateRoomScreen from './screens/CreateRoomScreen';
import JoinScreen from './screens/JoinScreen';
import GameScreen from './screens/GameScreen';
import QAListScreen from './screens/QAListScreen';
import CreateQAScreen from './screens/CreateQAScreen';
import QADetailScreen from './screens/QADetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='SigninScreen' component={SigninScreen} />
        <Stack.Screen name='MainScreen' component={MainScreen} />
        <Stack.Screen name='CreateGame' component={CreateRoomScreen} />
        <Stack.Screen name='JoinGame' component={JoinScreen} />
        <Stack.Screen name='GameScreen' component={GameScreen} />
        <Stack.Screen name='QuestionList' component={QAListScreen} />
        <Stack.Screen name='QuestionCreate' component={CreateQAScreen} />
        <Stack.Screen name='QuestionDetail' component={QADetailScreen} />
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
