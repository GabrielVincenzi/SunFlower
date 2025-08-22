import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

const HomeIndex = () => {
    const { isSignedIn } = useAuth();

    if (isSignedIn) {
        return <Redirect href="/(auth)/welcome" />
    }
    return <Redirect href="/(auth)/welcome" />
};

export default HomeIndex;

// <Redirect href="/(auth)/welcome" />