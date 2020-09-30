import React from 'react';
import { View, StyleSheet, Dimensions, Text, Image, Alert, Pressable,  } from 'react-native';
import { mix, mixColor, step, usePanGestureHandler } from 'react-native-redash/lib/module/v1';
import Animated, { add, Extrapolate, interpolate } from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useSpring } from './Animations';
import LinearGradient from 'react-native-linear-gradient';

import deleteSavedRoute from '../functions/deleteSavedRoute';

const { width: wWidth } = Dimensions.get('window');
const { height: wHeight } = Dimensions.get('window');
const width = wWidth * 0.75;
const height = width * (425 / 294);



// SWIPRE RIGHT RO SAVE LOAD A ROUTE SWIPE LEFT TO 

const Card = (props) => {
    const backgroundColor = mixColor(props.position, '#FFFFFF', '#BFC0C0');
    const translateYCardOffset = mix(props.position, 0 , -115);
    const scale = mix(props.position, 1, 0.85);
    const cardImageOpacity = interpolate(props.position, {
        inputRange: [0, props.step],
        outputRange: [1, 0.25],
        extrapolate: Extrapolate.CLAMP,
    });
    const cardInfoOpacity = interpolate(props.position, {
        inputRange: [0, props.step],
        outputRange: [1, 0],
        extrapolate: Extrapolate.CLAMP,
    });


    const {gestureHandler, translation, velocity, state} = usePanGestureHandler();

    // When the gesture starts again we want to start from the last position instead of resetting:
    const translateX = useSpring({ 
        value: translation.x,
        velocity: velocity.x,
        state,
        snapPoints: [-wWidth, 0, wWidth],
        onSnap: ([x]) => x !== 0 && props.onSwipe(),
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
                transform: [ { scale }, { translateX }, { translateY } ]
            }]} >
                <Pressable onPress={props.onPress}>
                    <View style={[styles.cardViews, styles.routeImageView]}>
                        <Animated.Image
                        source={{uri: `http://127.0.0.1:8000${props.image}`}}
                        style={[styles.routeImage, { opacity: cardImageOpacity }]}
                        />
                    </View>
                </Pressable>
                <Animated.View style={[styles.routeInfo, { opacity: cardInfoOpacity }]}>
                    <LinearGradient
                    colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
                    style={styles.linearGradient}
                    >
                        <View style={styles.textContainer}>
                            <Text style={styles.routeInfoText}>{`${parseFloat(props.distanceMeters).toFixed(0)} meters`}</Text>
                        </View>
                    </LinearGradient>
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
    routeImage: {
        position: 'relative',
        height: '100%',
        width: '100%',
    },

    routeInfo: {
        position: 'absolute',
        bottom: 0,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        overflow: 'hidden',
        width: '100%',
        height: '25%',
    },
    routeInfoText: {
        fontSize: 24,
        fontFamily: 'Raleway-Regular',
        fontWeight: '500',
        color: '#525454',
    },

    linearGradient: {
        position: 'relative',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 10
    },

    textContainer: {
        position: 'relative',
    }
})

export default Card;
