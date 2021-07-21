/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable semi */
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    message:{
        backgroundColor:'#2d2d2d',
        paddingHorizontal:8,
        paddingVertical:4,
        marginHorizontal:10,
        marginVertical:3,
        borderRadius:10,
        maxWidth:350,
    },
    leftMessage:{
        borderBottomLeftRadius:0,
        backgroundColor:'#2d2d2d',
    },
    RightMessage:{
        borderBottomRightRadius:0,
        backgroundColor:'#04473f',
    },
})