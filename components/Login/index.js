/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable curly */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable keyword-spacing */
import React,{useState,useEffect} from 'react';
import {Text, View, Button, TextInput ,TouchableHighlight} from 'react-native';
import { Input, Stack, Center, Heading, NativeBaseProvider } from 'native-base';
import auth from '@react-native-firebase/auth';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import {Styles} from './style';

const Separator = () => (
    <View style={Styles.separator} />
);

const LoginPage = () => {

    const [email, onChangeText] = useState('');
    const [password, onChangePassword] = useState('');

    return(
        <View style={Styles.container}>
            <Text style={Styles.title}>Welcome to ChatShop</Text>
            <View style={{ marginTop : 30}}>
                <TextInput
                    style={Styles.input}
                    onChangeText={onChangeText}
                    value={email}
                    placeholder = "email"
                />
                <TextInput
                    style={Styles.input}
                    onChangeText={onChangePassword}
                    secureTextEntry = {true}
                    textContentType = "password"
                    value={password}
                    placeholder = "password"
                />
                <View style={Styles.fixToText}>
                  <TouchableHighlight
                    style={Styles.loginButton}
                    onPress={()=>this.props.handleLogin(email,password)}>
                    <Text style={Styles.loginText}>Login</Text>
                  </TouchableHighlight>
                </View>
                <TouchableHighlight
                    onPress = {()=>this.props.handleLoginTypeChange()}>
                  <Text style={Styles.loginText}>Create a new account</Text>
                </TouchableHighlight>
            </View>
            <Separator/>
            <View style={Styles.fixToText}>
                <TouchableHighlight style={Styles.loginGoogle}>
                  <Text style={Styles.loginText}>Login with Google</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
};



export default LoginPage;
