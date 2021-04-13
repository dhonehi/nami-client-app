import React from 'react'
import {Button, Text, View} from "react-native";

export const Register = ({navigation, route}) => {
    return (
        <View>
            <Text>{route.name}</Text>
            <Button title="Go to Login" onPress={() => {
                navigation.goBack()
            }}/>
        </View>
    )
}