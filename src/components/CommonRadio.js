import React from 'react';
import {TouchableOpacity} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {PRIMARY_COLOR, DARK_COLOR} from '../shared/Colors';
import {RegularText} from './RegularText';

export const CommonRadio = (props) => {
    return (
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={props.onPress}>
            <RadioButton.Android
                value={props.value}
                status={props.status}
                color={PRIMARY_COLOR}
                onPress={props.onPress}
            />
            <RegularText label={props.label} color={DARK_COLOR} size={15}/>
        </TouchableOpacity>
    );
};
