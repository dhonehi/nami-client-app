import React from "react";

import {useFonts} from 'expo-font';

import {Routes} from "./src/router/Routes"

export default function App() {
    const [loaded] = useFonts({
        'Raleway-bold': require('./assets/fonts/Raleway/Raleway-Bold.ttf'),
        'Raleway-light': require('./assets/fonts/Raleway/Raleway-Light.ttf'),
        'Raleway-regular': require('./assets/fonts/Raleway/Raleway-Regular.ttf'),
        'Raleway-medium': require('./assets/fonts/Raleway/Raleway-Medium.ttf')
    });

    if (!loaded) {
        return null
    }

    return (
        <Routes/>
    )
}
