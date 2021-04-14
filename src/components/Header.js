import React from 'react'

import {TouchableOpacity, View, StyleSheet} from "react-native";

import {Feather, SimpleLineIcons } from "@expo/vector-icons";
import HamburgerSvg from "./HamburgerSvg";

export const HamburgerButton = ({navigation}) => (
    <TouchableOpacity style={[styles.btnWrapper, {marginLeft: 20}]} onPress={() => navigation.openDrawer()}>
        <HamburgerSvg />
    </TouchableOpacity>
)

export const HeaderBtnGroup = () => (
    <View style={styles.btnGroup}>
        <SearchBtn />
        <CartBtn />
    </View>
)

const SearchBtn = () => (
    <TouchableOpacity style={[styles.btnWrapper]}>
        <Feather name="search" size={30} color="black"/>
    </TouchableOpacity>
)

const CartBtn = () => (
    <TouchableOpacity style={[styles.btnWrapper, styles.cartBtn]}>
        <View style={styles.cartDot} />
        <SimpleLineIcons name="bag" size={30} color="black" />
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    btnWrapper: {
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 4,
        backgroundColor: 'white'
    },
    btnGroup: {
        marginRight: 30,
        flexDirection: 'row'
    },
    cartBtn: {
        marginLeft: 30,
        position: 'relative'
    },
    cartDot: {
        position: 'absolute',
        width: 6,
        height: 6,
        borderRadius: 10,
        right: 3,
        top: 3,
        backgroundColor: '#1B4965'
    }

})