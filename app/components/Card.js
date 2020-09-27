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
    const cardContentsScale = interpolate(props.position, {
        inputRange: [0, props.step],
        outputRange: [1, 0],
        extrapolate: Extrapolate.CLAMP,
    });
    const cardContentsOpacity = interpolate(props.position, {
        inputRange: [0, props.step],
        outputRange: [1, 0],
        extrapolate: Extrapolate.CLAMP,
    });
    const imageBorderRadius = interpolate(props.position, {
        inputRange: [0, props.step],
        outputRange: [0, 200],
        extrapolate: Extrapolate.CLAMP,
    });


    const {gestureHandler, translation, velocity, state} = usePanGestureHandler();

    // When the gesture starts again we want to start from the last position instead of resetting:
    const translateX = useSpring({ 
        value: translation.x,
        velocity: velocity.x,
        state,
        snapPoints: [-wWidth, 0, wWidth],
        onSnap: ([x]) => x !== 0 && props.onSwipeLeft(),
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
                    { translateX },
                    { translateY },
                ]
            }]} >

                <View style={[styles.cardViews, styles.routeImageView]}>
                    <Animated.Image
                    source={{uri: `http://127.0.0.1:8000${props.image}`}}
                    style={[styles.routeImage, {
                        borderRadius: imageBorderRadius,
                        opacity: cardContentsOpacity,
                        transform: [
                            { scale: cardContentsScale }
                        ]
                    }]}
                    />
                </View>
                <Animated.View style={[styles.cardViews, styles.routeInfoView, {
                    opacity: cardContentsOpacity,
                    transform: [
                        { scale: cardContentsScale }
                    ]
                }]}>
                    <View style={[styles.innerRouteInfoView, styles.innerRouteInfoViewLeft]}>
                        <Text style={styles.routeInfoText}>{`${parseFloat(props.distanceMeters).toFixed(0)} meters`}</Text>
                    </View>
                    <View style={[styles.innerRouteInfoView, styles.innerRouteInfoViewRight]}>
                        <Text style={styles.routeInfoText}>{`${parseFloat(props.distanceMeters).toFixed(0)} meters`}</Text>
                    </View>
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
        flex: 9,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        overflow: 'hidden',
    },
    routeInfoView: {
        flex: 2,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },

    innerRouteInfoView: {
        flex: 1,
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    innerRouteInfoViewLeft: {
        borderBottomLeftRadius: 24,
    },
    innerRouteInfoViewRight: {
        borderBottomRightRadius: 24,

    },



    routeImage: {
        position: 'relative',
        height: '100%',
        width: '100%',
    },
    routeInfoText: {
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


