/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable keyword-spacing */
import React,{useState,useEffect} from 'react';
import {Text, View, Button, StyleSheet, TextInput ,TouchableHighlight, ScrollView, Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import {styles} from './style';
import { Avatar,Box,Menu,HamburgerIcon,Pressable,Heading,VStack,Center,HStack,Spinner} from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
} from '@react-navigation/drawer';
import firestore from '@react-native-firebase/firestore';

const Drawer = createDrawerNavigator();

const ChatRooms = ({navigation,route}) => {

    const [userData,setuserData] = useState();
    const [chatData,setchatData] = useState();

    useEffect(() => {
        const subscriber = firestore()
            .collection('users')
            .doc(userData.uid)
            .onSnapshot(documentSnapshot => {
                // console.log('User data: ', documentSnapshot._data);
                setuserData(documentSnapshot._data);
            });
            // Stop listening for updates when no longer required
            return () => subscriber();
      }, [userData.uid]);

    async function fetchData(){
        let data =  await firestore().collection('users').doc(route.params.user.uid).get();
        let chats =  await firestore().collection('users').get();
        setuserData({...data._data,uid:route.params.user.uid});
        setchatData(chats._docs);
    }

    const handleLogout = () =>{
        auth()
        .signOut()
        .then(() => console.log('User signed out!'));
    };


    const getChats = () =>{
        if(!chatData){
            fetchData();
            return(
                <Spinner/>
            );
        }
        return chatData.map((e)=>{
            // console.log(e._data.chatIDs?.[userData.uid]);
            return(
                <Pressable
                    onPress={()=>
                        navigation.navigate('IndividualChat',{
                            username_2 : e._data.display_name,
                            uid_1 : userData.uid,
                            uid_2 : e.id,
                            username_1 : userData.display_name,
                            chatID: e._data.chatIDs?.[userData.uid],
                        })
                    } key={e.id}>
                    <HStack style={styles.chatStack}>
                        <Avatar source = {require('../assets/profile_placeholder.jpg')}></Avatar>
                        <View style={styles.chatDisplayView}>
                            <Text style={styles.chatDisplayText}>{e._data.display_name}</Text>
                        </View>
                    </HStack>
                </Pressable>
            );
        });
    };
    return(
        <View style={styles.container}>
            <HStack alignItems="center" mt={6} style={styles.header}>
                <Pressable onPress={{}} ml={2} zIndex={1}>
                    <HamburgerIcon color="#00d9bf"/>
                </Pressable>
                <Center flex={1} >
                    <Heading size="md" color="#00d9bf">ChatShop</Heading>
                </Center>
                <Pressable onPress={handleLogout} ml={2} zIndex={1}>
                    <Text color="#00d9bf">Logout</Text>
                </Pressable>
            </HStack>
            <ScrollView style={styles.chatList}>
                {getChats()}
            </ScrollView>
        </View>
    );
};
export default ChatRooms;
