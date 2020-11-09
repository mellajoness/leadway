import React from 'react';
import {BoldText} from './BoldText';
import {Platform} from 'react-native';
import {Appbar} from 'react-native-paper';
import {LIGHTER_COLOR, TERTIARY_COLOR} from "../shared/Colors";

export const CommonHeader = (props) => {
    const leftSide = () => {
        return props.backAction
            ? <Appbar.BackAction onPress={props.backActionPress} color={TERTIARY_COLOR}/>
            : <Appbar.Action icon={'menu'} color={TERTIARY_COLOR} onPress={props.menuButtonPress}/>
    };

    if (Platform.OS === 'ios') {
        return (
            <Appbar style={{backgroundColor: '#fff'}}>
                {leftSide()}

                <Appbar.Content
                    title={<BoldText label={props.title} size={18} color={TERTIARY_COLOR}/>}
                />
                <Appbar.Action icon={props.rightIcon} color={TERTIARY_COLOR} onPress={props.rightActionPress}/>
            </Appbar>
        )
    }

    return (
        <Appbar.Header style={{height: Platform.OS === 'ios' ? 40 : 55, backgroundColor: LIGHTER_COLOR}}>
            {leftSide()}

            <Appbar.Content
                title={<BoldText label={props.title} size={18} color={TERTIARY_COLOR}/>}
            />

            <Appbar.Action icon={props.rightIcon} color={TERTIARY_COLOR} onPress={props.rightActionPress}/>
        </Appbar.Header>
    );
};
