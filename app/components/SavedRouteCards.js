import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, View, Text } from 'react-native';

// Packages:
import { sub } from 'react-native-reanimated';
import { useTransition } from  "react-native-redash/lib/module/v1";
import { useSelector } from 'react-redux';

// Custom components:
import Card from './Card';



const SavedRouteCards = () => {
    const savedRoutesResponse = useSelector(state => state.savedRoutesResponse);
    const cards = savedRoutesResponse.map((element, index) => ({...element, index})).reverse();
    const step = 1 / (cards.length - 1);


    const [currentIndex, setCurrentIndex] = useState(0);
    const aIndex = useTransition(currentIndex);

    console.log(cards)

    return (
        <View style={styles.containerSavedRouteCards}>
            <View style={styles.darkenMap} />
            {cards.map(
                ({ index, distance, image }) =>
                    currentIndex < index * step + step && (
                        <Card 
                        key={index}
                        position={sub(index * step, aIndex)}
                        onSwipe={() => setCurrentIndex(prev => prev + step)}
                        distanceMeters={distance}
                        image={image}
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