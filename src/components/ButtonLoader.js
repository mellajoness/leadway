import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {PRIMARY_COLOR} from '../shared/Colors';

export const ButtonLoader = (props) => {
    return (
        <View style={{height: props.height || 60, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size='large' color={PRIMARY_COLOR} animating/>
        </View>
    );
};
