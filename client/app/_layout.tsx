import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { View } from 'react-native';
import OnBoarding from './(routes)/onboarding';
import { ToastProvider } from 'react-native-toast-notifications';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <ToastProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='index' />
        <Stack.Screen name='(routes)/welcome-intro/index' />
        <Stack.Screen name='(routes)/auth/login/index' />
        <Stack.Screen name='(routes)/auth/forgot-password/index' />
        <Stack.Screen name='(routes)/auth/sign-up/index' />
        <Stack.Screen name='(routes)/auth/verify-account/index' />
        <Stack.Screen
          name="(routes)/profile-details/index"
          options={{
            headerShown: true,
            title: "Detai Profil",
            headerBackTitle: "Kembali",
          }}
        />
        <Stack.Screen
          name='(routes)/course-details/index'
          options={{
            headerShown: true,
            title: "Detail Learning",
            headerBackTitle: "Kembali"
          }}
        />
        <Stack.Screen
          name="(routes)/enrolled-courses/index"
          options={{
            headerShown: true,
            title: "Enrolled Learning",
            headerBackTitle: "Kembali",
          }}
        />
      </Stack>
    </ToastProvider>
  );
}
