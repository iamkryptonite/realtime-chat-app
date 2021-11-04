/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable keyword-spacing */

import React,{useState,useEffect} from 'react';
import uuid from 'react-native-uuid';
import {Text, View, Button, StyleSheet, TextInput ,TouchableHighlight, ScrollView,Image} from 'react-native';
import {styles} from './style';
import {HStack,VStack,Pressable,Heading,Center, Avatar,Box,Circle} from 'native-base';
import firestore from '@react-native-firebase/firestore';
import {launchImageLibrary} from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
import MessageTemplate from '../MessageTemplates';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
 'Non-serializable values were found in the navigation state',
]);


const Chats = ({navigation,route}) => {

    const [message,setMessage] = useState();
    const [allMessages,setAllMessages] = useState([]);
    const [userID,setUserID] = useState(route.params.uid_1);
    const [userName,setUserName] = useState(route.params.username_1);
    const [chatID,setchatID] = useState(route.params.chatID);
    const [imageURI,setImageURI] = useState();
    // console.log(route.params);

    useEffect(() => {
        if(chatID){
        const subscriber = firestore()
            .collection('chats')
            .doc(chatID)
            .onSnapshot(documentSnapshot => {
                setAllMessages(documentSnapshot._data.messages);
            });
            // Stop listening for updates when no longer required
            return () => subscriber();
        }
      }, [chatID]);


    const sendMessage = () =>{
        var tmp = allMessages;
        tmp.push({
            message_id:uuid.v4(),
            data:message,
            sender_id:userID,
            sender_name:userName,
            type:'text',
            timestamp: new Date().getTime(),
        });
        if(!chatID){
            firestore().collection('chats').add({messages:[]})
            .then((docRef)=>{
                setchatID(docRef.id);
                firestore().collection('users').doc(userID).update({[`chatIDs.${route.params.uid_2}`]:docRef.id});
                firestore().collection('users').doc(route.params.uid_2).update({[`chatIDs.${userID}`]:docRef.id});
                firestore()
                .collection('chats')
                .doc(docRef.id)
                .update({
                    messages: tmp,
                });
            });
        }else{
            firestore()
            .collection('chats')
            .doc(chatID)
            .update({
                messages: tmp,
            });
        }
        setMessage();
    };

    const sendPhoto = (image,width,height) => {
        var tmp = allMessages;
        tmp.push({
            message_id:uuid.v4(),
            type:'image',
            image:image,
            sender_id:userID,
            sender_name:userName,
            timestamp: new Date().getTime(),
            options:{
                width:width,
                height:height,
            },
        });
        firestore()
        .collection('chats')
        .doc(chatID)
        .update({
            messages: tmp,
        })
        .then(() => {
            console.log('User updated!');
        });
    };

    const handleChoosePhoto = () => {
        const options = {
          noData: true,
        };
        launchImageLibrary(options, response => {
            if(response.assets[0].uri){
                var width = response.assets[0].width;
                var height = response.assets[0].height;
                setImageURI(response.assets[0].uri);
                ImgToBase64.getBase64String(response.assets[0].uri)
                .then((base64String) =>{
                    sendPhoto(base64String,width,height);
                })
                .catch(err => console.log(err));
            }
        });
    };

    const getMessages = ()=>{
        if(allMessages.length === 0){
            return(
                <Center>
                    <Text style={styles.noMessages}>No messages yet</Text>
                </Center>
            );
        }
        return allMessages?.map((e)=>{
            return(
                <View
                    style={{
                        alignItems : e.sender_id === userID ? 'flex-end' : 'baseline',
                    }} key={e.message_id}>
                    <MessageTemplate message={e} flag = {e.sender_id === userID}/>
                </View>
            );
        });
    };

    const ButtonsGroup = () =>{
        if(message){
            return(
                <Pressable onPress={sendMessage}>
                    <Text style={styles.sendButton}>Send</Text>
                </Pressable>
            );
        }
        return(
            <Pressable onPress={handleChoosePhoto}>
                <Circle size={45} bg="#00d9bf">+</Circle>
            </Pressable>
        );
    };

    return(
        <View style={styles.container}>
            <HStack alignItems="center" mt={6} style={styles.header}>
                <Avatar source = {require('../assets/profile_placeholder.jpg')}>SS</Avatar>
                <View style={styles.chatDisplayView}>
                    <Text style={styles.chatDisplayText}>{route.params.username_2}</Text>
                </View>
            </HStack>
            <ScrollView style={styles.chatscroll}>
                {getMessages()}
            </ScrollView>
            <HStack space={2} alignItems="center" style={{padding:10,backgroundColor:'#171717'}}>
                <TextInput
                    value={message}
                    onChangeText={setMessage}
                    style={styles.messageInput}
                    placeholder="useless placeholder"
                    placeholderTextColor="#a3a3a3"
                />
                <ButtonsGroup/>
            </HStack>
        </View>
    );
};
export default Chats;
