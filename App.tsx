import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { RootStackParamList } from './src/navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import List from './src/screens/List';
import Detail from './src/screens/Detail';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useStore from './src/store';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { shortsData } from './src/dummy';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Stack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

export default function App() {
  const { shortList, setShortList } = useStore();

  useEffect(() => {
    const loadShortList = async () => {
      const savedList = await AsyncStorage.getItem('shortList');

      if (savedList) {
        setShortList(JSON.parse(savedList));
      } else {
        setShortList(shortsData);
      }
    };

    loadShortList();
  }, [setShortList]);

  useEffect(() => {
    const saveShortList = async () => {
      await AsyncStorage.setItem('shortList', JSON.stringify(shortList));
    };

    saveShortList();
  }, [shortList]);

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
