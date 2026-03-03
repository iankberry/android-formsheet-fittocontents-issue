import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import {
  KeyboardAwareScrollView,
} from 'react-native-keyboard-controller';

export function FormSheetScreen() {
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

const styles = StyleSheet.create({
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
