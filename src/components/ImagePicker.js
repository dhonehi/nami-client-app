import React, {useState, useEffect} from 'react';
import {Button, Image, View, Text, Platform, TouchableOpacity, StyleSheet} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample({onPick}) {
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Извините, у нас нет доступа к фотографиям!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
            onPick(result.uri)
        }
    };

    const removeImage = () => {
        setImage(null)
    }

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity onPress={pickImage}>
                {image && <Image source={{uri: image}} style={{width: 80, height: 80, borderRadius: 100}}/>}
                {!image && <Image style={{width: 80, height: 80}} source={require('../../assets/user-avatar.png')}/>}
            </TouchableOpacity>
            {image &&
            <TouchableOpacity onPress={removeImage}>
                <Text style={styles.text}>Удалить фотографию</Text>
            </TouchableOpacity>}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        marginLeft: 20
    },
})
