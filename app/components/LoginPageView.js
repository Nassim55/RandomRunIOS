import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-native";
import { TextInput, Button } from 'react-native-paper'


// Custom functions:
import registerAccount from '../authentication/registerAccount';
import userAuthentication from '../authentication/userAuthentication';


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
        Animated.timing(translateYAnim, {
            toValue: isSignUp ? -590 : 0,
            duration: 1000,
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
        <View style = {styles.pageContent}>
            <View style={styles.welcomeContainer}>
                <Text style={styles.titleText}>
                    Random Run
                </Text>
            </View>
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
        </View>
    );
};

const styles = StyleSheet.create({
    pageContent: {
        backgroundColor: 'white',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
    },
    titleText: {
        fontFamily: 'Raleway-Regular',
        fontSize: 44,
    },
    welcomeContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '20%',
        width: '100%',
        backgroundColor: 'white',
        zIndex: 999
    },
    cardsContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '80%',
        width: '100%',
        overflow: 'hidden',
    },
    registerCardContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '80%',
        width: '100%',
        overflow: 'hidden',
    },
    cardLogin: {
        position: 'absolute',
        borderWidth: 2.5,
        display: 'flex',
        flexDirection: 'column',
        width: '85%',
        borderStyle: 'dashed',
        borderRadius: 20,
        borderColor: '#ccc',
        padding: 20,
        marginBottom: 15,
        backgroundColor: 'white'
    },
    cardSignUp: {
        position: 'absolute',
        bottom: 0,
        borderWidth: 2.5,
        display: 'flex',
        flexDirection: 'column',
        width: '85%',
        borderStyle: 'dashed',
        borderRadius: 20,
        borderColor: '#ccc',
        padding: 20,
        marginBottom: 35,
        overflow: 'hidden',
        backgroundColor: 'white',
    },
    cardSignUpExtended: {
        position: 'absolute',
        borderWidth: 2.5,
        display: 'flex',
        flexDirection: 'column',
        width: '85%',
        borderStyle: 'dashed',
        borderRadius: 20,
        borderColor: '#ccc',
        padding: 20,
        marginBottom: 35,
        overflow: 'hidden',
        backgroundColor: 'white',
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
        marginTop: 20,
    }
  });

export default LoginPageView;


/*

    const [isFlipped, setIsFlipped] = useState(false);

    const { translateX, opacity, height1, height2, borderWidth } = useSpring({
        opacity
        height1: isFlipped ? '0%' : '50%',
        height2: isFlipped ? '90%' : '40%',
        borderWidth: isFlipped ? 0 : 2.5,
        translateX: isFlipped ? 750 : 0,
        config: { mass: 12, tension: 500, friction: 80 }
    });



                style={[styles.cardLogin, {
                    height: height1,
                    transform: [{ translateX: translateX }]















*/




