import React, {useEffect, useState} from "react";
import MapView, {Marker} from 'react-native-maps';
import {StyleSheet, View, Dimensions} from 'react-native';

import {connectToWs} from "../api/api";

export default function MapScreen({route: {params: {sessionId}}}) {
    const initialCoordinates = {
        latitude: 48.005414092030264,
        longitude: 37.79913205201336,
        latitudeDelta: 0.0043,
        longitudeDelta: 0.0034
    }

    const [region, setRegion] = useState(initialCoordinates)
    const [courierCoordinates, setCourierCoordinates] = useState({
        latitude: initialCoordinates.latitude,
        longitude: initialCoordinates.longitude
    })


    const getCourierCoordinatesHandler = (coordinates) => {
        const newCoordinates = {
            latitude: coordinates[0],
            longitude: coordinates[1]
        }

        setCourierCoordinates(newCoordinates)
        setRegion({
            ...newCoordinates,
            latitudeDelta: initialCoordinates.latitudeDelta,
            longitudeDelta: initialCoordinates.longitudeDelta
        })
    }

    useEffect(() => {
        let intervalId

        let socket = connectToWs(sessionId)

        socket.on('connection', () => console.log('connection'))
        socket.on('coordinates', (coordinate) => getCourierCoordinatesHandler(coordinate))
        socket.on('errors', msg => console.log('errors', msg))
        socket.on('disconnect', msg => console.log('disconnect', msg))

        intervalId = setInterval(() => socket.emit('coordinates'), 10000)

        return () => {
            clearInterval(intervalId)
            socket.disconnect()
            socket = null
        }
    }, [])

    return (
        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={initialCoordinates} region={region}>
                <Marker coordinate={{latitude: courierCoordinates.latitude, longitude: courierCoordinates.longitude}} />
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});