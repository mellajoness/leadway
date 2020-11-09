import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {DISABLE_GRADIENT_COLOR, GRADIENT_COLOR} from '../shared/Colors';
import LinearGradient from 'react-native-linear-gradient';
import {BoldText} from './BoldText';
import Icon from 'react-native-vector-icons/dist/Ionicons';

export const CommonNextButton = (props) => {
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

    const buttonColor2 = () => {
        return props.disabled
            ? DISABLE_GRADIENT_COLOR
            : ['#f8822c', '#f8822c']
    };

    return (
        <View>
            <TouchableOpacity onPress={props.onPress} disabled={props.disabled}
                              style={{width: '100%', alignItems: 'center'}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{width: '80%'}}>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={buttonColor()}
                                        style={[linearStyle, props.style]}>
                            <BoldText label={props.label} size={16} color='white'/>
                        </LinearGradient>
                    </View>
                    <View style={{width: '20%'}}>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={buttonColor2()}
                                        style={[linearStyle, props.style]}>
                            <Icon name={props.icon || 'md-arrow-round-forward'} style={{alignItems: 'flex-end'}}
                                  size={30} color='white'/>
                        </LinearGradient>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
};
