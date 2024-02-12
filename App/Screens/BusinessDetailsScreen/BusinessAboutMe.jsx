import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Heading from '../../Components/Heading'
import Colors from '../../Utils/Colors'

export default function BusinessAboutMe({business}) {
    const [readMore, setReadMore] = useState(false)
  return business&&(
    <View>
      <View>
          <Heading text={"About Me"} />
          <Text style={{fontFamily:'Exo',lineHeight:28,fontSize:16,color:Colors.GRAY}}
          numberOfLines={readMore?20:5}
        >{business?.about}</Text>
        </View>
        <TouchableOpacity onPress={()=>setReadMore(!readMore)}>
        <Text style={{fontFamily:'Exo-bold',fontSize:15,color:Colors.PRIMARY}}>{readMore?'Read Less': 'Read More'}</Text>
        </TouchableOpacity>
    </View>
  )
}