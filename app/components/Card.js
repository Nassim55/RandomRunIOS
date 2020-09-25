import React from 'react';
import { View, StyleSheet, Dimensions, Text, Image, Alert } from 'react-native';
import { mix, mixColor, usePanGestureHandler } from 'react-native-redash/lib/module/v1';
import Animated, { add } from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useSpring } from './Animations';

import deleteSavedRoute from '../functions/deleteSavedRoute';

const { width: wWidth } = Dimensions.get('window');
const width = wWidth * 0.75;
const height = width * (425 / 294);



const Card = (props) => {
    const backgroundColor = mixColor(props.position, '#fbd2d2', '#f8a6a6');
    const translateYCardOffset = mix(props.position, 0 , -55);
    const scale = mix(props.position, 1, 0.9);

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
        useSpring({ value: translation.y, velocity: velocity.y, state, snapPoints: [0]})
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
                
                <View style={styles.routeImageAndDetailsContainer}>
                    <Image
                    style={styles.mapImage}
                    source={{uri: `http://127.0.0.1:8000${props.image}`}}
                    />
                </View>
                <Text style={styles.routeDistance}> {(props.distanceMeters / 1000).toFixed(2)}KM </Text>
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
                                    onPress: () => deleteSavedRoute(),
                                }
                            ],
                            { cancelable: false }
                          );
                    }}
                    />  
                </View>
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
    routeImageAndDetailsContainer: {
        height: '100%',
        width: '100%',
        borderRadius: 24,
    },
    mapImage: {
        position: 'relative',
        height: '100%',
        width: '100%',
        borderRadius: 24,
    },
    routeDistance: {
        position: 'absolute',
        bottom: '10%',
    },
    deleteRouteButton: {
        position: 'absolute',
        top: '5%',
        right: '5%',
    },
})

export default Card;