import React from 'react';
import { View, StyleSheet, Dimensions, Text, Image } from 'react-native';
import { mix, mixColor, usePanGestureHandler } from 'react-native-redash/lib/module/v1';
import Animated, { add } from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

import { useSpring } from './Animations';

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
                    source={{
                    uri: '/Users/nassim/Library/Developer/CoreSimulator/Devices/F70A075B-53A5-4A4F-874E-A88A9CDEAE63/data/Containers/Data/Application/96384305-267D-4A90-A9F7-6151FEEDADA9/tmp/ReactNative/0F75771C-EE45-4F39-9527-749632CB8A4A.jpg',
                    }}
                    />
                </View>
                <Text style={styles.routeDistance}> {(props.distanceMeters / 1000).toFixed(2)}KM </Text>
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
    }
})

export default Card;