import React, {Component} from 'react';
import {View, Alert, ImageBackground} from 'react-native';
import {CONTAINER_STYLE} from '../../shared/Styles';
import {CommonHeader, BoldText, CustomLoader} from '../../components';
import CodeInput from 'react-native-code-input';
import {PRIMARY_COLOR, TERTIARY_COLOR} from '../../shared/Colors';
import {changeUserPin, changeValues, validateUser, resetUserPin} from "../../store/actions";
import {connect} from 'react-redux';
import {LOGGER} from "../../shared/Methods";

class CreatePin extends Component {

    state = {
        pin: '',
    };

    _onFulfill(code) {
        this.setState({pin: code});
    }

    _onFulfillVerify(code) {
        if (this.state.pin !== code) {
            Alert.alert("Pin error", "Pin does not match");
        } else {
            const {validateUser, navigation, changeUserPin, userType, pencomPin, otp, resetUserPin, changeValues} = this.props;

            LOGGER('user type', userType)
            let body;
            if (userType === 'new') {
                body = {
                    PencomPin: pencomPin,
                    OTPType: 0,
                    otp: otp,
                    userPin: code
                };

                changeUserPin(body, navigation, userType);
            } else if (userType === 'resetPin') {
                body = {
                    mobilePin: code,
                    OTP: otp,
                };

                resetUserPin(body, navigation);
            } else {
                changeValues('newMobilePin', code);

                validateUser({OTPType: '2'}, this.props.navigation);
            }
        }
    }

    render() {
        return (
            <View style={CONTAINER_STYLE}>
                <CommonHeader title='Create Pin' backAction backActionPress={() => this.props.navigation.goBack()}/>

                <ImageBackground
                    source={require('../../assets/images/BG1.png')}
                    resizeMode='cover'
                    style={{flex: 1}}
                >

                    <View style={{flex: 1}}>

                        <View style={{paddingHorizontal: 20, flex: 0.5, justifyContent: 'center'}}>
                            <BoldText label='Enter Pin' color={PRIMARY_COLOR} style={{marginTop: 50}} size={16}/>

                            <CodeInput
                                ref="codeInputRef2"
                                secureTextEntry
                                codeLength={4}
                                autoFocus={true}
                                codeInputStyle={{
                                    borderWidth: 0.5,
                                    borderRadius: 2,
                                    height: 60,
                                    width: 60,
                                    backgroundColor: '#EAEBEB',
                                    borderColor: '#C2C2C2'
                                }}
                                activeColor={TERTIARY_COLOR}
                                inactiveColor={TERTIARY_COLOR}
                                containerStyle={{marginTop: 30}}
                                space={20}
                                onFulfill={(code) => this._onFulfill(code)}
                            />

                            <BoldText label='Confirm Pin' color={PRIMARY_COLOR} style={{marginTop: 50}} size={16}/>

                            <CodeInput
                                ref="codeInputRef2"
                                secureTextEntry
                                codeLength={4}
                                autoFocus={true}
                                codeInputStyle={{
                                    borderWidth: 0.5,
                                    borderRadius: 2,
                                    height: 60,
                                    width: 60,
                                    backgroundColor: '#EAEBEB',
                                    borderColor: '#C2C2C2'
                                }}
                                activeColor={TERTIARY_COLOR}
                                inactiveColor={TERTIARY_COLOR}
                                containerStyle={{marginTop: 30}}
                                space={20}
                                onFulfill={(code) => this._onFulfillVerify(code)}
                            />
                        </View>

                    </View>

                    <CustomLoader visible={this.props.loading}/>

                </ImageBackground>

            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return state.userAuthData;
};

export default connect(mapStateToProps, {changeValues, changeUserPin, validateUser, resetUserPin})(CreatePin);
