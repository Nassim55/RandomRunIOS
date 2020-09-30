import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, Animated, ImageBackground } from 'react-native';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-native";
import { TextInput, Button } from 'react-native-paper'


// Custom functions:
import registerAccount from '../authentication/registerAccount';
import userAuthentication from '../authentication/userAuthentication';

// Assets:
import landingPageBackground from '../../images/landingPageBackground.jpg';


const LoginPageView = () => {
    console.log('LoginPageView Rendering')

    // Creating dispatch to all updates to redux store:
    const dispatch = useDispatch();

    // Creating history in order to allow react router re-directs:
    const history = useHistory();

    // Storing user credentials in local state:
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');



    const [isSignUp, setIsSignUp] = useState(false);
    
    const [translateYAnim] = useState(new Animated.Value(0))

    // Change this to interpolate from 0% to 100%
    const toggleHandle = () => {
        setIsSignUp(!isSignUp);
        Animated.spring(translateYAnim, {
            toValue: isSignUp ? -855 : 0,
            duration: 7000,
            useNativeDriver: true,
        }).start();
    }
    

    // State values for registration:
    const [regFirstName, setRegFirstName] = useState('')
    const [regLastName, setRegLastName] = useState('')
    const [regUsername, setRegUsername] = useState('')
    const [regEmail, setRegEmail] = useState('')
    const [regPassword, setRegPassword] = useState('')
    const [regPassword2, setRegPassword2]= useState('')

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
                <View style={[styles.card, styles.cardLogin]}>
                    <View style={styles.cardTopText}>
                        <Text style={styles.welcomeTextTop}>Already have an account?</Text>
                        <Text style={styles.welcomeTextBottom}>Pick up where you left off</Text>
                    </View>
                    <View style={styles.forms}>
                        <TextInput
                        style={styles.inputForm}
                        label="Email"
                        mode={'outlined'}
                        value={username}
                        autoCapitalize = 'none'
                        onChangeText={username => setUsername(username)}
                        />
                        <TextInput
                        style={styles.inputForm}
                        label="Password"
                        mode={'outlined'}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={password => setPassword(password)}
                        />
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
                <View style={[styles.card, styles.cardSignUp]}>
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
                        onPress={toggleHandle}
                        >
                            Sign Up
                        </Button>
                        <Button
                        style={styles.loginButton}
                        uppercase={false}
                        icon='google'
                        mode="outlined"
                        onPress={toggleHandle}
                        >
                            Sign Up With Google
                        </Button>
                        <Button
                        style={styles.loginButton}
                        uppercase={false}
                        icon='facebook'
                        mode="outlined"
                        onPress={toggleHandle}
                        >
                            Sign Up With Facebook
                        </Button>
                    </View>
                </View>
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
        opacity: 0.7,
        marginBottom: 50,
        width: '100%',
    },
    cardLogin: {
        height: '40%',
    },
    cardSignUp: {
        height: '35%'
    },



    cardTopText: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    forms: {
        flex: 4,

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
    },
    inputFormRegistration: {
        marginTop: 5,
    },
    loginButton: {
        fontFamily: 'Raleway-Regular',
        marginTop: 15,
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


/*
            <Animated.View style={[styles.cardsContainer, {transform: [{ translateY: translateYAnim }]}]}>
                <View style={styles.cardLogin} >
                    <Text style={styles.welcomeTextTop}>Already have an account?</Text>
                    <Text style={styles.welcomeTextBottom}>Pick up where you left off</Text>
                    <TextInput
                    style={styles.inputForm}
                    label="Email"
                    mode={'outlined'}
                    value={username}
                    autoCapitalize = 'none'
                    onChangeText={username => setUsername(username)}
                    />
                    <TextInput
                    style={styles.inputForm}
                    label="Password"
                    mode={'outlined'}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={password => setPassword(password)}
                    />
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
                <View style={styles.cardSignUp}>
                    <Text style={styles.welcomeTextTop}>New to Random Run?</Text>
                    <Text style={styles.welcomeTextBottom}>Start your adventure now</Text>
                    <Button
                    style={styles.loginButton}
                    uppercase={false}
                    icon='sign-direction'
                    mode="outlined"
                    onPress={toggleHandle}
                    >
                        Sign Up
                    </Button>
                    <Button
                    style={styles.loginButton}
                    uppercase={false}
                    icon='google'
                    mode="outlined"
                    onPress={toggleHandle}
                    >
                        Sign Up With Google
                    </Button>
                </View>
            </Animated.View>
            <Animated.View style={[styles.registerCardContainer, {transform: [{ translateY: translateYAnim }]}]}>
                <View style={styles.cardSignUp}>
                    <Text 
                    style={styles.welcomeTextTop}
                    onPress={toggleHandle}
                    >
                        Create your account
                    </Text>
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
                    label="Username"
                    mode={'outlined'}
                    value={regUsername}
                    onChangeText={username => setRegUsername(username)}
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
                    label="Password2"
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










                <View style={[styles.card, styles.cardSignUp]}>
                    <Text style={styles.welcomeTextTop}>New to Random Run?</Text>
                    <Text style={styles.welcomeTextBottom}>Start your adventure now</Text>

                </View>



            */




