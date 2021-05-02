import React from "react";

import {useFonts} from 'expo-font';

import {Provider} from "react-redux";

import {Routes} from "./src/router/Routes"

import configureStore from "./src/store/store";

import {io} from "socket.io-client";

const store = configureStore()

const socket = io.connect('https://namisushi.ru', {path: '/ws'})

socket.on('connection', msg => console.log('connection', msg))
socket.on('errors', msg => console.log('errors', msg))
socket.on('disconnect', msg => console.log('disconnect', msg))

export default function App() {
    const [loaded] = useFonts({
        'Raleway-bold': require('./assets/fonts/Raleway/Raleway-Bold.ttf'),
        'Raleway-light': require('./assets/fonts/Raleway/Raleway-Light.ttf'),
        'Raleway-regular': require('./assets/fonts/Raleway/Raleway-Regular.ttf'),
        'Raleway-medium': require('./assets/fonts/Raleway/Raleway-Medium.ttf'),
        'Raleway-extra-bold': require('./assets/fonts/Raleway/Raleway-ExtraBold.ttf')
    });

    if (!loaded) {
        return null
    }

    return (
        <Provider store={store}>
            <Routes/>
        </Provider>
    )
}
