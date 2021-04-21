import React from "react";
import {Text, TouchableOpacity, View, StyleSheet} from "react-native";

import {RALEWAY_BOLD} from "../../fonts/fontsTypes";

import {MenuIcon, OrdersIcon, ProfileIcon} from "../../icons/tabIcons";

export default function MyTabBar({state, descriptors, navigation}) {
    const index = state?.routes[0]?.state?.index
    const isProductCard = state?.routes[0]?.state?.routes?.find(route => route.name === 'ProductCard') !== undefined
    if (index >= 0) {
        const currentRoute = state.routes[0].state.routeNames[index]
        if (currentRoute === 'ProductItem' && !isProductCard) return <View/>
    }

    return (
        <View style={[styles.tabBarContainer, {backgroundColor: isProductCard ? '#E5E5E5' : 'white'}]}>
            {state.routes.map((route, index) => {
                const {options} = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = state.index === index && !isProductCard;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                if (isFocused) {
                    return (
                        <View style={styles.focusedItem} key={index}>
                            <Text style={styles.label}>{label}</Text>
                            <View style={styles.circle}/>
                        </View>
                    )
                } else {
                    return (
                        <TouchableOpacity
                            key={index}
                            accessibilityRole="button"
                            onPress={onPress}
                        >
                            {label === 'Меню' && <MenuIcon/>}
                            {label === 'Профиль' && <ProfileIcon/>}
                        </TouchableOpacity>
                    );
                }
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    tabBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 80,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    focusedItem: {
        alignItems: 'center'
    },
    circle: {
        width: 5,
        height: 5,
        borderRadius: 50,
        backgroundColor: '#1B4965',
        marginTop: 9
    },
    label: {
        fontSize: 14,
        color: '#1B4965',
        fontFamily: RALEWAY_BOLD
    },
})