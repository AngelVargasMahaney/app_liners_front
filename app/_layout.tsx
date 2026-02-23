import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack 
    screenOptions={{
      headerShown:false
    }}
    >
      {/* Muestra login primero */}
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      {/* <Stack.Screen name="(screens)" options={{ headerShown: false }} />
      <Stack.Screen name="(auditoria)" options={{ headerShown: false }} />
      <Stack.Screen name="(admin)" options={{ headerShown: false }} />
      <Stack.Screen name="(users)" options={{ headerShown: false }} />
      <Stack.Screen name="(reports)" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
