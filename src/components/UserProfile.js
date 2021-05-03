import React, {useState} from "react";
import MapView from 'react-native-maps'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Alert,
    Dimensions,
    ScrollView
} from "react-native";
import {RALEWAY_BOLD, RALEWAY_MEDIUM} from "../fonts/fontsTypes";
import {Entypo, Ionicons, MaterialIcons} from '@expo/vector-icons';

import {connect} from "react-redux";

import ImagePicker from '../components/ImagePicker'
import {logout, setUserInfo} from "../store/actions/auth";
import {signout} from "../api/api";
import Preloader from "../router/components/Preloader";

import {patchUserInfo, getUserInfo} from "../api/api";

const UserProfile = ({userInfo, sessionId, logoutFromAcc, setUserInfo}) => {
    const [imageUri, setImageUri] = useState(userInfo?.avatar || null)

    const [userName, setUserName] = useState(userInfo?.name || '')
    const [phone, setPhone] = useState(userInfo?.phone || '')
    const [addresses, setAddresses] = useState(userInfo?.addresses.length ?
        userInfo.addresses :
        [{
            address: '',
            alias: ''
        }])
    const [loading, setLoading] = useState(false)

    const phoneChangedHandler = (text, i) => {
        const addressesTmp = [...addresses]
        addressesTmp[i].address = text
        setAddresses(addressesTmp)
    }

    const addNewAddress = () => {
        const addressesTmp = [...addresses, {address: '', alias: ''}]
        setAddresses(addressesTmp)
    }

    const removeAddressValue = (i) => {
        const addressesTmp = [...addresses]
        addressesTmp[i] = ''
        setAddresses(addressesTmp)
    }

    const removePhoneNumber = () => {
        setPhone('')
    }

    const getImageUriData = () => {
        let localUri = imageUri
        let filename = localUri.split('/').pop()

        let match = /\.(\w+)$/.exec(filename)
        let type = match ? `image/${match[1]}` : `image`

        return {uri: localUri, name: filename, type}
    }

    const signoutFromAcc = () => {
        signout(sessionId)
        logoutFromAcc()
    }

    const onPickImage = (uri) => {
        setImageUri(uri)
    }

    const onDelete = () => {
        setImageUri(null)
    }

    const patchUser = () => {
        if (!userName) Alert.alert('Внимание', 'Имя не может быть пустым!')
        else {
            const requestData = {
                name: userName
            }

            requestData.avatar = imageUri ? getImageUriData().uri : ''
            requestData.phone = phone

            const availableAddresses = []
            if (addresses.length !== 1 || addresses[0].address) {
                addresses.forEach(address => {
                    if (address.address) availableAddresses.push({
                        address: address.address,
                        alias: address.address
                    })
                })
            }

            requestData.addresses = availableAddresses

            const formData = new FormData()
            formData.append('data', JSON.stringify(requestData))

            setLoading(true)

            patchUserInfo(formData, sessionId).then(response => {
                if (response.ok) {
                    getUserInfo(sessionId)
                        .then(response => {
                            return response.json()
                        })
                        .then(responseJson => {
                            console.log(responseJson)
                            setUserInfo(responseJson)
                            Alert.alert('Успешно!', 'Данные профиля успешно обновлены')
                        }).finally(() => {
                        setLoading(false)
                    })
                } else {
                    setLoading(false)
                }
            })

        }
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.header}>
                <Text style={styles.title}>Мой профиль</Text>
                <View style={styles.logoutWrapper}>
                    <View style={styles.verticalDivider}/>
                    <TouchableOpacity onPress={signoutFromAcc}>
                        <Text style={styles.logoutBtn}>Выйти</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.avatarWrapper}>
                <ImagePicker onPick={onPickImage} onDelete={onDelete} imageUri={imageUri}/>
            </View>
            <ScrollView style={{flex: 1}}>
                <View style={styles.userInfoSection}>
                    <Text style={styles.userInfoTitle}>Информация</Text>
                    <View style={styles.inputWrapper}>
                        <View style={{width: 25}}/>
                        <TextInput style={styles.input} value={userName} onChangeText={setUserName}
                                   placeholder="Ваше имя"/>
                    </View>
                    <View style={styles.inputWrapper}>
                        <View style={{width: 25}}/>
                        <TextInput style={styles.input} editable={false} value="superadmin@gmail.com"
                                   placeholder="Email"/>
                        <MaterialIcons name="lock" size={15} color="#8A8A8A"/>
                    </View>
                </View>
                <View style={styles.userInfoSection}>
                    <Text style={styles.userInfoTitle}>Контакты. Телефон</Text>
                    <View style={styles.inputWrapper}>
                        <Ionicons name="call" size={24} color="black"/>
                        <TextInput style={styles.input} value={phone} onChangeText={setPhone}
                                   placeholder="Номер телефона" keyboardType="numeric"/>
                        <TouchableOpacity onPress={removePhoneNumber}>
                            <Ionicons name="md-trash-outline" size={24} color="black"/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.userInfoSection, {flex: 1}]}>
                    <Text style={styles.userInfoTitle}>Контакты. Адрес доставки</Text>
                    {addresses.map((address, i) =>
                        <View style={styles.inputWrapper} key={i}>
                            <MaterialIcons name="home" size={24} color="black"/>
                            <TextInput style={styles.input} value={address.address}
                                       onChangeText={(text) => phoneChangedHandler(text, i)}
                                       placeholder="Адрес"/>
                            <TouchableOpacity onPress={() => removeAddressValue(i)}>
                                <Ionicons name="md-trash-outline" size={24} color="black"/>
                            </TouchableOpacity>
                        </View>
                    )}
                    {addresses.length <= 3 &&
                    <TouchableOpacity style={styles.addBtn} onPress={addNewAddress}>
                        <Entypo name="plus" size={15} color="white"/>
                        <Text style={styles.addBtnText}>Добавить еще один адрес</Text>
                    </TouchableOpacity>}
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.saveBtn} onPress={patchUser}>
                <Text style={styles.saveBtnText}>Сохранить</Text>
            </TouchableOpacity>
            {loading && <Preloader/>}
        </View>
    )

    /* return (
         <View style={styles.container}>
             <MapView style={styles.map} />
         </View>
     )*/
}

const mapStateToProps = state => {
    return {
        userInfo: state.auth.userInfo,
        sessionId: state.auth.sessionId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logoutFromAcc: () => {
            dispatch(logout())
        },
        setUserInfo: userInfo => {
            dispatch(setUserInfo(userInfo))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: '#214d67',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    header: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontFamily: RALEWAY_MEDIUM,
        fontSize: 20,
        marginLeft: 15,
        color: 'white'
    },
    logoutWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    verticalDivider: {
        width: 2,
        height: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.6)'
    },
    logoutBtn: {
        marginLeft: 14,
        fontFamily: RALEWAY_MEDIUM,
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.6);'
    },
    avatarWrapper: {
        marginTop: 50,
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    userInfoSection: {
        marginTop: 20
    },
    userInfoTitle: {
        fontFamily: RALEWAY_MEDIUM,
        fontSize: 15,
        color: 'white'
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
        width: '100%',
        borderRadius: 4,
        paddingHorizontal: 14,
        marginTop: 15,
        backgroundColor: 'white',
    },
    input: {
        marginLeft: 14,
        flex: 1,
        height: '100%',
    },
    addBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        marginLeft: 18
    },
    addBtnText: {
        fontFamily: RALEWAY_MEDIUM,
        fontSize: 13,
        color: 'white',
        marginLeft: 11
    },
    saveBtn: {
        height: 42,
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D13C35',
        borderRadius: 4
    },
    saveBtnText: {
        fontFamily: RALEWAY_BOLD,
        fontSize: 14,
        color: 'white'
    }
})