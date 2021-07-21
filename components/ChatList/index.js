/* eslint-disable prettier/prettier */
/* eslint-disable curly */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable keyword-spacing */
import React,{useState} from 'react';
import {Text, View, Button, StyleSheet, TextInput ,TouchableHighlight, ScrollView, Image} from 'react-native';
// import { Input, Stack, Center, Heading, NativeBaseProvider } from 'native-base';
import auth from '@react-native-firebase/auth';
import {styles} from './style';
import { Avatar,
    Box,Menu,
    HamburgerIcon,
    Pressable,
    Heading,
    VStack,
    Center,
    HStack,
    Spinner,
    } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
} from '@react-navigation/drawer';
import firestore from '@react-native-firebase/firestore';
import {Icon} from 'react-native-vector-icons/Entypo';

const Drawer = createDrawerNavigator();

const ChatRooms = ({navigation,route}) => {

    const [userData,setuserData] = useState(route.params);
    const [forumData,setforumData] = useState();
    const [showModal, setShowModal] = useState(false);

    // console.log(userData.display_name);

    async function fetchData(){
        let data =  await firestore().collection('users').doc(route.params.user.uid).get();
        let forums =  await firestore().collection('forums').get();
        // console.log(forums);
        setuserData(data._data);
        setforumData(forums._docs);
        // console.log(forums._docs[0].id);
    }

    const handleLogout = () =>{
        auth()
        .signOut()
        .then(() => console.log('User signed out!'));
    };


    const getChats = () =>{
        if(!forumData){
            fetchData();
            return(
                <Spinner/>
            );
        }
        return forumData.map((e)=>{
            return(
                <Pressable
                    onPress={()=>
                        navigation.navigate('IndividualChat',{
                            name : e._data.forum_name,
                            messages : e._data.messages,
                            user_id : 'b2ZCHM1XkcV4QWmWPGRCL7PnzRl2',
                            forum_id : e.id,
                            user_name : userData.display_name,
                        })
                    } key={e.id}>
                    <HStack style={styles.chatStack}>
                        <Avatar source = {require('../assets/profile_placeholder.jpg')}>SS</Avatar>
                        <View style={styles.chatDisplayView}>
                            <Text style={styles.chatDisplayText}>{e._data.forum_name}</Text>
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
