import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { HomeScreen } from './screens/HomeScreen';
import { FormSheetScreen } from './screens/FormSheetScreen';
import { GrowingSheetScreen } from './screens/GrowingSheetScreen';

type RootStackParamList = {
  Home: undefined;
  FormSheet: undefined;
  GrowingSheet: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <KeyboardProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'Home' }}
              />
              <Stack.Screen
                name="FormSheet"
                component={FormSheetScreen}
                options={{
                  presentation: 'formSheet',
                  sheetAllowedDetents: 'fitToContents',
                  title: 'Form Sheet',
                }}
              />
              <Stack.Screen
                name="GrowingSheet"
                component={GrowingSheetScreen}
                options={{
                  presentation: 'formSheet',
                  sheetAllowedDetents: 'fitToContents',
                  title: 'Growing Sheet',
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </KeyboardProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
