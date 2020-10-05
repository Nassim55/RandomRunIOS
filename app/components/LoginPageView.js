import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, ImageBackground, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-native";
import { TextInput, Button } from 'react-native-paper'

import Animated, { interpolate } from 'react-native-reanimated';
import { useTransition } from  "react-native-redash/lib/module/v1";
import { LoginButton, AccessToken } from 'react-native-fbsdk';

// Custom functions:
import registerAccount from '../authentication/registerAccount';
import userAuthentication from '../authentication/userAuthentication';

// Assets:
import landingPageBackground from '../../images/landingPageBackground.jpg';

const width = Dimensions.get('window').width;


const LoginPageView = () => {
    // Creating dispatch to all updates to redux store:
    const dispatch = useDispatch();

    // Creating history in order to allow react router re-directs:
    const history = useHistory();

    // Storing user credentials in local state:
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');



    const [isSignUp, setIsSignUp] = useState(false);
    const transition = useTransition(isSignUp, { duration: 400 })
    const translateXLogin = interpolate(transition, {
        inputRange: [0, 1],
        outputRange: [0, -width],
    })
    const translateXSignUp = interpolate(transition, {
        inputRange: [0, 1],
        outputRange: [width, 0],
    })
    

    // State values for registration:
    const [regFirstName, setRegFirstName] = useState('')
    const [regLastName, setRegLastName] = useState('')
    const [regUsername, setRegUsername] = useState('')
    const [regEmail, setRegEmail] = useState('')
    const [regPassword, setRegPassword] = useState('')
    const [regPassword2, setRegPassword2]= useState('')


    // Messages that will be shown to user if incorrect data is posted:
    const loginButtonHttpResponse = useSelector(state => state.loginButtonHttpResponse);



    return (
        <ImageBackground 
        style = {styles.pageContent}
        source={landingPageBackground}
        >
            <View style={styles.darkenMap} />
            <View style={styles.welcomeContainer}>
                <Text style={styles.titleText}>
                    Random Run
                </Text>
            </View>
            <View style={styles.cardsContainer}>
                <Animated.View style={[styles.card, styles.cardLogin, {
                    transform: [{translateX: translateXLogin}]
                }]}>
                    <View style={styles.cardTopText}>
                        <Text style={styles.welcomeTextTop}>Already have an account?</Text>
                        <Text style={styles.welcomeTextBottom}>Pick up where you left off</Text>
                    </View>
                    <View style={styles.forms}>
                        <View style={styles.formAndMessageContainer}>
                            <Text>{loginButtonHttpResponse.username[0]}</Text>
                            <TextInput
                            style={styles.inputForm}
                            label="Email"
                            mode={'outlined'}
                            value={username}
                            autoCapitalize = 'none'
                            onChangeText={username => setUsername(username)}
                            />
                        </View>
                        <View style={styles.formAndMessageContainer}>
                            <Text>{loginButtonHttpResponse.password[0]}</Text>
                            <TextInput
                            style={styles.inputForm}
                            label="Password"
                            mode={'outlined'}
                            secureTextEntry={true}
                            value={password}
                            onChangeText={password => setPassword(password)}
                            />
                        </View>
                        <View>
                            <Text>{loginButtonHttpResponse.non_field_errors[0]}</Text>
                            <Button
                            style={styles.loginButton}
                            uppercase={false}
                            icon='login'
                            mode="contained"
                            onPress={() => userAuthentication(username, password, dispatch, history)}
                            >
                                Login
                            </Button>
                        </View>
                    </View>
                </Animated.View>
                <Animated.View style={[styles.card, styles.cardSignUp, {
                    transform: [{translateX: translateXLogin}]
                }]}>
                    <View style={styles.cardTopText}>
                        <Text style={styles.welcomeTextTop}>New to Random Run?</Text>
                        <Text style={styles.welcomeTextBottom}>Start your adventure now</Text>
                    </View>
                    <View style={styles.forms}>
                        <Button
                        style={styles.loginButton}
                        uppercase={false}
                        icon='sign-direction'
                        mode="outlined"
                        onPress={() => setIsSignUp(!isSignUp)}
                        >
                            Sign Up
                        </Button>
                        <Button
                        style={styles.loginButton}
                        uppercase={false}
                        icon='google'
                        mode="outlined"
                        >
                            Sign Up With Google
                        </Button>
                        <Button
                        style={styles.loginButton}
                        uppercase={false}
                        icon='facebook'
                        mode="outlined"
                        >
                            Sign Up With Facebook
                        </Button>
                        <LoginButton
                        onLoginFinished={
                            (error, result) => {
                            if (error) {
                                console.log("login has error: " + result.error);
                            } else if (result.isCancelled) {
                                console.log("login is cancelled.");
                            } else {
                                AccessToken.getCurrentAccessToken().then(
                                (data) => {
                                    console.log(data.accessToken.toString())
                                }
                                )
                            }
                            }
                        }
                        onLogoutFinished={() => console.log("logout.")}/>
                    </View>
                </Animated.View>
                <Animated.View style={[styles.card, styles.cardSignUpDetails, {
                    transform: [{translateX: translateXSignUp}]
                }]}>
                    <View style={styles.cardTopText}>
                        <Text style={styles.welcomeTextTop} onPress={() => setIsSignUp(!isSignUp)}>Create an account</Text>
                        <Text style={styles.welcomeTextBottom}>Enter your details</Text>
                    </View>
                    <View style={styles.forms}>
                        <TextInput
                        style={styles.inputFormRegistration}
                        label="Create a Username"
                        mode={'outlined'}
                        value={regUsername}
                        onChangeText={username => setRegUsername(username)}
                        />
                        <TextInput
                        style={styles.inputFormRegistration}
                        label="First Name"
                        mode={'outlined'}
                        value={regFirstName}
                        onChangeText={firstName => setRegFirstName(firstName)}
                        />
                        <TextInput
                        style={styles.inputFormRegistration}
                        label="Last Name"
                        mode={'outlined'}
                        value={regLastName}
                        onChangeText={lastName => setRegLastName(lastName)}
                        />
                        <TextInput
                        style={styles.inputFormRegistration}
                        label="Email"
                        mode={'outlined'}
                        value={regEmail}
                        onChangeText={email => setRegEmail(email)}
                        />
                        <TextInput
                        style={styles.inputFormRegistration}
                        label="Password"
                        mode={'outlined'}
                        secureTextEntry={true}
                        value={regPassword}
                        onChangeText={password => setRegPassword(password)}
                        />
                        <TextInput
                        style={styles.inputFormRegistration}
                        label="Confirm Password"
                        mode={'outlined'}
                        secureTextEntry={true}
                        value={regPassword2}
                        onChangeText={password2 => setRegPassword2(password2)}
                        />
                        <Button
                        style={styles.loginButton}
                        uppercase={false}
                        icon='sign-direction'
                        mode="contained"
                        onPress={() => registerAccount(regFirstName, regLastName, regUsername, regEmail, regPassword, regPassword2,  dispatch, history)}
                        >
                            Register
                        </Button>
                    </View>
                </Animated.View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    pageContent: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },

    welcomeContainer: {
        flex: 1,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '85%',

    },
    cardsContainer: {
        flex: 4,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '85%',
    },



    card: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        padding: 25,
        borderRadius: 24,
        backgroundColor: 'white',
        opacity: 0.85,
        marginBottom: 50,
        width: '100%',
    },
    cardLogin: {
        height: '47%',
    },
    cardSignUp: {
        height: '35%'
    },
    cardSignUpDetails: {
        position: 'absolute'
    },



    cardTopText: {
        flex: 1,
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    forms: {
        flex: 4,
        position: 'relative',
    },




    welcomeTextTop: {
        fontFamily: 'Raleway-Regular',
        fontSize: 24,
    },
    welcomeTextBottom: {
        fontFamily: 'Raleway-Light',
        fontSize: 16,
    },
    inputForm: {
        marginTop: 10,
        width: '100%'
    },
    inputFormRegistration: {
        marginTop: 5,
    },
    loginButton: {
        position: 'relative',
        fontFamily: 'Raleway-Regular',
        marginTop: 15,
    },

    formAndMessageContainer: {
        position: 'relative',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },


    darkenMap: {
        position: 'absolute',
        backgroundColor: 'black',
        opacity: 0.7,
        height: '100%',
        width: '100%',
    },


    titleText: {
        fontFamily: 'Raleway-Regular',
        fontSize: 44,
        color: 'white',
    },
  });

export default LoginPageView;
