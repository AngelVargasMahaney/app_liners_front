import { Stack } from 'expo-router';
import React from 'react';

const AuthLayout = () => (
	<Stack
		screenOptions={{
			headerShown: false,
			animation: "fade",     // Animación suave
		}}
	>
		<Stack.Screen name="login" />
	</Stack>
);

export default AuthLayout;