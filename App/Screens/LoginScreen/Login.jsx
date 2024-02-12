import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import * as WebBrowser from "expo-web-browser";
import React from 'react'
import Colors from '../../Utils/Colors'
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from '../../hooks/warmUpBrowser';


WebBrowser.maybeCompleteAuthSession();

export default function Login() {
    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
    const onPress = React.useCallback(async () => {
        try {
          const { createdSessionId, signIn, signUp, setActive } =
            await startOAuthFlow();
     
          if (createdSessionId) {
            setActive({ session: createdSessionId });
          } else {
            // Use signIn or signUp for next steps such as MFA
          }
        } catch (err) {
          console.error("OAuth error", err);
        }
      }, []);
    return (
        <View style={{ alignItems: 'center'  }}>
            <Image source={require('../../../assets/images/login.png')}
                style={styles.loginImage} />
            <View style={styles.subContainer}>
                <Text style={{ fontSize: 28, color: Colors.WHITE, textAlign: 'center' }} >
                    Let's Find
                    <Text style={{ fontWeight: 'bold' }} > Professional Cleaning and repair</Text> Service
                </Text>
                <Text style={{ fontSize: 18, color: Colors.WHITE, textAlign: 'center', marginTop: 20, }} >Best App to find services near you which deliver you a professional service</Text>
                <TouchableOpacity style={styles.button} 
                onPress={onPress} >
                    <Text style={{ textAlign: 'center', color: Colors.PRIMARY, fontSize: 18 }} >Let's Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    loginImage: {
        width: 230,
        height: 450,
        marginTop: 70,
        borderWidth: 4,
        borderColor: Colors.BLACK,
        borderRadius: 15,
    },
    subContainer: {
        width: '100%',
        backgroundColor: Colors.PRIMARY,
        height: '70%',
        marginTop: -20,
        padding: 20,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },
    button: {
        backgroundColor: Colors.WHITE, borderRadius: 99, padding: 20,
        marginTop: 40,
    }
})