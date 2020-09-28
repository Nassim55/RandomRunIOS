import React from 'react';
import { View, StyleSheet, Dimensions, Text, Image, Alert } from 'react-native';
import { mix, mixColor, step, usePanGestureHandler } from 'react-native-redash/lib/module/v1';
import Animated, { add, Extrapolate, interpolate } from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useSpring } from './Animations';

import deleteSavedRoute from '../functions/deleteSavedRoute';

const { width: wWidth } = Dimensions.get('window');
const { height: wHeight } = Dimensions.get('window');
const width = wWidth * 0.75;
const height = width * (425 / 294);



// SWIPRE RIGHT RO SAVE LOAD A ROUTE SWIPE LEFT TO 

const Card = (props) => {
    const backgroundColor = mixColor(props.position, '#FFFFFF', '#BFC0C0');
    const translateYCardOffset = mix(props.position, 0 , -120);
    const scale = mix(props.position, 1, 0.85);
    const cardContentsOpacity = interpolate(props.position, {
        inputRange: [0, props.step],
        outputRange: [1, 0.15],
        extrapolate: Extrapolate.CLAMP,
    });


    const {gestureHandler, translation, velocity, state} = usePanGestureHandler();

    // When the gesture starts again we want to start from the last position instead of resetting:
    const translateXLeft = useSpring({ 
        value: translation.x,
        velocity: velocity.x,
        state,
        snapPoints: [-wWidth, 0],
        onSnap: ([x]) => x !== 0 && props.onSwipeLeft(),
    });
    const translateXRight = useSpring({ 
        value: translation.x,
        velocity: velocity.x,
        state,
        snapPoints: [0, wWidth],
        onSnap: ([x]) => x !== 0 && props.onSwipeRight(),
    });
    const translateY = add(
        translateYCardOffset,
        useSpring({
            value: translation.y,
            velocity: velocity.y,
            state, snapPoints: [0, wHeight],
            onSnap: ([y]) => y !== 0 && props.onSwipeDown(),
    })
    )


    return (
        <PanGestureHandler {...gestureHandler} >
            <Animated.View style={[styles.card, {
                width,
                height,
                backgroundColor,
                transform: [
                    { scale },
                    { translateX: translateXLeft },
                    { translateX: translateXRight },
                    { translateY },
                ]
            }]} >
                <View style={[styles.cardViews, styles.routeImageView]}>
                    <Animated.Image
                    source={{uri: `http://127.0.0.1:8000${props.image}`}}
                    style={[styles.routeImage, {

                        opacity: cardContentsOpacity,
   
                    }]}
                    />
                </View>
                <Animated.View style={[styles.routeInfo, styles.routeInfoLeft, {
                        opacity: cardContentsOpacity,
                    }]}>
                        <Text style={styles.routeInfoText}>{`${parseFloat(props.distanceMeters).toFixed(0)} meters`}</Text>
                    </Animated.View>
                    <Animated.View style={[styles.routeInfo, styles.routeInfoRight, {
                        opacity: cardContentsOpacity,
                    }]}>
                        <Text style={styles.routeInfoText}>{`${parseFloat(props.distanceMeters).toFixed(0)} meters`}</Text>
                    </Animated.View>
            </Animated.View>
        </PanGestureHandler>
    );
};

const styles = StyleSheet.create({
    card: {
        position: 'absolute',
        height: '60%',
        width: '75%',
        backgroundColor: 'white',
        borderRadius: 24,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    cardViews: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center', 
        width: '100%',
    },
    routeImageView: {
        position: 'relative',
        flex: 1,
        borderRadius: 24,
        overflow: 'hidden',
        width: 'auto'
    },



    routeInfo: {
        position: 'absolute',
        bottom: '10%',
        
    },
    routeInfoLeft: {
        left: '10%',

    },
    routeInfoRight: {
        right: '10%',
    },




    routeImage: {
        position: 'relative',
        height: '100%',
        width: '100%',
    },
    routeInfoText: {
        fontSize: 20,
        fontFamily: 'Raleway-Regular'
    },
    deleteRouteButton: {
        position: 'relative',
        width: '20%',
    },
})

export default Card;


/*
                <View style={[styles.cardViews, styles.cardTopView]}>
                    <View style={styles.deleteRouteButton}> 
                        <SimpleLineIcons.Button
                        name='close'
                        size={24}
                        color='white'
                        backgroundColor="#F24E4E"
                        onPress={() => {
                            Alert.alert(
                                'Delete this route?',
                                'Are you sure you want to permanently delete this route?',
                                [
                                    { 
                                        text: 'Keep',
                                        style: 'cancel'
                                    },
                                    { 
                                        text: 'Delete',
                                        style: 'destructive',
                                        onPress: () => deleteSavedRoute(props.savedRouteDatabaseID),
                                    }
                                ],
                                { cancelable: false }
                            );
                        }}
                        />  
                    </View>
                </View>
*/


