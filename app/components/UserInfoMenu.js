import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Pressable  } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useSpring, animated } from 'react-spring/native';
import { Link } from "react-router-native";
import { useDispatch, useSelector } from 'react-redux';


import deleteData from '../authentication/deleteData';

import { setIsRouteCardsShown } from '../../store/actions';

import fetchSavedRoutes from '../functions/fetchSavedRoutes';

const UserInfoMenu = () => {
    const dispatch = useDispatch();


    const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
    
    const fade = useSpring({
        opacity: isNavMenuOpen ? 1 : 0
    })
    const hamburgerColour = useSpring({
        backgroundColor: isNavMenuOpen ? '#F24E4E' : 'white'
    })

    const AnimatedView = animated(View);
    const AnimatedTouchableOpacity = animated(TouchableOpacity);


    const isRouteCardsShown = useSelector(state => state.isRouteCardsShown);
    

    return (
        <View style={styles.userInfoMenu}>
            <AnimatedTouchableOpacity style={[styles.hamburgerButton, {...hamburgerColour}]} onPress={() => setIsNavMenuOpen(!isNavMenuOpen)}>
                {
                    isNavMenuOpen ?
                    <SimpleLineIcons name='arrow-up' size={24} color='white'/>
                    :
                    <SimpleLineIcons name='menu' size={24} />
                }
            </AnimatedTouchableOpacity>
            
            <AnimatedView style={fade}>
            <Pressable 
            style={styles.userInfoMenuButton}
            onPress={() => {
                dispatch(setIsRouteCardsShown(false));
                setIsNavMenuOpen(false)
            }}
            >
                    <SimpleLineIcons name='map' size={24} />
                    <Text style={styles.userInfoMenuButtonText}>Map</Text>
                </Pressable>
                <Pressable 
                style={styles.userInfoMenuButton}
                onPress={() => {
                    dispatch(setIsRouteCardsShown(true));
                    setIsNavMenuOpen(false)
                    fetchSavedRoutes(dispatch);
                }}
                >
                    <SimpleLineIcons name='directions' size={24} />
                    <Text style={styles.userInfoMenuButtonText}>Routes</Text>
                </Pressable>
                <Pressable style={styles.userInfoMenuButton}>
                    <SimpleLineIcons name='user' size={24} />
                    <Text style={styles.userInfoMenuButtonText}>Profile</Text>
                </Pressable>
                <Link 
                to='/'
                component={Pressable}
                style={styles.userInfoMenuButton}
                onPress={() => deleteData(dispatch)}
                >                
                    <SimpleLineIcons name='logout' size={24} />
                    <Text style={styles.userInfoMenuButtonText}>Logout</Text>
                </Link>
            </AnimatedView>
        </View>
    );
};



const styles = StyleSheet.create({
    userInfoMenu: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 99,
    },
    hamburgerButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 90,
        borderWidth: 1
    },
    userInfoMenuButton: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
        opacity: 0.8,
        height: 70,
        width: 70,
        marginTop: 5,
        marginBottom: 5
    },
    userInfoMenuButtonText: {
        color: 'black'
    },
})

export default UserInfoMenu;