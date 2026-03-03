import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  KeyboardAwareScrollView,
  KeyboardProvider,
} from 'react-native-keyboard-controller';

type RootStackParamList = {
  Home: undefined;
  FormSheet: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FormSheet + fitToContents Repro</Text>
      <Text style={styles.subtitle}>
        Tap the button below to open a form sheet.{'\n'}
        On Android, the content will "blow out" off screen{'\n'}
        due to KeyboardAwareScrollView + autofocus.
      </Text>
      <Button
        title="Open FormSheet"
        onPress={() => navigation.navigate('FormSheet')}
      />
    </View>
  );
}

function FormSheetScreen() {
  return (
    <KeyboardAwareScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
    >
      <Text style={styles.formTitle}>Form Sheet Content</Text>

      {/* Autofocus input - triggers the bug on Android */}
      <Text style={styles.label}>Auto-focused Input (triggers bug)</Text>
      <TextInput
        style={styles.input}
        placeholder="This input has autoFocus"
        autoFocus
      />

      {/* Generate enough fields to exceed screen height */}
      {Array.from({ length: 10 }, (_, i) => (
        <View key={i}>
          <Text style={styles.label}>Field {i + 1}</Text>
          <TextInput
            style={styles.input}
            placeholder={`Enter value for field ${i + 1}`}
          />
        </View>
      ))}

      <View style={styles.spacer} />
    </KeyboardAwareScrollView>
  );
}

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
            </Stack.Navigator>
          </NavigationContainer>
        </KeyboardProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 12,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  spacer: {
    height: 40,
  },
});
