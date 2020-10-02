import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Pressable  } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useSpring, animated } from 'react-spring/native';
import { Link } from "react-router-native";
import { useDispatch, useSelector } from 'react-redux';


import deleteData from '../authentication/deleteData';

import { setIsRouteCardsShown, setIsUserInfoMenuOpen, setIsProfileShown } from '../../store/actions';

import fetchSavedRoutes from '../functions/fetchSavedRoutes';
import saveRoute from '../functions/saveRoute';

const UserInfoMenu = (props) => {
    const dispatch = useDispatch();


    const isUserInfoMenuOpen = useSelector(state => state.isUserInfoMenuOpen);
    const userID = useSelector(state => state.userAccountDetails.id);
    const mostNorthEasternCoordinates = useSelector(state => state.mostNorthEasternCoordinates);
    const mostSouthWesternCoordinates = useSelector(state => state.mostSouthWesternCoordinates);

    
    const fade = useSpring({
        opacity: isUserInfoMenuOpen ? 1 : 0
    })


    const AnimatedView = animated(View);

    const finalRouteLineString = useSelector(state => state.finalRouteLineString);


    // Creating the route duration for an average running speed of 5 meters per second:
    const date = new Date(0);
    date.setSeconds(props.displayRouteDistance.toFixed(0) / 5);
    const timeString = date.toISOString().substr(11, 8);




    

    return (
        <View style={styles.userInfoMenu}>
            { isUserInfoMenuOpen ? 
                <AnimatedView style={fade}>
                    {
                        finalRouteLineString.coordinates.length > 0 ?
                            <Pressable
                            style={styles.userInfoMenuButton}
                            onPress={async () => {
                                const mapImageURI = await props.viewShotRef.current.capture();
                                saveRoute(
                                    props.displayRouteDistance,
                                    finalRouteLineString.coordinates,
                                    mapImageURI,
                                    userID,
                                    timeString,
                                    mostNorthEasternCoordinates,
                                    mostSouthWesternCoordinates
                                );
                            }}
                            >
                                <SimpleLineIcons name='map' size={24} />
                                <Text style={styles.userInfoMenuButtonText}>Save</Text>
                            </Pressable>
                            :
                            null
                    }
                    <Pressable 
                    style={styles.userInfoMenuButton}
                    onPress={() => {
                        dispatch(setIsUserInfoMenuOpen(false));
                        dispatch(setIsProfileShown(false));
                        dispatch(setIsRouteCardsShown(true));
                        fetchSavedRoutes(dispatch);
                    }}
                    >
                        <SimpleLineIcons name='directions' size={24} />
                        <Text style={styles.userInfoMenuButtonText}>Routes</Text>
                    </Pressable>
                    <Pressable 
                    style={styles.userInfoMenuButton}
                    onPress={() => {
                        dispatch(setIsUserInfoMenuOpen(false));
                        dispatch(setIsRouteCardsShown(false));
                        dispatch(setIsProfileShown(true));
                    }}
                    >
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
                :
                null
            }
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