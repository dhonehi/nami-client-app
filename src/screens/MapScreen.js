import React, {useEffect} from "react";
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';
import {io} from "socket.io-client";

export default function MapScreen() {
    useEffect(() => {
        const socket = io.connect('https://namisushi.ru', {path: '/ws'})
        console.log(socket)

        socket.on('connection', msg => console.log('connection', msg))
        socket.on('errors', msg => console.log('errors', msg))
        socket.on('disconnect', msg => console.log('disconnect', msg))
    }, [])

    const initialCoord = {
        latitude: 48.005414092030264,
        longitude: 37.79913205201336
    }

    return (
        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={{
                latitude: initialCoord.latitude,
                longitude: initialCoord.longitude,
                latitudeDelta: 0.0043,
                longitudeDelta: 0.0034
            }} />
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