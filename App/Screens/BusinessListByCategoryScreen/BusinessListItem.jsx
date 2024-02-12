import { View, StyleSheet,Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function BusinessListItem({business, booking}) {
    const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.container}
      onPress={()=>navigation.push('business-detail',
      {
        business:business
      })
      }>
        <Image source={{uri:business?.images[0]?.url}} 
          style={styles.image}
        />
        <View style={styles.subContainer}>
              <Text style={{fontFamily:'Exo',fontSize:15,   color:Colors.GRAY}}>
                {business.contactPerson}</Text>
          <Text style={{fontFamily:'Exo-bold',fontSize:19}}>{business.name}</Text>

          {!booking?.id? <Text style={{fontFamily:'Exo'}}>
          <EvilIcons name="location" size={20} color={Colors.PRIMARY} />
          {business.address}</Text>
          :
          <Text style={[{
            padding:5,borderRadius:5,fontSize:14,
            alignSelf:'flex-start'},
            booking?.bookingStatus=='Completed'?
            {backgroundColor:Colors.LIGHT_GREEN,color:Colors.GREEN
            }:
            booking.bookingStatus=='Cancelled'?
            {backgroundColor:Colors.LIGHT_RED,color:Colors.RED}:
            {color:Colors.PRIMARY,
              backgroundColor:Colors.PRIMARY_LIGHT}]}>
                {booking?.bookingStatus}</Text>
          }

          {booking?.id?
          <Text style={{fontFamily:"Exo",
          color:Colors.GRAY,fontSize:16}}>
          <AntDesign name="calendar" size={24} color={Colors.PRIMARY} />
          {booking.date} at {booking.time}</Text>
          :null
          }
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.WHITE,
        borderRadius:15,
        padding:10,
        marginBottom:15,
        display:"flex",
        flexDirection:'row',
        gap:10,
        
    },
    subContainer:{
        display:'flex',
        gap:7,
    },
    image:{
        width:100,
        height:100,
        borderRadius:15,

    }
})