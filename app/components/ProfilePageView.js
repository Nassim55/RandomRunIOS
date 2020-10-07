import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Image, Dimensions } from 'react-native';

import { useDispatch } from 'react-redux';
import { setIsProfileShown, setIsMapShown } from '../../store/actions';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import ImagePicker from 'react-native-image-picker';
import Animated, { Extrapolate, interpolate } from 'react-native-reanimated';
import { useTransition } from  "react-native-redash/lib/module/v1";

const height = Dimensions.get('window').height
console.log(height)

const ProfilePageView = (props) => {
    const dispatch = useDispatch();

    const options = {
        title: 'Select a Profile Picture',
        storageOptions: { skipBackup: true, path: 'images' },
    };


    const [isProfileEditShown, setIsProfileEditShown] = useState(false);
    const [profileImageSource, setProfileImageSource] = useState({ uri: '/Users/nassim/Documents/RandomRunIOS/images/profilePic.jpeg' })

    const transition = useTransition(isProfileEditShown, { duration: 400 })
    const translateYTop = interpolate(transition, {
        inputRange: [0, 1],
        outputRange: [0, -height],
        extrapolate: Extrapolate.CLAMP,
    });
    const translateYBottom = interpolate(transition, {
        inputRange: [0, 1],
        outputRange: [height, 0],
        extrapolate: Extrapolate.CLAMP,
    });




    return (
        <View style={styles.viewContainer}>
            <Pressable
            style={styles.darkenMap}
            onPress={() => {
                dispatch(setIsProfileShown(false));
                dispatch(setIsMapShown(true));
            }}
            />
                <View style={styles.savedRoutesTitleContainer}>
                    <Text style={styles.savedRoutesText}>Profile</Text>
                    <Text style={styles.savedRoutesTextInfo}>View your profile information</Text>
                    <Text style={styles.savedRoutesTextInfo}>Tap on the cog to edit your profile</Text>
                </View>
                <View style={styles.card}>
                    <View style={[styles.cardInnerViews, styles.settingsIconView]}>
                        <Pressable onPress={() => setIsProfileEditShown(!isProfileEditShown)}>
                            <SimpleLineIcons name='settings' size={24} />
                        </Pressable>
                    </View>
                    <Animated.View style={[styles.cardInnerViews, styles.profileInfoView, {
                        transform: [{translateY: translateYTop}]
                    }]}>
                        <Pressable 
                        style={styles.profileImageView}
                        onPress={() => {
                            ImagePicker.showImagePicker(options, (response) => {                              
                                if (response.didCancel) {
                                    console.log('User cancelled image picker');
                                } else if (response.error) {
                                    console.log('ImagePicker Error: ', response.error);
                                } else {
                                    const source = { uri: response.uri };
                                    setProfileImageSource(source)
                                    console.log(source);
                                    // Would then send the image to the database, do a GET request
                                    // for account information, update state, then UI would re-render
                                    // to reflect this update in state...
                                }
                            });
                        }}
                        >
                            <Image
                            source={profileImageSource}
                            style={styles.profileImage}
                            />
                        </Pressable>
                        <View style={styles.usernameView}>
                            <Text style={styles.username}>nassim</Text>
                            <Text style={styles.dateJoined}>Joined September 2020</Text>
                        </View>
                    </Animated.View>
                    <Animated.View style={[styles.cardInnerViews, styles.profileInfoView, {
                        transform: [{translateY: translateYBottom}]
                    }]}>
                        <View style={styles.profileImageAndNameView}>
                            <Pressable
                            style={styles.profileImage}
                            onPress={() => {
                                ImagePicker.showImagePicker(options, (response) => {                              
                                    if (response.didCancel) {
                                        console.log('User cancelled image picker');
                                    } else if (response.error) {
                                        console.log('ImagePicker Error: ', response.error);
                                    } else {
                                        const source = { uri: response.uri };
                                        setProfileImageSource(source)
                                        console.log(source);
                                        // Would then send the image to the database, do a GET request
                                        // for account information, update state, then UI would re-render
                                        // to reflect this update in state...
                                    }
                                });
                            }}
                            >
                                <Image
                                source={profileImageSource}
                                style={styles.profileImage}
                                />
                            </Pressable>
                            <View style={styles.usernameView}>
                                <Text style={styles.username}>nassim</Text>
                                <Text style={styles.dateJoined}>Joined September 2020</Text>
                            </View>
                        </View>
                    </Animated.View>
                </View>
        </View>
    );
};


const styles = StyleSheet.create({
    viewContainer: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },

    darkenMap: {
        position: 'absolute',
        backgroundColor: 'black',
        opacity: 0.7,
        height: '100%',
        width: '100%',
    },

    savedRoutesTitleContainer: {
        position: 'absolute',
        top: '5.5%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    savedRoutesText: {
        position: 'relative',
        color: 'white',
        fontFamily: 'Raleway-Regular',
        fontSize: 32,
    },
    savedRoutesTextInfo: {
        color: 'white',
        fontFamily: 'Raleway-Regular',
        fontSize: 18,
    },

    card: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '60%',
        width: '75%',
        backgroundColor: 'white',
        borderRadius: 24,
        overflow: 'hidden'
    },

    cardInnerViews: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 20,
        paddingRight: 20,
    },
    settingsIconView: {
        position: 'relative',
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
        alignItems: 'flex-end',
        padding: 10,

        zIndex: 999
    },
    profileInfoView: {
        position: 'absolute',
        height: '100%',
        borderRadius: 24,
        alignItems: 'center',
        borderWidth: 1
    },



    profileImageAndNameView: {
        flex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    usernameView: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    username: {
        fontFamily: 'Raleway-Regular',
        fontSize: 24
    },
    dateJoined: {
        fontFamily: 'Raleway-Regular',
        fontSize: 16
    },

    profileImage: {
        height: 220,
        width: 220,
        borderRadius: 110,
    },

})


export default ProfilePageView