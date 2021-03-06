import React, {useEffect} from "react";
import {View, Text, Image, TouchableOpacity, StyleSheet} from "react-native";

import {Entypo} from '@expo/vector-icons';

import {connect} from "react-redux";

import {ProfileBannerImg} from "../components/ProfileBannerImg";
import UserProfile from "../components/UserProfile";
import {RALEWAY_BOLD, RALEWAY_EXTRA_BOLD, RALEWAY_MEDIUM} from "../fonts/fontsTypes";

const ProfileScreen = ({navigation, isLoggedIn}) => {
    if (isLoggedIn) return <UserProfile />

    else
        return (
            <View style={styles.wrapper}>
                <View style={styles.content}>
                    <ProfileBannerImg/>
                    <View style={styles.mainContent}>
                        <Text style={styles.title}>Давайте познакомимся!</Text>
                        <Text style={styles.description}>Самые вкусные и выгодные постоянные акции и скидки ждут вашего
                            звонка! <Entypo name="heart" size={18} color="#DC1616"/></Text>
                        <View style={styles.btns}>
                            <TouchableOpacity style={styles.btn} onPress={() => navigation.push('Login')}>
                                <Text style={styles.btnText}>Вход в систему</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.btn, {marginBottom: 20}]}
                                              onPress={() => navigation.push('Register')}>
                                <Text style={styles.btnText}>Зарегистрироваться</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Image style={styles.wavesImg} source={require('../../assets/waves.png')}/>
            </View>
        )
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    }
}

export default connect(mapStateToProps)(ProfileScreen)

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        flex: 1
    },
    content: {
        flex: 1,
        backgroundColor: '#214d67',
        paddingHorizontal: 15,
        paddingTop: 30,
    },
    mainContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        marginTop: 10
    },
    banner: {
        width: '100%',
        borderRadius: 4,
        height: 100,
    },
    wavesImg: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%'
    },
    title: {
        fontSize: 14,
        fontFamily: RALEWAY_EXTRA_BOLD,
        color: '#070707'
    },
    description: {
        marginTop: 12,
        fontSize: 14,
        fontFamily: RALEWAY_MEDIUM,
        textAlign: 'center',
        lineHeight: 30,
        color: '#070707',
        width: 250,
    },
    btns: {
        marginTop: 20,
        width: '90%'
    },
    btn: {
        marginTop: 14,
        height: 40,
        backgroundColor: '#1B4965',
        borderRadius: 4,
        width: '100%',
        zIndex: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        fontSize: 14,
        fontFamily: RALEWAY_BOLD,
        color: 'white'
    }


})