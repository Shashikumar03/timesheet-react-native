import { useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

export default function Index() {
  const { isLoaded, isSignedIn } = useUser();

  // If user is not loaded yet, show nothing or a loading screen
  if (!isLoaded) {
    return null; // You can show a loading screen here
  }

  // Redirect based on authentication status
  return (
    <Redirect href={isSignedIn ? '/Home' : '/Login'} />
  );
}
