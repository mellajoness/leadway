import React, {Component} from 'react';
import {ImageBackground, View} from 'react-native';
import {CONTAINER_STYLE, INPUT_STYLE} from '../shared/Styles';
import {CommonHeader, CommonRadio, BoldText, CustomLoader, CommonNextButton} from '../components';
import {TextInput} from 'react-native-paper';
import {ACCENT_COLOR,} from '../shared/Colors';
import {connect} from 'react-redux';
import {changeValues, validateUser} from '../store/actions';

class UserAuth extends Component {

    keyboardTypes = ['default', 'email-address', 'phone-pad'];
    inputLabels = ['Pencom Pin', 'Email', 'Phone Number'];
    inputKeys = ['pencomPin', 'email', 'phoneNo'];

    onButtonPress() {
        const {userType, email, pencomPin, phoneNo, validateUser, navigation} = this.props;
        const otpType = userType === 'new' ? 0 : 1;

        const body = {
            email: email,
            PencomPin: pencomPin,
            mobileNo: phoneNo,
            OTPType: otpType
        };

        validateUser(body, navigation);
    }

    _changeValues(value) {
        this.props.changeValues('registerWith', value);
        this.props.changeValues('pencomPin', '');
        this.props.changeValues('email', '');
        this.props.changeValues('phoneNo', '');
    }

    pinInput() {
        if (this.props.userType === 'existing') {
            return (
                <TextInput
                    mode='outlined'
                    label='Pin'
                    placeholder='Pin'
                    keyboardType='numeric'
                    secureTextEntry
                    maxLength={4}
                    style={[{marginBottom: 10}, INPUT_STYLE]}
                    onChangeText={(val) => this.props.changeValues('userPin', val)}
                    value={this.props.userPin}
                />
            )
        } else {
            return null;
        }
    }

    headerTitle() {
        return this.props.userType === 'existing' ? "Existing User Registration" : "New User Registration";
    }

    render() {
        const {loading, registerWith, changeValues} = this.props;

        return (
            <View style={CONTAINER_STYLE}>
                <CommonHeader backAction backActionPress={() => this.props.navigation.goBack()}
                              title={this.headerTitle()}/>

                <ImageBackground
                    source={require('../assets/images/BG3.png')}
                    resizeMode='cover'
                    style={{flex: 1}}
                >

                    <View>
                        <BoldText label='Register With:' style={{margin: 20, marginBottom: 10}} size={23}
                                  color={ACCENT_COLOR}/>

                        <View style={{padding: 20}}>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <CommonRadio
                                    label='Pencom Pin'
                                    value={0}
                                    status={registerWith === 0 ? 'checked' : 'unchecked'}
                                    onPress={() => this._changeValues(0)}
                                />

                                <CommonRadio
                                    label='Email'
                                    value={1}
                                    status={registerWith === 1 ? 'checked' : 'unchecked'}
                                    onPress={() => this._changeValues(1)}
                                />

                                <CommonRadio
                                    label='Phone No'
                                    value={2}
                                    status={registerWith === 2 ? 'checked' : 'unchecked'}
                                    onPress={() => this._changeValues(2)}
                                />
                            </View>

                            <View style={{marginTop: 20}}>

                                <TextInput
                                    mode='outlined'
                                    label={this.inputLabels[registerWith]}
                                    placeholder={this.inputLabels[registerWith]}
                                    keyboardType={this.keyboardTypes[registerWith]}
                                    style={[{marginBottom: 20}, INPUT_STYLE]}
                                    onChangeText={(val) => changeValues(this.inputKeys[registerWith], val)}
                                    value={this.props[this.inputKeys[registerWith]]}
                                />

                                {/*{this.pinInput()}*/}

                                <CommonNextButton label='Next' onPress={() => this.onButtonPress()}/>

                                <CustomLoader visible={loading}/>
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
    return state.userAuthData;
};

export default connect(mapStateToProps, {changeValues, validateUser})(UserAuth);
