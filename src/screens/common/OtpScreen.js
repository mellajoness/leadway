import React, {Component} from 'react';
import {ImageBackground, View} from 'react-native';
import {CONTAINER_STYLE} from '../../shared/Styles';
import {ACCENT_COLOR, DARK_COLOR, TERTIARY_COLOR} from '../../shared/Colors';
import {CommonHeader, RegularText, CustomLoader, BoldText} from '../../components';
import {connect} from 'react-redux';
import {changeValues, validateOtp, submitBenefitApplication} from '../../store/actions';
import CodeInput from 'react-native-code-input';
import {LOGGER} from "../../shared/Methods";

class OtpScreen extends Component {

    _onFulfill(code) {
        const {pencomPin, resetPinPencom, userType, navigation, validateOtp, userPin, currentPin, newMobilePin, switchRequest} = this.props;
        const pin = userType === 'changePin' ? currentPin : userPin;

        let otpType;
        LOGGER('user type', userType);

        if (userType === 'benefitDocument') {
            let documents = this.props.documentUploadRequest;
            documents['OTP'] = code;
            documents['OTPType'] = 3;
            documents['PencomPin'] = pencomPin;
            documents['userType'] = userType;

            validateOtp(documents, navigation);
        } else if (userType === 'resetPin') {
            validateOtp({
                OTPType: 2, PencomPin: pencomPin, resetPinPencom: resetPinPencom,
                userType: userType, OTP: code
            }, navigation);
        } else if (userType === 'new') {
            validateOtp({
                OTPType: 0, PencomPin: pencomPin, resetPinPencom: resetPinPencom,
                userType: userType, OTP: code, userPin: pin
            }, navigation);
        } else if (userType === 'changePin') {
            validateOtp({
                OTPType: 2, PencomPin: pencomPin, resetPinPencom: resetPinPencom,
                userType: userType, OTP: code, oldMobilePin: currentPin, newMobilePin: newMobilePin, userPin: pin
            }, navigation);
        } else if (userType === 'switchFund') {
            validateOtp({
                OTPType: 5,
                PencomPin: pencomPin,
                userType: userType,
                OTP: code,
                switchRequest: switchRequest
            }, navigation);
        } else {
            validateOtp({
                OTPType: 1, PencomPin: pencomPin, resetPinPencom: resetPinPencom,
                userType: userType, OTP: code, userPin: pin
            }, navigation);
        }
    }

    render() {
        return (
            <View style={CONTAINER_STYLE}>
                <CommonHeader title='OTP' backAction backActionPress={() => this.props.navigation.goBack()}/>

                <ImageBackground
                    source={require('../../assets/images/BG3.png')}
                    resizeMode='cover'
                    style={{flex: 1}}
                >

                    <View>
                        <BoldText label='Enter OTP' style={{margin: 20}} size={23} color={ACCENT_COLOR}/>

                        <View style={{padding: 20, paddingTop: 20, flex: 1}}>
                            <RegularText
                                label='Kindly enter the 6 digits code sent to your registered mobile phone and email address'
                                style={{lineHeight: 25}}
                                size={18}
                                color={DARK_COLOR}
                            />

                            <View>

                                <CodeInput
                                    ref="codeInputRef2"
                                    codeLength={6}
                                    autoFocus={true}
                                    codeInputStyle={{
                                        borderWidth: 0.5,
                                        borderRadius: 2,
                                        height: 50,
                                        width: 50,
                                        backgroundColor: '#EAEBEB',
                                        borderColor: '#C2C2C2'
                                    }}
                                    activeColor={TERTIARY_COLOR}
                                    inactiveColor={TERTIARY_COLOR}
                                    containerStyle={{marginTop: 30}}
                                    space={5}
                                    onFulfill={(code) => this._onFulfill(code)}
                                />
                            </View>

                            {/* <TouchableOpacity style={{width: '100%', alignItems: 'center', marginTop: 70}} onPress={() => alert('New Code')} disabled={false}>
                        <RegularText label='Resend OTP' size={15} color={PRIMARY_COLOR} />
                        </TouchableOpacity> */}
                        </View>

                        <CustomLoader visible={this.props.otpLoading}/>

                    </View>

                </ImageBackground>

            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.userAuthData,
        documentUploadRequest: state.benefitApplicationData.documentUploadRequest,
        resetPinPencom: state.loginData.resetPinPencom,
        switchRequest: state.profileSettingsData.switchRequest,
    };
};

export default connect(mapStateToProps, {changeValues, validateOtp, submitBenefitApplication})(OtpScreen);
