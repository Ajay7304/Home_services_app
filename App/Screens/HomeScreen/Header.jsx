import { View, Text, StyleSheet, Image, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import Colors from '../../Utils/Colors';
import { FontAwesome } from '@expo/vector-icons';

export default function Header() {
    const { user, isLoading } = useUser();
    return user && (
        <View style={styles.container}>
            <View style={styles.profileMainContainer}>
                <View style={styles.profileContainer}>
                    <Image source={{ uri: user?.imageUrl }}
                        style={styles.userImage} />
                    <View>
                        <Text style={{ color: Colors.WHITE,fontFamily:'Exo' }}>Welcome,</Text>
                        <Text
                            style={{ color: Colors.WHITE, fontSize: 20 ,fontFamily:'Exo-bold'}}>{user?.fullName}</Text>
                    </View>
                </View>
                <FontAwesome name="bookmark-o" size={28} color="white" />
            </View>
            <View style={styles.searchBarContainer}>
                <TextInput placeholder='Search'
                    style={styles.textInput} />
                <FontAwesome name="search" size={24}        color={Colors.PRIMARY} 
                style={styles.searchBtn}/>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        padding: 20,
        backgroundColor: Colors.PRIMARY,
        borderBottomLeftRadius: 25,
        borderBottomEndRadius: 25,
    },
    profileMainContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    profileContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },
    searchBarContainer:{
        marginTop:15,
        display:"flex",
        flexDirection:'row',
        gap:10,
        marginBottom:10,
    },
    textInput:{
        backgroundColor:Colors.WHITE,
        borderRadius:8,
        padding:7,
        paddingHorizontal:16,
        width:'85%',
        fontSize:16,
        fontFamily:'Exo',
    },
    searchBtn:{
        backgroundColor:Colors.WHITE,
        borderRadius:8,
        padding:10,
    },
    userImage: {
        width: 45,
        height: 45,
        borderRadius: 45,
    }
})