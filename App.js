import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from 'expo-font';
import Login from "./App/Screens/LoginScreen/Login";
import { ClerkProvider ,SignedIn, SignedOut} from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from "./App/Navigations/TabNavigation";

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function App() {
  const [fontsLoaded] = useFonts({
    'Exo': require('./assets/fonts/Exo2-Regular.ttf'),
    'Exo-medium': require('./assets/fonts/Exo2-Medium.ttf'),
    'Exo-bold': require('./assets/fonts/Exo2-Bold.ttf'),
  });

  return (
    <ClerkProvider 
    tokenCache={tokenCache}
    publishableKey="pk_test_cHJvbXB0LXRpZ2VyLTk1LmNsZXJrLmFjY291bnRzLmRldiQ">
      <View style={styles.container}>
        {/* SingIn Component */}
        <SignedIn>
          <NavigationContainer>
            <TabNavigation/>
          </NavigationContainer>
        </SignedIn>
        {/* SignOut Component */}
        <SignedOut>
          <Login />
        </SignedOut>
        <StatusBar style="auto" />
      </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop:25,
  },
});
