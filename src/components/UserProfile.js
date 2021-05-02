import React, {useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
    AsyncStorage,
    Alert,
    ScrollView
} from "react-native";
import {RALEWAY_BOLD, RALEWAY_MEDIUM} from "../fonts/fontsTypes";
import {Entypo, Ionicons, MaterialIcons} from '@expo/vector-icons';

import {connect} from "react-redux";

import ImagePicker from '../components/ImagePicker'

const UserProfile = ({userInfo}) => {
    let imageUri = userInfo?.picture || null

    const [userName, setUserName] = useState('')
    const [phone, setPhone] = useState('')
    const [addresses, setAddresses] = useState([''])

    const phoneChangedHandler = (text, i) => {
        const addressesTmp = [...addresses]
        addressesTmp[i] = text
        setAddresses(addressesTmp)
    }

    const addNewAddress = () => {
        const addressesTmp = [...addresses, '']
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

    const onPickImage = (uri) => {
        imageUri = uri
    }

    const patchUserInfo = () => {
        if (!userName) Alert.alert('Внимание', 'Имя не может быть пустым!')
        else {
            const requestData = new FormData()

            requestData.append('name', userName)
            if (imageUri) requestData.append('picture', imageUri)
            if (phone) requestData.append('phone', phone)

            const availableAddresses = []
            addresses.forEach(address => {
                if (address) availableAddresses.push({
                    address,
                    alias: address
                })
            })

            if (availableAddresses.length)
                requestData.append('addresses', JSON.stringify(availableAddresses))

            console.log(requestData)
        }
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.header}>
                <Text style={styles.title}>Мой профиль</Text>
                <View style={styles.logoutWrapper}>
                    <View style={styles.verticalDivider}/>
                    <Text style={styles.logoutBtn}>Выйти</Text>
                </View>
            </View>
            <View style={styles.avatarWrapper}>
                <ImagePicker onPick={onPickImage}/>
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
                            <TextInput style={styles.input} value={address}
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
            <TouchableOpacity style={styles.saveBtn} onPress={patchUserInfo}>
                <Text style={styles.saveBtnText}>Сохранить</Text>
            </TouchableOpacity>
        </View>
    )
}

const mapStateToProps = state => {
    return {
        userInfo: state.auth.userInfo
    }
}

export default connect(mapStateToProps)(UserProfile)

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: '#214d67',
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