import React from 'react';
import {TouchableOpacity} from "react-native";
import {RegularText} from "./RegularText";
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {DARK_COLOR} from '../shared/Colors';

export class DatePickerButton extends React.Component {
    render() {
        return (
            <TouchableOpacity {...this.props.myProp} disabled={this.props.disabled} style={buttonStyle}
                              onPress={this.props.onPress}>
                <RegularText label={this.props.value} color={DARK_COLOR}/>
                <Icon name={this.props.icon || 'event'} size={25} style={{marginTop: 5}} color={'rgba(0,0,0,0.5)'}/>
            </TouchableOpacity>
        )
    }
}

const buttonStyle = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 63,
    alignItems: 'center'
};
