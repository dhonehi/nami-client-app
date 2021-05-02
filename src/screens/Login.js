import React, {useState} from 'react'
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {ProfileBannerImg} from "../components/ProfileBannerImg";
import {RALEWAY_BOLD} from "../fonts/fontsTypes";

import {connect} from "react-redux";

import {LockIcon, MailIcon} from "../icons/authIcons";
import Preloader from "../router/components/Preloader";
import {login} from "../store/actions/auth";

const Login = ({login}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const getSessionId = (cookie) => {
        return cookie.split(';')[0].slice(10)
    }

    const logIn = () => {
        if (!email.length || !password.length) {
            Alert.alert('Не все поля заполнены!')
            return
        }

        setLoading(true)
        fetch('https://namisushi.ru/api/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({email, password})
        })
            .then(async response => {
                if (!response.ok) {
                    if (response.status === 400) Alert.alert('Неверный email или пароль!')
                    else Alert.alert('Что-то пошло не так!')
                } else {
                    return {
                        userInfo: await response.json(),
                        sessionId: getSessionId(response.headers.get('set-cookie'))
                    }
                }
            })
            .then(responseJson => {
                if (responseJson) {
                    login(responseJson)
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
                <TouchableOpacity onPress={logIn}>
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