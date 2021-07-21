/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable keyword-spacing */

import React,{useState} from 'react';
import {Text, View,Image} from 'react-native';
import {styles} from './style';

const ImageTemplate = (data) => {

    const [message,setMessage] = useState(data.message);
    const [imageURI,setURI] = useState('data:image/png;base64,' + message.image);
    const width = 300;
    const scale = 300 / message.options.width;
    const height = scale * message.options.height;


    return(
        <View style={[styles.message, data.flag ? styles.RightMessage : styles.LeftMessage]}>
            <Text style={{fontSize:13,padding:0,margin:0,color:'#00d9bf'}} fontWeight={500}>{message.sender_name}</Text>
            <Image
                source={{ uri: imageURI }}
                style={{width:width,height:height,marginVertical:5}}
            />
        </View>
    );
};
export default ImageTemplate;
