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
      color: '#00d9bf',
      fontSize: 35,
      fontWeight: '700',
    },
    header:{
      backgroundColor:'#2b2b2b',
      padding:10,
      marginTop:0,
      color:'#fff',
    },
    chatStack:{
      padding:10,
      borderBottomColor:'#3d3d3d',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    chatDisplayView:{
      paddingLeft:10,
      justifyContent:'center',
    },
    chatDisplayText:{
      fontSize:18,
      color:'#fff',
    },
    chatList:{
      backgroundColor:'#171717',
      color:'#fff',
    },
})