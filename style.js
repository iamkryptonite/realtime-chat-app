/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
export const Styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
    //   backgroundColor: '#2b2b2b',
    },
    title: {
      marginTop: 16,
      paddingVertical: 8,
      borderRadius: 6,
      color: '#000',
      textAlign: 'center',
      fontSize: 55,
      fontWeight: '700',
    },
    input:{
        backgroundColor:'#e0e0e0',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 50,
        fontSize:20,
        marginTop: 10,
    },
    loginButton:{
        fontSize : 50,
        backgroundColor : '#00d9bf',
        paddingHorizontal:30,
        paddingVertical:10,
        marginTop: 30,
        borderRadius: 5,
    },
    loginGoogle:{
        fontSize : 50,
        color : '#2e46b0',
        backgroundColor : '#2e46b0',
        paddingHorizontal:30,
        paddingVertical:10,
        borderRadius: 5,
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    loginText:{
        color:'#fff',
        fontSize:20,
    },
    separator: {
        marginVertical: 30,
        borderBottomColor: '#c28e00',
        borderBottomWidth: 0.5,
    },
});

