import React, {useState} from 'react'
import {Text, TextInput, View, TouchableOpacity, ScrollView, StyleSheet, Alert} from "react-native";
import {ProfileBannerImg} from "../components/ProfileBannerImg";
import {LockIcon, MailIcon} from "../icons/authIcons";

import {RALEWAY_BOLD, RALEWAY_MEDIUM} from "../fonts/fontsTypes";
import Preloader from "../router/components/Preloader";
import {Ionicons} from "@expo/vector-icons";

export const Register = ({navigation}) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const register = () => {
        if (!email.length || !password.length || !confPassword.length || !phone.length || !name.length) {
            Alert.alert('Не все поля заполнены!')
            return
        }

        if (password.length < 6) {
            Alert.alert('Пароль должен состоять не менее чем из 6 символов!')
            return
        }

        if (password !== confPassword) {
            Alert.alert('Пароли не совпадают!')
            return
        }

        setLoading(true)
        fetch('https://namisushi.ru/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({email, password, name, phone})
        })
            .then(response => {
                if (response.ok) {
                    Alert.alert('Регистрация прошла успешно!')
                    navigation.replace('Login')
                } else {
                    if (response.status === 400) Alert.alert('Email уже занят!')
                    else Alert.alert('Что-то пошло не так')
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.content}>
                <ProfileBannerImg/>
                <ScrollView>
                    <View style={styles.inputs}>
                        <View style={styles.inputWrapper}>
                            <View style={{width: 25}}/>
                            <TextInput style={styles.input} value={name} onChangeText={setName}
                                       placeholder="Имя"/>
                        </View>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="call" size={24} color="black"/>
                            <TextInput style={styles.input} value={phone} onChangeText={setPhone}
                                       placeholder="Номер телефона" keyboardType="numeric"/>
                        </View>
                        <View style={styles.inputWrapper}>
                            <MailIcon/>
                            <TextInput style={styles.input} value={email} onChangeText={setEmail}
                                       placeholder="Адрес электронной почты"/>
                        </View>
                        <View style={styles.inputWrapper}>
                            <LockIcon/>
                            <TextInput style={styles.input} value={password} onChangeText={setPassword}
                                       placeholder="Пароль"/>
                        </View>
                        <View style={[styles.inputWrapper, {marginBottom: 10}]}>
                            <LockIcon/>
                            <TextInput style={styles.input} value={confPassword} onChangeText={setConfPassword}
                                       placeholder="Подтвердите пароль"/>
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={register}>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>Регистрация</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.hasAcc}>Уже есть аккаунт?</Text>
                </TouchableOpacity>
            </View>
            {loading && <Preloader/>}
        </View>
    )
}

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
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        width: '100%',
        borderRadius: 4,
        paddingHorizontal: 14,
        marginTop: 15,
        backgroundColor: 'white',
    },
    input: {
        marginLeft: 14,
        width: '100%',
        height: '100%',
    },
    inputs: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    btn: {
        backgroundColor: '#D13C35',
        borderRadius: 4,
        marginBottom: 8,
        height: 42,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        color: 'white',
        fontSize: 18,
        fontFamily: RALEWAY_BOLD
    },
    hasAcc: {
        color: 'white',
        fontSize: 13,
        fontFamily: RALEWAY_MEDIUM,
        marginBottom: 15,
        textAlign: 'center'
    }
})