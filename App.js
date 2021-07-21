/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable curly */
/* eslint-disable keyword-spacing */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
//  * @flow strict-local
 */
import 'react-native-gesture-handler';
import React,{useState,useEffect} from 'react';
import {Text, View, Button, TextInput ,TouchableHighlight} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeBaseProvider, Box } from 'native-base';
import auth from '@react-native-firebase/auth';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import ChatRooms from './components/ChatList';
import Chat from './components/Chat';
import {Styles} from './style';


const Separator = () => (
  <View style={Styles.separator} />
);

const Stack = createStackNavigator();

const ProfileScreen = ({ navigation, route }) => {
  return <Text>This is {route.params.name}'s profile</Text>;
};

const App = () => {
  const [username, onChangeUserName] = useState('');
  const [email, onChangeText] = useState('');
  const [password, onChangePassword] = useState('');
  const [isLogin, setAuthType] = useState('true');
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [uid,setuid] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if(initializing) setInitializing(false);
    setuid(user?.uid);
  }

  const handleLogin = ()=>{
    auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
        console.log('User account created & signed in!');
    })
    .catch(error => {
        console.log(error.code);
        if (error.code === 'auth/user-not-found') {
          console.error('Invalid Email or password');
        }else
          console.error('Sorry an error occured');
    });
  };
  const handleSignup = ()=>{
    auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
        console.log('User account created & signed in!');
    })
    .catch(error => {
        console.log(error.code);
        if (error.code === 'auth/user-not-found') {
          console.error('Invalid Email or password');
        }else
          console.error('Sorry an error occured');
    });
  };

  const handleLoginTypeChange = () =>{
    if(isLogin) setAuthType(false);
    else setAuthType(true);
    onChangeText('');
    onChangePassword('');
  };

  useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
  }, []);

  if(initializing) return null;

  if(!user){
    if(isLogin)
      return(
        //Login page starts here
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
                  <TouchableHighlight style={Styles.loginButton} onPress={handleLogin}>
                    <Text style={Styles.loginText}>Login</Text>
                  </TouchableHighlight>
                </View>
            </View>
            <Separator/>
            <TouchableHighlight onPress={handleLoginTypeChange}>
              <Text style={Styles.loginText}>Create a new account</Text>
            </TouchableHighlight>
        </View>
      );
    else
      return(
        // Signup page starts here
        <View style={Styles.container}>
            <Text style={Styles.title}>Welcome to ChatShop</Text>
            <View style={{ marginTop : 30}}>
                <TextInput
                    style={Styles.input}
                    onChangeText={onChangeUserName}
                    value={username}
                    placeholder = "name"
                />
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
                  <TouchableHighlight style={Styles.loginButton} onPress={handleSignup}>
                    <Text style={Styles.loginText}>Signup</Text>
                  </TouchableHighlight>
                </View>
            </View>
            <Separator/>
            <TouchableHighlight onPress={handleLoginTypeChange}>
              <Text style={Styles.loginText}>Login with an existing account</Text>
            </TouchableHighlight>
        </View>
      );
  }
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Chats"
                        component={ChatRooms}
                        initialParams = {{ user:user }}
          />
          <Stack.Screen name="IndividualChat" component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};



export default App;
