import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Button } from 'react-native-paper'

// Redux state store imports: 
import { useDispatch, useSelector } from 'react-redux';
import { setRouteDistanceMeters, setMapImageUri } from '../../store/actions';

// Custom functions:
import fetchRouteCoords from '../functions/fetchRouteCoords';
import saveRoute from '../functions/saveRoute';
import setUserLongitudeAndLatitude from '../functions/setUserLongitudeAndLatitude';
import { createNativeWrapper } from 'react-native-gesture-handler';

const RouteInfoCard = (props) => {
    const dispatch = useDispatch();

    // Linestring object representing the random route: 
    const finalLineString = useSelector(state => state.finalRouteLineString);

    // Creating the route duration for an average running speed of 5 meters per second:
    const date = new Date(0);
    date.setSeconds(props.displayRouteDistance.toFixed(0) / 5);
    const timeString = date.toISOString().substr(11, 8);

    return (
        <View style={styles.routeDetails}>
            <View style = {styles.inputAndButtonContainer}>
                <TextInput
                style = {styles.inputDistance}
                placeholder = 'Enter distance in meters...'
                underlineColorAndroid = {'transparent'}
                onChangeText = {text => { if (isNaN(text) === false) dispatch(setRouteDistanceMeters(parseFloat(text)))}}
                />
                <TouchableOpacity 
                style = {styles.generateButton}
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
            {
                finalLineString.coordinates.length > 0 ?
                    <View style = {styles.routeDetailsCard}>
                        <View style={[styles.cardSegments, styles.cardSegmentLeft]}>
                            <Text style={styles.cardSegmentText}>Distance</Text>
                            <Text style={styles.cardSegmentText}>{` ${props.displayRouteDistance.toFixed(0)} meters`}</Text>
                        </View>
                        <View style={[styles.cardSegments, styles.cardSegmentMiddle]}>
                            <Text style={styles.cardSegmentText}>Duration</Text>
                            <Text style={styles.cardSegmentText}>{timeString}</Text>
                        </View>
                        <View style={[styles.cardSegments, styles.cardSegmentRight]}> 

                                <Button
                                uppercase={false}
                                mode="outlined"
                                onPress={async () => {
                                    const mapImageURI = await props.viewShotRef.current.capture();
                                    saveRoute(props.displayRouteDistance, finalLineString.coordinates.toString(), mapImageURI);
                                }}
                                >
                                    Save this route
                                </Button>
                        </View>
                    </View>
                : 
                    null
            }
        </View>
    );
}; 

const styles = StyleSheet.create({
    routeDetails: {
        position: 'absolute',
        bottom: '8%',
        display: 'flex',
        flexDirection: 'column',
        width: '90%',

    },

    routeDetailsCard: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 100

    },
    cardSegments: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '600',
        flex: 1,
        height: '100%',
        padding: 10,
        backgroundColor: 'white',
        opacity: 0.85,
        margin: 5,
        borderRadius: 15,
    },
    cardSegmentText: {
        fontFamily: 'Raleway-Bold'
    },


    inputAndButtonContainer: {
        position: 'relative',
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
        opacity: 0.85,
        overflow: 'hidden',
        marginBottom: '4%',

    },
    inputDistance: {
        flex: 4,
        padding: '4%',
    },
    generateButton: {
        display: 'flex',
        flexDirection: 'row',
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F24E4E',
        elevation: 8,
        padding: '4%',
    },
    generateButtonText: {
        color: 'white',
        marginRight: 10
    }
});

export default RouteInfoCard;