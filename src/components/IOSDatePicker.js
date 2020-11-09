import React from 'react';
import {DatePickerIOS, View, Modal, TouchableOpacity, Button} from 'react-native';
import {LIGHT_COLOR, PRIMARY_COLOR} from "../shared/Colors";

export const IOSDatePicker = (props) => {
    return (
        <Modal
            animationType={'slide'}
            onRequestClose={props.onRequestClose}
            transparent
            visible={props.visible}
        >
            <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.4)'}}>
                <TouchableOpacity style={{flex: 1}} onPress={props.closeDate}/>

                <View style={styles.dateView}>
                    <View style={styles.buttonContainer}>
                        <Button title={'Done'} color={PRIMARY_COLOR} onPress={props.closeDate}/>
                    </View>
                    <DatePickerIOS
                        onDateChange={(val) => props.onDateChange(val)}
                        mode={'date'}
                        date={props.date}
                        // maximumDate={props.maximumDate}
                        // minimumDate={props.minimumDate}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = {
    buttonContainer: {
        height: 50,
        borderBottomColor: LIGHT_COLOR,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    dateView: {
        backgroundColor: 'white'
    }
};
