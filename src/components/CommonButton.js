import React from 'react';
import {TouchableOpacity} from 'react-native';
import {DISABLE_GRADIENT_COLOR, GRADIENT_COLOR} from '../shared/Colors';
import LinearGradient from 'react-native-linear-gradient';
import {BoldText} from './BoldText';

export const CommonButton = (props) => {
    const linearStyle = {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    };

    const buttonColor = () => {
        return props.disabled
            ? DISABLE_GRADIENT_COLOR
            : GRADIENT_COLOR
    };

    return (
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={buttonColor()}
                        style={[linearStyle, props.style]}>
            <TouchableOpacity onPress={props.onPress} disabled={props.disabled}
                              style={{width: '100%', alignItems: 'center'}}>
                <BoldText label={props.label} color='white'/>
            </TouchableOpacity>
        </LinearGradient>
    )
}
