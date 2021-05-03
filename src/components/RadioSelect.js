import React, {useState} from "react";
import {Alert, Modal, View, Text, TouchableOpacity, ScrollView, StyleSheet} from "react-native";
import RadioButtonRN from "radio-buttons-react-native";

import {AntDesign} from '@expo/vector-icons';
import {RALEWAY_BOLD} from "../fonts/fontsTypes";

const RadioSelect = ({data, isVisible, onClose, onSave}) => {
    const [selectedItem, setSelectedItem] = useState(null)

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => {
                onClose()
            }}>
            <View style={styles.modal}>
                <View style={styles.modalInner}>
                    <AntDesign onPress={onClose}
                               style={{marginLeft: 'auto'}} name="close" size={20} color="black"/>
                    <ScrollView style={styles.radioBtns}>
                        <RadioButtonRN
                            boxStyle={{padding: 0}}
                            circleSize={10}
                            activeColor="red"
                            data={data}
                            selectedBtn={selectedItem => setSelectedItem(selectedItem)}
                        />
                    </ScrollView>
                    <TouchableOpacity style={styles.btn} onPress={() => onSave(selectedItem)}>
                        <Text style={styles.btnText}>Выбрать</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default RadioSelect

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    modalInner: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        elevation: 1,
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'black'
    },
    btn: {
        marginTop: 20,
        height: 40,
        backgroundColor: '#D13C35',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    btnText: {
        color: 'white',
        fontSize: 13,
        fontFamily: RALEWAY_BOLD
    },
    radioBtns: {
        maxHeight: 200
    }
})