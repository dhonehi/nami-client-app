import React from "react";
import {TouchableOpacity} from "react-native"
import { Feather } from '@expo/vector-icons';

const Button = ({iconName, onPress}) => (
    <TouchableOpacity onPressOut={onPress}>
        <Feather name={iconName} size={80} color="white"/>
    </TouchableOpacity>
)

export default Button