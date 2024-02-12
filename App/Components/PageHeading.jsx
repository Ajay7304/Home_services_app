import { View, Text ,TouchableOpacity} from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'

export default function PageHeading({title}) {
    const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity style={{display:'flex',flexDirection:'row',gap:10,alignItems:'center'}}
      onPress={()=>navigation.goBack()}>
      <Ionicons name="arrow-back-outline" size={30} color="black" />
      <Text style={{fontFamily:'Exo-bold',fontSize:27}}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}