/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable keyword-spacing */

import React,{useState} from 'react';
import {Text, View} from 'react-native';
import {styles} from './style';


const TextTemplate = (data) => {

    const [message,setMessage] = useState(data.message);

    return(
        <View style={[styles.message, data.flag ? styles.RightMessage : styles.LeftMessage]}>
            <Text style={{ fontSize:13,padding:0,margin:0,color:'#00d9bf'}} fontWeight={500}>{message.sender_name}</Text>
            <Text style={{ fontSize:18,color:'#fff'}}>
                {message.data}
            </Text>
            {/* <Text style = {{fontSize:10,marginLeft:0}}>
                    { new Date(e.timestamp).toLocaleTimeString('en-US')}
            </Text> */}
        </View>
    );
};
export default TextTemplate;
