import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {CONTAINER_STYLE} from '../../shared/Styles';
import {CommonHeader, CommonButton, CustomLoader} from '../../components';
import {TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import {changeValues, submitMobilePinChange} from "../../store/actions";
import {LOGGER} from "../../shared/Methods";

class ChangeMobilePin extends Component {

    onButtonPressed(request) {
        this.props.changeValues('userType', 'changePin');
        // this.props.submitMobilePinChange(request, this.props.navigation);
        this.props.navigation.navigate('CreatePin');
    }

    buttonDisability() {
        return !(this.props.currentPin);
    };

    requestBody = {
        OTPType: '2'
    };

    render() {
        const {currentPin, loading, changeValues, isGetHelp} = this.props;

        LOGGER('isGetHelp', isGetHelp)
        return (
            <View style={CONTAINER_STYLE}>

                <CommonHeader
                    title='Change mobile pin'
                    backAction backActionPress={() => this.props.navigation.goBack()}
                    rightIcon='notifications-none'
                    rightActionPress={() => this.props.navigation.navigate("Message")}
                />

                <ScrollView style={{flex: 1, padding: 20}}>
                    <TextInput
                        mode='outlined'
                        label='Current Pin'
                        placeholder='Enter your current pin'
                        keyboardType='numeric'
                        secureTextEntry
                        maxLength={4}
                        style={inputStyle}
                        value={currentPin}
                        onChangeText={(val) => changeValues('currentPin', val)}
                    />

                    <CommonButton
                        label='Submit'
                        onPress={() => this.onButtonPressed(this.requestBody)}
                        style={{marginBottom: 30}}
                        disabled={this.buttonDisability()}
                    />

                </ScrollView>

                <CustomLoader visible={loading}/>

            </View>
        );
    }
}

const styles = {
    inputStyle: {
        marginBottom: 15,
        fontFamily: 'Lato'
    }
};

const {inputStyle} = styles;

const mapStateToProps = (state) => {
    return {...state.userAuthData, isGetHelp: state.loginData.isGetHelp};
};

export default connect(mapStateToProps, {changeValues, submitMobilePinChange})(ChangeMobilePin);
