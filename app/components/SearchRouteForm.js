import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';

// Library imports:
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useSpring, animated } from 'react-spring/native';

// Redux state store imports: 
import { useDispatch, useSelector } from 'react-redux';
import { setRouteDistanceMeters, setIsUserInfoMenuOpen } from '../../store/actions';

// Custom functions:
import fetchRouteCoords from '../functions/fetchRouteCoords';
import saveRoute from '../functions/saveRoute';

// Custom components:
import UserInfoMenu from './UserInfoMenu';


const SearchRouteForm = (props) => {
    // Creating a dispatch to allow the Redux state to be updated:
    const dispatch = useDispatch();

    // Defining variables from Redux state:
    const finalLineString = useSelector(state => state.finalRouteLineString);
    const userID = useSelector(state => state.userAccountDetails.id);
    const mostNorthEasternCoordinates = useSelector(state => state.mostNorthEasternCoordinates);
    const mostSouthWesternCoordinates = useSelector(state => state.mostSouthWesternCoordinates);

    // Creating the route duration for an average running speed of 5 meters per second:
    const date = new Date(0);
    date.setSeconds(props.displayRouteDistance.toFixed(0) / 5);
    const timeString = date.toISOString().substr(11, 8);
    


    const isUserInfoMenuOpen = useSelector(state => state.isUserInfoMenuOpen);

    

    const fade = useSpring({
        opacity: isUserInfoMenuOpen ? 1 : 0
    })
    const hamburgerColour = useSpring({
        backgroundColor: isUserInfoMenuOpen ? '#F24E4E' : 'white'
    })

    const AnimatedView = animated(View);
    const AnimatedPressable = animated(Pressable);


    

    return (
        <View style={styles.SearchRouteForm}>
            <View style={styles.inputAndButtonContainer}>
                <AnimatedPressable 
                style={[styles.hamburger, {...hamburgerColour}]}
                onPress={() => dispatch(setIsUserInfoMenuOpen(!isUserInfoMenuOpen))}
                >
                    {
                        isUserInfoMenuOpen ?
                        <SimpleLineIcons name='arrow-up' size={24} color='white'/>
                        :
                        <SimpleLineIcons name='menu' size={24} />
                    }
                </AnimatedPressable>
                <TextInput
                style={styles.inputDistance}
                placeholder = 'Distance in meters...'
                underlineColorAndroid = {'transparent'}
                onChangeText = {text => { if (isNaN(text) === false) dispatch(setRouteDistanceMeters(parseFloat(text)))}}
                />
                <TouchableOpacity 
                style={styles.generateButton}
                onPress={() => {
                    fetchRouteCoords( 
                        props.isLocationPermissionGranted, 
                        dispatch,
                        props.originLongitude,
                        props.originLatitude,
                        props.routeDistanceMeters,
                    );
                }}
                >   
                    
                    <Text style= {styles.generateButtonText}>Calculate Route</Text>
                    <SimpleLineIcons name='rocket' size={24} color='white'/>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    SearchRouteForm: {
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginBottom: 15
    },
    inputAndButtonContainer: {
        position: 'relative',
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        opacity: 0.85,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,

    },


    inputDistance: {
        position: 'relative',
        flex: 4,
        padding: '4%',
    },
    generateButton: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F24E4E',
        elevation: 8,
        padding: '4%',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    hamburger: {
        position: 'relative',
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },



    generateButtonText: {
        color: 'white',
        marginRight: 10
    },


    saveButtonContainer: {
        width: '90%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: '1%',
        opacity: 0.85,
    },
    saveButtonText: {
        fontFamily: 'Raleway-Regular',
        fontSize: 16,
    }
})


export default SearchRouteForm;




