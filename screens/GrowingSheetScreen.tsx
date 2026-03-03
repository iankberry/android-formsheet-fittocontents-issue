import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { FieldGroup } from '../FieldGroup';

export function GrowingSheetScreen() {
  const [rowCount, setRowCount] = useState(3);

  const fields = Array.from({ length: rowCount }, (_, i) => (
    <View style={styles.row}>
      <Text style={styles.rowText}>Row {i + 1}</Text>
    </View>
  ));

  return (
    <View style={styles.growingContent}>
      <FieldGroup fields={fields} animateHeight />
      <View style={styles.addRowButton}>
        <Button title="Add Row" onPress={() => setRowCount((c) => c + 1)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  growingContent: {
    padding: 20,
  },
  row: {
    paddingVertical: 14,
  },
  rowText: {
    fontSize: 16,
    color: '#333',
  },
  addRowButton: {
    marginTop: 16,
  },
});
