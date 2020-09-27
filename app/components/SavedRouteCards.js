import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Alert } from 'react-native';

// Packages:
import { sub } from 'react-native-reanimated';
import { useTransition } from  "react-native-redash/lib/module/v1";
import { useDispatch, useSelector } from 'react-redux';

// Custom components:
import Card from './Card';

// Custom function imports:
import { setIsRouteCardsShown } from '../../store/actions';
import deleteSavedRoute from '../functions/deleteSavedRoute';



const SavedRouteCards = () => {
    const dispatch = useDispatch();


    const savedRoutesResponse = useSelector(state => state.savedRoutesResponse);
    const cards = savedRoutesResponse.map((element, index) => ({...element, index})).reverse();
    const step = 1 / (cards.length - 1);


    const [currentIndex, setCurrentIndex] = useState(0);
    const aIndex = useTransition(currentIndex);

    return (
        <View style={styles.containerSavedRouteCards}>
            <Pressable
            style={styles.darkenMap}
            onPress={() => dispatch(setIsRouteCardsShown(false))}
            />
            {cards.map(
                ({ index, distance, image, id }) =>
                    currentIndex < index * step + step && (
                        <Card 
                        key={index}
                        position={sub(index * step, aIndex)}
                        onSwipeLeft={() => setCurrentIndex(prev => prev + step)}
                        onSwipeRight={() => {
                            setCurrentIndex(prev => prev + step);
                        }}
                        onSwipeDown={() => {
                            setCurrentIndex(prev => prev + step);
                            Alert.alert(
                                'Delete this route?',
                                'Are you sure you want to permanently delete this route?',
                                [
                                    { 
                                        text: 'Keep',
                                        style: 'cancel',
                                        onPress: () => setCurrentIndex(prev => prev - step),
                                    },
                                    { 
                                        text: 'Delete',
                                        style: 'destructive',
                                        onPress: () => deleteSavedRoute(id),
                                    }
                                ],
                                { cancelable: false }
                            );
                        }}
                        distanceMeters={distance}
                        image={image}
                        step={step}
                        />
                )
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    containerSavedRouteCards: {
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
        opacity: 0.5,
        height: '100%',
        width: '100%',
    }
})

export default SavedRouteCards;