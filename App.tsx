import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { RootStackParamList } from './src/navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import List from './src/navigation/screens/List';
import Detail from './src/navigation/screens/Detail';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" component={List} />
            <Stack.Screen name="Detail" component={Detail} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}
