import React, {useEffect, useRef} from "react";
import {Animated} from "react-native";

export default function TranslateAnim ({children, styles, settings})  {
    const animateState = {
        start: settings.start,
        end: settings.end
    }

    const value = useRef(new Animated.Value(animateState.start)).current

    const startAnimate = () => {
        Animated.timing(value, {
            toValue: animateState.end,
            useNativeDriver: true,
            duration: settings.duration,
        }).start()
    }

    const inputRange = [animateState.start, animateState.end]
    let translateY = value.interpolate({inputRange, outputRange: settings.translate})
    let opacity = value.interpolate({inputRange, outputRange: settings.opacity})

    startAnimate()

    return (
        <Animated.View style={[{transform: [{translateY: translateY}], opacity}, {...styles}]}>
            {children}
        </Animated.View>
    )
}