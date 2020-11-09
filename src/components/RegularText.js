import React from 'react';
import {Text} from 'react-native';
import {DARK_COLOR} from "../shared/Styles";

export const RegularText = (props) => {
    const textStyle = {
        fontFamily: 'Lato-Regular',
        fontSize: props.size || 16,
        color: props.color || DARK_COLOR
    };

    return (
        <Text numberOfLines={props.numberOfLines} style={[textStyle, props.style]}>{props.label}</Text>
    );
};
