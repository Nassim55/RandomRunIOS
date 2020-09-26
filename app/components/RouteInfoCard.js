import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';
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
                    <View style={styles.routeCetailsCardAndSaveContainer}>
                        <View style={styles.routeDetailsCard}>
                            <View style={[styles.cardSegments, styles.cardSegmentLeft]}>
                                <View style={[styles.cardSegmentTextContainer, styles.cardSegmentTextContainerTop]}>
                                    <Text style={styles.cardSegmentTextTop}>Distance</Text>
                                </View>
                                <View style={[styles.cardSegmentTextContainer, styles.cardSegmentTextContainerBottom]}>
                                    <Text style={styles.cardSegmentTextBottom}>{`${props.displayRouteDistance.toFixed(0)} meters`}</Text>
                                </View>
                            </View>
                            <View style={[styles.cardSegments, styles.cardSegmentMiddle]}>
                                <View style={[styles.cardSegmentTextContainer, styles.cardSegmentTextContainerTop]}>
                                    <Text style={styles.cardSegmentTextTop}>Duration</Text>
                                </View>
                                <View style={[styles.cardSegmentTextContainer, styles.cardSegmentTextContainerBottom]}>
                                    <Text style={styles.cardSegmentTextBottom}>{timeString}</Text>
                                </View>
                            </View>
                            <View style={styles.cardSegmentRight}> 
                                <Pressable 
                                onPress={async () => {
                                    const mapImageURI = await props.viewShotRef.current.capture();
                                    saveRoute(props.displayRouteDistance, finalLineString.coordinates.toString(), mapImageURI);
                                }}
                                >
                                    <Text style={styles.cardSegmentTextSave}>Save</Text>
                                </Pressable>
                            </View>
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
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
    },
    routeCetailsCardAndSaveContainer: {
        width: '100%',
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
        backgroundColor: 'white',
        opacity: 0.85,
        margin: 5,
        borderRadius: 15,
        height: 100,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardSegmentRight: {
        height: 90,
        width: 90,
        borderRadius: 45,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '600',
        opacity: 0.85,
        margin: 5,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardSegmentTextContainer: {
        flex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardSegmentTextContainerTop: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    cardSegmentTextContainerBottom: {
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        backgroundColor: '#F24E4E',
    },
    cardSegmentTextTop: {
        fontFamily: 'Raleway-Regular',
        fontSize: 16,
    },
    cardSegmentTextBottom: {
        fontFamily: 'Raleway-Bold',
        fontSize: 16,
        color: 'white'
    },
    cardSegmentTextSave: {
        fontFamily: 'Raleway-Bold',
        color: '#F24E4E',
        fontSize: 16,
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