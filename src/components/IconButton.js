import React from 'react';
import {TouchableOpacity} from 'react-native';
import {GRADIENT_COLOR} from '../shared/Colors';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/dist/Ionicons';

export const IconButton = (props) => {
    const linearStyle = {
        height: 60,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    };

    return (
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={GRADIENT_COLOR}
                        style={[linearStyle, props.style]}>
            <TouchableOpacity onPress={props.onPress} style={{width: 60, alignItems: 'center'}}>
                <Icon name={props.icon || 'md-arrow-round-forward'} size={30} color='white'/>
            </TouchableOpacity>
        </LinearGradient>
    )
}
