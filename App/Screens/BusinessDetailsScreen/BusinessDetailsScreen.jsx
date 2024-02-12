import { View, Text, StyleSheet, Image, TouchableOpacity, Modal ,ScrollView, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';
import { EvilIcons } from '@expo/vector-icons';
import BusinessPhotos from './BusinessPhotos';
import BusinessAboutMe from './BusinessAboutMe';
import BookingModal from './BookingModal';



export default function BusinessDetailsScreen() {
  const param = useRoute().params;
  const [business, setBusiness] = useState(param.business);
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
  }, [])
  const onMessageBtnClick =()=>{
    Linking.openURL('mailto:'+business?.email+"?subject=I am looking for your Service&body=Hi There,")
  }
  return (
    <View>
      <ScrollView style={{ height: '93%' }}>
        <TouchableOpacity style={styles.backBtnContainer} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={30} color="white"
          />
        </TouchableOpacity>
        <Image source={{ uri: business?.images[0]?.url }}
          style={{ width: '100%', height: 300 }}
        />
        {/* InfoContainer */}
        <View style={styles.infoContainer}>
          <Text style={{ fontFamily: 'Exo-bold', fontSize: 25 }} >{business?.name}</Text>
          <View style={styles.subContainer}>
            <Text style={{ fontFamily: 'Exo-bold', color: Colors.PRIMARY, fontSize: 20 }}>{business?.contactPerson}✨</Text>
            <Text style={{ fontFamily: 'Exo', color: Colors.PRIMARY, backgroundColor: Colors.PRIMARY_LIGHT, borderRadius: 5, padding: 5 }}>{business?.category.name}</Text>
          </View>
          <Text style={{ fontFamily: 'Exo', fontSize: 17, color: Colors.GRAY }}>
            <EvilIcons name="location" size={25} color={Colors.PRIMARY} />
            {business?.address}</Text>

          {/* Horizontal Line  */}
          <View style={{ borderWidth: 0.4, borderColor: Colors.GRAY, marginTop: 30, marginBottom: 20 }} >
          </View>

          {/*About Me */}
          <BusinessAboutMe business={business} />

          {/* Horizontal Line  */}
          <View style={{ borderWidth: 0.4, borderColor: Colors.GRAY, marginTop: 30, marginBottom: 20 }} >
          </View>
          <BusinessPhotos business={business} />
        </View>
      </ScrollView>
      <View style={{display:'flex',flexDirection:'row',
    margin:8,
    gap:8}}>
        <TouchableOpacity style={styles.mssgBtn}
        onPress={()=>onMessageBtnClick()}
        >
          <Text style={{textAlign:'center',fontSize:18,fontFamily:'Exo-medium'}}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setShowModal(true)} style={styles.bookBtn}>
          <Text style={{textAlign:'center',color:Colors.WHITE,fontSize:18,fontFamily:'Exo-medium'}}>Book Now</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType='slide'
        visible={showModal}
      >
        <BookingModal 
        businessId={business?.id} 
        hideModal={()=>setShowModal(false)} 
        />
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  backBtnContainer: {
    position: 'absolute',
    padding: 20,
    zIndex: 1,
  },
  infoContainer: {
    padding: 20,
    display: 'flex',
    gap: 7
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center'
  },
  mssgBtn: {
    borderColor: Colors.PRIMARY,
    borderWidth: 1,
    borderRadius: 99,
    backgroundColor:Colors.WHITE,
    padding:10,
    flex:1
  },
  bookBtn:{
    borderColor: Colors.WHITE,
    borderWidth: 1,
    borderRadius: 99,
    backgroundColor:Colors.PRIMARY,
    padding:10,
    flex:1
  }
})
