import React, {useEffect} from 'react'

import {TouchableOpacity, View, Text, StyleSheet} from "react-native";

import {Feather, SimpleLineIcons, FontAwesome} from "@expo/vector-icons";
import HamburgerSvg from "../icons/HamburgerSvg";

import {connect} from "react-redux";

const HamburgerButton = ({navigation}) => (
    <TouchableOpacity style={[styles.btnWrapper, {marginLeft: 20}]} onPress={() => navigation.openDrawer()}>
        <HamburgerSvg/>
    </TouchableOpacity>
)

const SearchBtn = () => (
    <TouchableOpacity style={[styles.btnWrapper]}>
        <Feather name="search" size={30} color="black"/>
    </TouchableOpacity>
)

const CartBtn = ({userCard, navigation}) => (
    <TouchableOpacity
        onPress={() => navigation.navigate('ProductCard')}
        style={[styles.btnWrapper, styles.cartBtn]}>
        {userCard.length > 0 && <View style={styles.cartDot}/>}
        <SimpleLineIcons name="bag" size={30} color="black"/>
    </TouchableOpacity>
)

const HeaderBtnGroup = (props) => (
    <View style={styles.btnGroup}>
        <SearchBtn/>
        <CartBtn userCard={props.userCard} navigation={props.navigation}/>
    </View>
)

const BackBtn = ({navigation}) => (
    <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.btnWrapper, styles.backBtn]}>
        <FontAwesome name="long-arrow-left" size={24} color="black" />
    </TouchableOpacity>
)

const mapStateToProps = state => {
    return {
        userCard: state.userCard.userCard
    }
}

export default connect(mapStateToProps)(HeaderBtnGroup)
export {HamburgerButton}
export {BackBtn}
export const headerHeight = 90


const styles = StyleSheet.create({
    btnWrapper: {
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 8,
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
        right: 4,
        top: 4,
        backgroundColor: '#1B4965'
    },
    backBtn: {
        marginLeft: 15
    }

})