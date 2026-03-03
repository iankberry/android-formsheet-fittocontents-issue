import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FormSheet + fitToContents Repro</Text>
      <Text style={styles.subtitle}>
        Tap the button below to open a form sheet.{'\n'}
        On Android, the content will "blow out" off screen{'\n'}
        due to KeyboardAwareScrollView + autofocus.
      </Text>
      <Button
        title="Open FormSheet (Keyboard Bug)"
        onPress={() => navigation.navigate('FormSheet')}
      />
      <View style={styles.buttonSpacer} />
      <Text style={styles.subtitle}>
        Tap below to open a sheet that starts small{'\n'}
        and grows as rows are added. Tests whether{'\n'}
        fitToContents resizes when content grows.
      </Text>
      <Button
        title="Open FormSheet (Growing Content)"
        onPress={() => navigation.navigate('GrowingSheet')}
      />
    </View>
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
  buttonSpacer: {
    height: 24,
  },
});
