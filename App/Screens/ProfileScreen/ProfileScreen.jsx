import { View, Text, Image, FlatList, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import { SignedOut, useUser } from '@clerk/clerk-expo';
import Colors from '../../Utils/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useClerk } from '@clerk/clerk-expo';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const {user} = useUser();
  const {signOut} = useClerk();
  const profileMenu = [
    {
      id:1,
      name:'Home',
      icon:'home',
    },
    {
      id:2,
      name:'My Booking',
      icon:'bookmark-sharp',
    },
    {
      id:3,
      name:'Contact Us',
      icon:'mail',
    },
    {
      id:4,
      name:'Logout',
      icon:'log-out',
    }
  ]
  const openMail =()=>{
    Linking.openURL('mailto:azoy8828@gmail.com?subject=I%20am%20looking%20for%20your%20Service')
  }
  const handleLogout = async ()=>{
    try{
      await signOut();
      navigation.reset({
        index:0,
        routes:[{name:'Home'}]
      })
    } catch (err){
      console.error("Error", err);
    }
  }
  const handleIconClick = (index) => {
    // Add separate functionality for each icon
    switch (index) {
      case 0:
        navigation.navigate('home');
        break;
      case 1:
        navigation.navigate('booking');
        break;
      case 2:
        openMail();
        break;
      case 3:
        handleLogout();
        break;
      default:
        break;
    }
  };
  return (
    <View>
      <View style={{padding:20,paddingTop:30,backgroundColor:Colors.PRIMARY,borderBottomEndRadius:30,borderBottomLeftRadius:30}}>
        <Text style={{fontSize:30,fontFamily:'Exo-bold',color:Colors.WHITE}}>Profile</Text>
        <View style={{
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          padding:20,
          backgroundColor:Colors.PRIMARY
        }}>
          <Image source={{uri:user.imageUrl}} 
          style={{height:90,width:90,borderRadius:99}}
          />
          <Text style={{fontFamily:'Exo-medium',fontSize:26,color:Colors.PRIMARY_LIGHT, marginTop:8}}>{user.fullName}</Text>
          <Text style={{fontFamily:'Exo-medium',fontSize:18,color:Colors.WHITE, marginTop:8}}>{user?.primaryEmailAddress.emailAddress}</Text>
        </View>
      </View>

      <View style={{paddingTop:60,}}>
        <FlatList 
          data={profileMenu}
          renderItem={({item,index})=>(
            <TouchableOpacity style={{display:'flex',
              flexDirection:'row',
              alignItems:'center',
              gap:10,
              marginBottom:40,
              paddingHorizontal:80
            }}
            onPress={()=>handleIconClick(index)}
            >
              <Ionicons name={item.icon} size={35} color={Colors.PRIMARY} />
              <Text style={{fontFamily:'Exo',fontSize:20}}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  )
}