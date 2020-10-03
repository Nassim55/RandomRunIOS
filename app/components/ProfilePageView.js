import React from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';

import { useDispatch } from 'react-redux';
import { setIsProfileShown, setIsMapShown } from '../../store/actions';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';




const ProfilePageView = (props) => {
    const dispatch = useDispatch();

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
                    <Text style={styles.savedRoutesTextInfo}>View and edit your profile information</Text>
                </View>
                <View style={styles.card}>
                    <View style={[styles.cardInnerViews, styles.settingsIconView]}>
                        <Pressable                    >
                            <SimpleLineIcons name='settings' size={24} />
                        </Pressable>
                    </View>
                    <View style={[styles.cardInnerViews, styles.profileInfoView]}>
                        <View style={styles.profileImageView}>
                            <Image
                            source={{ uri: '/Users/nassim/Documents/RandomRunIOS/images/landingPageBackground.jpg' }}
                            style={styles.profileImage}
                            />
                        </View>
                        <View style={styles.usernameView}>
                            <Text style={styles.username}>nassim</Text>
                            <Text style={styles.dateJoined}>Joined September 2020</Text>
                        </View>
                    </View>

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
        justifyContent: 'center',
        alignItems: 'center',
        height: '60%',
        width: '75%',
        backgroundColor: 'white',
        borderRadius: 24,
    },

    cardInnerViews: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    settingsIconView: {
        flex: 1,
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
        alignItems: 'flex-end',
    },
    profileInfoView: {
        flex: 8,
        alignItems: 'center', 
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24
    },



    profileImageView: {
        flex: 3,
        width: '100%',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    usernameView: {
        flex: 1,
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