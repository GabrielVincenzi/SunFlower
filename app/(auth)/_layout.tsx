import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function Layout() {
    return (
        <>
            <StatusBar hidden={true} />
            <Stack>
                <Stack.Screen name="welcome" options={{ headerShown: false }} />
                <Stack.Screen name="sign-up" options={{ headerShown: false }} />
                <Stack.Screen name="sign-in" options={{ headerShown: false }} />
            </Stack>
        </>
    )
}
