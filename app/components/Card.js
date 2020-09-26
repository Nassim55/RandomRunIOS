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

// SWIPRE RIGHT RO SAVE LOAD A ROUTE SWIPE LEFT TO 

const Card = (props) => {
    const backgroundColor = mixColor(props.position, '#FFFFFF', '#BFC0C0');
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

                <View style={[styles.cardViews, styles.savedRouteImageView]}>
                    <Image
                    style={styles.savedRouteImage}
                    source={{uri: `http://127.0.0.1:8000${props.image}`}}
                    />
                </View>
                <View style={[styles.cardViews, styles.cardBottomView]}>
                    <View style={[styles.bottomViews, styles.bottomViewLeft]}>
                        <View style={[styles.innerBottomView, styles.innerBottomViewTop]}>
                            <Text>Distance</Text>
                        </View>
                        <View  style={[styles.innerBottomView, styles.innerBottomViewBottom]}>
                            <Text style={styles.routeDistance}>{`${parseFloat(props.distanceMeters).toFixed(0)} meters`}</Text>
                        </View>
                    </View>
                    <View style={[styles.bottomViews, styles.bottomViewRight]}>
                        <View style={[styles.innerBottomView, styles.innerBottomViewTop]}>
                            <Text>Duration</Text>
                        </View>
                        <View  style={[styles.innerBottomView, styles.innerBottomViewBottom]}>
                            <Text style={styles.routeDistance}>{`${parseFloat(props.distanceMeters).toFixed(0)} meters`}</Text>
                        </View>
                    </View>
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

    cardViews: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center', 
        width: '100%',
    },
    savedRouteImageView: {
        flex: 9,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        overflow: 'hidden',
    },
    cardBottomView: {
        flex: 2,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        borderTopWidth: 2
    },

    bottomViews: {
        flex: 1,
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    bottomViewLeft: {
        borderBottomLeftRadius: 24,
    },
    bottomViewRight: {
        borderBottomRightRadius: 24,

    },

    innerBottomView: {
        flex: 1,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center', 
        width: '100%',
    },
    innerBottomViewTop: {
        backgroundColor: 'white'
    },
    innerBottomViewBottom: {
        backgroundColor: '#F24E4E'
    },

    savedRouteImage: {
        position: 'relative',
        height: '100%',
        width: '100%',
    },
    routeDistance: {

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