import { View, Text, FlatList ,TextInput,TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, ToastAndroid} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import CalendarPicker from "react-native-calendar-picker";
import Colors from '../../Utils/Colors';
import Heading from '../../Components/Heading';
import GlobalApi from '../../Utils/GlobalApi';
import { useUser } from '@clerk/clerk-expo';
import moment, { isMoment } from 'moment';


export default function BookingModal({businessId,hideModal}) {
    const [timeList, setTimeList] = useState();
    const [selectedTime, setSelectedTime] = useState();
    const [selectedDate , setSelectedDate] = useState();
    const [note, setNote] = useState();
    const {user} = useUser();
    useEffect(()=>{
        getTime()
    },[])
    const getTime = ()=>{
        const timeList = [];
        for(let i=8; i<=12 ; i++){
            timeList.push({
                time:i+':00 AM'
            })
            timeList.push({
                time:i+':30 AM'
            })
        }
        for(let i=1; i<=7 ; i++){
            timeList.push({
                time:i+':00 PM'
            })
            timeList.push({
                time:i+':30 PM'
            })
        }
        setTimeList(timeList);
    }

    // Create Booking Method 
    const createNewBooking =()=>{
        if(!selectedDate || !selectedTime ){
            ToastAndroid.show('Please select Date and Time!', ToastAndroid.LONG)
            return;
        }
        const data ={
            userName:user.fullName,
            userEmail:user.primaryEmailAddress.emailAddress,
            date:moment(selectedDate).format('DD/MMM/YYYY'),
            time:selectedTime,
            businessId:businessId
        }
        GlobalApi.createBooking(data).then(resp=>{
            console.log("resp", resp)
            ToastAndroid.show('Booking Created Successfully!', ToastAndroid.LONG)
            hideModal()
        })
    }

  return (
    <ScrollView>
    <KeyboardAvoidingView style={{padding:20}}>
      <TouchableOpacity style={{display:'flex',flexDirection:'row',gap:10,alignItems:'center',marginBottom:20}}
      onPress={()=>hideModal()}>
      <Ionicons name="arrow-back-outline" size={30} color="black" />
      <Text style={{fontFamily:'Exo-bold',fontSize:27}}>Booking</Text>
      </TouchableOpacity>
        
    {/* Calender Section */}
      <Heading text={'Select Date'}/>
      <View style={styles.calendarContainer}>
      <CalendarPicker onDateChange={setSelectedDate} 
        width={340}
        minDate={Date.now()}
        todayBackgroundColor={Colors.PRIMARY}
        todayTextStyle={{color:Colors.WHITE}}
        selectedDayColor={Colors.PRIMARY}
        selectedDayTextColor={Colors.WHITE}
      />
      </View>

      {/* Time Select Section */}
      <View style={{marginTop:20}}>
        <Heading text={'Select Time'} />
        <FlatList
            data={timeList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item,index})=>(
                <TouchableOpacity onPress={()=>setSelectedTime(item.time)} style={{marginRight:10}}>
                    <Text style={[selectedTime == item.time ? styles.selectedTime : styles.unselectedTime]}>{item.time}</Text>
                </TouchableOpacity>
            )}
        >
        </FlatList>
      </View>

      {/* Note Section  */}
      <View style={{marginTop:20}}>
        <Heading text={'Any Suggestion Note'} />
        <TextInput 
            placeholder='Note'
            numberOfLines={4}
            multiline={true}
            onChange={(text)=>setNote(text)}
            style={styles.noteTextaArea}
        >

        </TextInput>
      </View>

      {/* Confirmation Button  */}
      <View style={{marginTop:20}}>
        <TouchableOpacity onPress={()=>createNewBooking()}> 
            <Text style={styles.button}>Confirm & Book</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
    calendarContainer:{
        marginTop:10,
        padding:20,
        backgroundColor:Colors.PRIMARY_LIGHT,
        borderRadius:10
    },
    selectedTime:{
        padding:8,
        borderWidth:1,
        borderColor:Colors.PRIMARY,
        paddingHorizontal:10,
        borderRadius:99,
        backgroundColor:Colors.PRIMARY,
        color:Colors.WHITE
    },
    unselectedTime:{
        padding:8,
        borderWidth:1,
        borderColor:Colors.PRIMARY,
        paddingHorizontal:15,
        borderRadius:99,
        color:Colors.PRIMARY
    },
    noteTextaArea:{
        borderWidth:1,
        borderColor:Colors.PRIMARY,
        padding:20,
        fontSize:16,
        fontFamily:"Exo",
        borderRadius:5,
        textAlignVertical:'top'
    },
    button:{
        backgroundColor:Colors.PRIMARY,
        color:Colors.WHITE,
        padding:13,
        fontFamily:'Exo-medium',
        fontSize:17,
        borderRadius:99,
        textAlign:'center',
        elevation:2,
    }
})