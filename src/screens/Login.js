import React, {useState} from 'react'
import {Text, TouchableOpacity, View, StyleSheet, TextInput, Alert} from "react-native";
import {ProfileBannerImg} from "../components/ProfileBannerImg";
import {RALEWAY_BOLD} from "../fonts/fontsTypes";

import {connect} from "react-redux";

import {MailIcon, LockIcon} from "../icons/authIcons";
import Preloader from "../router/components/Preloader";
import {login} from "../store/actions/auth";

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const login = () => {
        if (!email.length || !password.length) {
            Alert.alert('Не все поля заполнены!')
            return
        }

        setLoading(true)
        fetch('https://namisushi.ru/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({email, password})
        })
            .then(response => {
                if (response.ok) return response.json()
                else Alert.alert('Неверный логин или пароль!')
            })
            .then(responseJson => {
                console.log(responseJson)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.content}>
                <ProfileBannerImg/>
                <View style={styles.inputs}>
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
                </View>
                <TouchableOpacity onPress={login}>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>Войти в систему</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {loading && <Preloader/>}
        </View>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        login: (userInfo) => {
            dispatch(login(userInfo))
        },
    }
}

export default connect(null, mapDispatchToProps)(Login)

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
        marginTop: 25,
        backgroundColor: 'white',
    },
    input: {
        marginLeft: 14,
        width: '100%',
        height: '100%',
    },
    inputs: {
        flex: 1,
        justifyContent: 'center'
    },
    btn: {
        backgroundColor: '#D13C35',
        borderRadius: 4,
        marginBottom: 60,
        height: 42,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        color: 'white',
        fontSize: 18,
        fontFamily: RALEWAY_BOLD
    }

})