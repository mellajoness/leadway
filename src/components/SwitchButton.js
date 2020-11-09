import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Switch} from 'react-native-paper';
import {DARK_COLOR} from '../shared/Colors';
import {RegularText} from './RegularText';

export const SwitchButton = (props) => {
    const textStyle = {
        color: props.color || DARK_COLOR,
        fontFamily: 'Lato-Bold',
        fontSize: props.size || 15
    };

    return (
        <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between'}} onPress={props.onValueChange}>
            <RegularText label={props.label} style={[textStyle, props.style]}/>
            <Switch
                value={props.value}
                onValueChange={props.onValueChange}
            />
        </TouchableOpacity>
    );
};
