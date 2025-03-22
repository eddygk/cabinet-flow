import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Placeholder screens - to be implemented
const HomeScreen = () => null;
const ScannerScreen = () => null;
const FileViewerScreen = () => null;
const SettingsScreen = () => null;

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'CabinetFlow' }} />
        <Stack.Screen name="Scanner" component={ScannerScreen} options={{ title: 'Scan QR Code' }} />
        <Stack.Screen name="FileViewer" component={FileViewerScreen} options={{ title: 'File Viewer' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
