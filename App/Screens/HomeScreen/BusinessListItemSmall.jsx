import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import { useNavigation } from '@react-navigation/native';

export default function BusinessListItemSmall({business}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={()=>navigation.push('business-detail',{business:business})} style={styles.container}>
      <Image source={{uri:business?.images[0]?.url}} 
        style={styles.images}
      />
      <View style={styles.infoContainer}>
      <Text style={{fontFamily:'Exo-bold',fontSize:17}}>{business?.name}</Text>
      <Text style={{fontFamily:'Exo',fontSize:13,color:Colors.GRAY}}>{business?.contactPerson} </Text>
      <Text style={{fontFamily:'Exo',fontSize:10, padding:3,color:Colors.PRIMARY,backgroundColor:Colors.PRIMARY_LIGHT,borderRadius:3,alignSelf:'flex-start',paddingHorizontal:7}} >{business?.category.name} </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        padding:10,
        borderRadius:10,
        backgroundColor:Colors.WHITE
    },
    infoContainer:{
        display:'flex',
        gap:3,
    },
    images:{
        width:160,
        height:100,
        borderRadius:10,
    }
})