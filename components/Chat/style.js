/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#fff',
    },
    title: {
      padding: 5,
      borderRadius: 6,
      color: '#000',
      fontSize: 35,
      fontWeight: '700',
    },
    header:{
      backgroundColor:'#2b2b2b',
      padding:10,
      marginTop:0,
    },
    chatStack:{
      padding:10,
      borderBottomColor:'#c7c7c7',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    chatDisplayView:{
      paddingLeft:10,
      justifyContent:'center',
    },
    chatDisplayText:{
      fontSize:18,
      color:'#fff',
      fontWeight:"700",
    },
    messageInput:{
      // marginHorizontal:10,
      // marginVertical: 15,
      borderRadius:14,
      fontSize:18,
      paddingHorizontal:15,
      backgroundColor:'#2d2d2d',
      flex:1,
      color:'#fff',
    },
    sendButton:{
      height:45,
      backgroundColor:'#00d9bf',
      overflow:'hidden',
      color:'#fff',
      paddingHorizontal:15,
      paddingVertical:10,
      // marginRight:10,
      // marginVertical: 15,
      borderRadius:14,
      fontSize:18,
    },
    // message:{
    //   backgroundColor:'#2d2d2d',
    //   color:'#fff',
    //   paddingHorizontal:8,
    //   paddingVertical:4,
    //   marginHorizontal:10,
    //   marginVertical:3,
    //   borderRadius:10,
    //   fontSize:18,
    // },
    chatscroll:{
      paddingVertical:5,
      // marginVertical:10,
      backgroundColor:'#171717',
    },
    noMessages:{
      color:'grey',
    },
    addButton:{
      height:45,
      width:45,
      textAlign:'center',
      alignContent:'center',
      alignItems:'center',
      backgroundColor:'#000',
      color:'#fff',
      marginRight:10,
      borderRadius:104,
      fontSize:18,
    },
    // imageBox:{
    //   backgroundColor:'#2d2d2d',
    //   padding:8,
    //   // paddingVertical:4,
    //   marginHorizontal:10,
    //   marginVertical:10,
    //   borderRadius:10,
    //   // alignItems:'flex-end',
    // },
})