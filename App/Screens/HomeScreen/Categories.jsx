import { View, Text, FlatList, Image,TouchableOpacity , StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../../Utils/GlobalApi'
import Heading from '../../Components/Heading';
import Colors from '../../Utils/Colors';
import { useNavigation } from '@react-navigation/native';

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const navigation = useNavigation();
    useEffect(()=>{
        getCategories();
    },[])
    const getCategories =()=>{
        GlobalApi.getCategories().then(resp=>{
            setCategories(resp?.categories)
        })
    }
  return (
    <View style={{marginTop:10}}>
      <Heading text={'Categories'} 
      isViewAll={true}/>
      <FlatList 
        data={categories}
        numColumns={4}
        renderItem={({item,index})=>(
            <TouchableOpacity style={styles.container}
            onPress={()=>navigation.push('business-list',{
                category:item.name
                })}>
                <View style={styles.iconContainer}>
                    <Image source={{uri:item?.icon?.url}} 
                    style={{width:30,height:30}}/>
                    
                </View>
                <Text style={{marginTop:10,fontFamily:'Exo-bold'}}>{item.name}</Text>
            </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },
    iconContainer:{
        backgroundColor:Colors.LIGHT_GRAY,
        padding:17,
        borderRadius:99,
    }
})