import React, {Component} from 'react';
import {ImageBackground, View, Image, TouchableOpacity, Alert, Modal, Platform} from 'react-native';
import {BoldText, RegularText, CustomLoader} from '../components';
import {PRIMARY_COLOR, ACCENT_COLOR, TERTIARY_COLOR} from '../shared/Colors';
import {connect} from 'react-redux';
import {TextInput} from 'react-native-paper';
import {
    updateLoginValues,
    authenticateUser,
    fetchUserProfilePicture,
    closeRatingDialog,
    submitSessionRate
} from '../store/actions';
import {LOGGER, DEVICE_ID} from '../shared/Methods';
import CodeInput from 'react-native-code-input';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import LocalAuthentication from 'react-native-fingerprint-scanner';
import {GET_FULLNAME, GET_PENCOMPIN} from '../shared/Storage';
import {
    Dialog,
    DialogButton,
    DialogContent,
    DialogFooter,
    DialogTitle,
    ScaleAnimation
} from "react-native-popup-dialog";
import {AirbnbRating} from "react-native-ratings";
import Moment from 'moment';

class Login extends Component {

    state = {
        fullName: '',
    };

    fingerprint()
    {
        if(Platform.OS === "android")
            this.props.updateLoginValues('showFingerprintModal', true);

        LocalAuthentication
            .authenticate({description: 'Scan your fingerprint on the device scanner to continue'})
            .then(async () => {
                // this.props.handlePopupDismissed();
                const body = await this.requestBody(true, '');
                LOGGER('fingerprint', body);
                this.closeFingerprintModal();
                this.props.authenticateUser(body, this.props.navigation);
            })
            .catch((error) => {
                LOGGER('fingerprint', error);
                // this.props.handlePopupDismissed();
                Alert.alert("Authentication Error", "Authentication was canceled");
            });

    }

    async componentDidMount() {
        this.props.fetchUserProfilePicture();

        this.setState({fullName: await GET_FULLNAME()});
    }

    componentWillUnmount() {
        if (Platform.OS === "android")
            LocalAuthentication.release();
    }

    // async userFingerprintAndroid() {
    //     if (Platform.OS !== "ios")
    //         this.props.updateLoginValues('showFingerprintModal', true);
    //
    //     try {
    //         const auth = await LocalAuthentication.authenticateAsync();
    //         LOGGER('Auth', auth);
    //
    //         if (!auth.success) {
    //             if (auth.error === 'authentication_failed') {
    //                 this.userFingerprintAndroid();
    //                 this.props.updateLoginValues('authError', 'Try Again.');
    //             } else {
    //                 this.closeFingerprintModal();
    //                 Alert.alert('Fingerprint Error', auth.message);
    //             }
    //         } else {
    //             if (Platform.OS !== "ios")
    //                 this.closeFingerprintModal();
    //             const body = await this.requestBody(true, '');
    //             this.props.authenticateUser(body, this.props.navigation);
    //         }
    //     } catch (error) {
    //         this.closeFingerprintModal();
    //         Alert.alert('Fingerprint Error', error.message);
    //     }
    // }

    closeFingerprintModal() {
        LocalAuthentication.release();
        this.props.updateLoginValues('showFingerprintModal', false);
        this.props.updateLoginValues('authError', '');
    }

    async _onFulfill(code) {
        const body = await this.requestBody(false, code);
        this.props.authenticateUser(body, this.props.navigation);
    }

    async requestBody(usingPrint, userPin) {
        const pencom = await GET_PENCOMPIN();

        return {
            PencomPIN: pencom,
            deviceId: DEVICE_ID(),
            MobilePin: userPin,
            fingerprint: usingPrint
        };
    }

    requestRatingBody() {

        return {
            Rating: this.props.rateValue,
            Comment: this.props.rateComment,
            // Id: 4,
            DateAdded: Moment().format()
        };
    }

    render() {
        const {
            authError, loading, sensorAvailable, showFingerprintModal, profilepicture, showRating, closeRatingDialog,
            rateComment, submitSessionRate
        } = this.props;
        const printInfo = authError ? authError : 'Place your finger on the scanner to continue';
        const printInfoColor = authError ? 'red' : 'rgba(0,0,0,0.5)';

        return (
            <ImageBackground
                source={require('../assets/images/bg.png')}
                resizeMode='cover'
                style={{flex: 1}}
            >

                <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.6)'}}>
                    <View style={{
                        marginBottom: 0,
                        marginTop: 80,
                        marginStart: 10,
                        marginEnd: 10,
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}>
                        <Image
                            source={profilepicture ? {uri: profilepicture} : require('../assets/images/user.png')}
                            style={{
                                height: 80,
                                width: 80,
                                borderRadius: 40,
                                borderColor: TERTIARY_COLOR,
                                borderWidth: 1
                            }}
                            resizeMode='cover'
                        />

                        <View style={{justifyContent: 'center', marginStart: 15, flexDirection: 'column'}}>
                            <BoldText label={`Welcome`} color={ACCENT_COLOR} size={20}/>

                            <BoldText label={this.state.fullName} size={20} color={PRIMARY_COLOR}
                                      style={{textAlign: 'center', marginTop: 5}}/>
                        </View>

                    </View>

                    <View style={{paddingHorizontal: 20, flex: 0.5, justifyContent: 'center'}}>
                        <BoldText label='Enter your Mobile Pin' color={PRIMARY_COLOR} style={{marginTop: 50}}
                                  size={16}/>

                        <CodeInput
                            ref="codeInputRef2"
                            secureTextEntry
                            codeLength={4}
                            autoFocus={true}
                            codeInputStyle={{
                                borderWidth: 0.5, borderRadius: 2, height: 60, width: 60, backgroundColor: '#EAEBEB',
                                borderColor: '#C2C2C2'
                            }}
                            activeColor={TERTIARY_COLOR}
                            inactiveColor={TERTIARY_COLOR}
                            containerStyle={{marginTop: 30}}
                            space={20}
                            onFulfill={(code) => this._onFulfill(code)}
                        />
                    </View>

                    {
                        LocalAuthentication.isSensorAvailable
                            ? (
                                <TouchableOpacity style={{alignItems: 'center', marginTop: 10}}
                                                  onPress={() => this.fingerprint()}>
                                    <Icon name='fingerprint' color='white' size={50}/>
                                </TouchableOpacity>
                            )
                            : null
                    }


                    <View style={{height: 70, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('GetHelp')}>
                            <BoldText color={ACCENT_COLOR} size={16} label='Need help?'/>
                        </TouchableOpacity>
                    </View>
                </View>

                <CustomLoader visible={loading}/>

                <Modal
                    transparent
                    onRequestClose={() => this.closeFingerprintModal()}
                    animationType='fade'
                    visible={showFingerprintModal}
                >
                    <View style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <View style={{height: 300, width: 250, backgroundColor: 'white', borderRadius: 5}}>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Icon name='fingerprint' color={PRIMARY_COLOR} size={100}/>

                                <BoldText label='Fingerprint' size={16} color={ACCENT_COLOR} style={{marginTop: 20}}/>
                                <BoldText label='Authentication' size={16} color={ACCENT_COLOR}/>

                                <RegularText
                                    label={printInfo}
                                    color={printInfoColor}
                                    size={14}
                                    style={{textAlign: 'center', marginTop: 20}}
                                />
                            </View>
                            <TouchableOpacity style={{alignSelf: 'center', marginBottom: 20}}
                                              onPress={() => this.closeFingerprintModal()}>
                                <BoldText color={ACCENT_COLOR} label='CLOSE' size={16}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Dialog
                    visible={showRating}
                    dialogAnimation={new ScaleAnimation({
                        toValue: 0,
                        useNativeDriver: true,
                    })}
                    dialogTitle={<DialogTitle title="Rate Us"/>}
                    containerStyle={{padding: 20}}
                    footer={
                        <DialogFooter>
                            <DialogButton
                                text="CANCEL"
                                onPress={() => closeRatingDialog()}
                                textStyle={{color: PRIMARY_COLOR}}
                            />
                            <DialogButton
                                text="SUBMIT"
                                onPress={() => submitSessionRate(this.requestRatingBody())}
                                textStyle={{color: PRIMARY_COLOR}}
                            />
                        </DialogFooter>
                    }
                >

                    <DialogContent style={{padding: 0, height: 170, width: 300}}>
                        <View>

                            <AirbnbRating
                                // type='custom'
                                ratingCount={5}
                                size={40}
                                // ratingColor={PRIMARY_COLOR}
                                defaultRating={0}
                                onFinishRating={(val) => this.props.updateLoginValues('rateValue', val)}
                            />

                            <TextInput
                                mode='outlined'
                                label='Comment (Optional)'
                                placeholder='Comment (Optional)'
                                style={styles.inputStyle}
                                value={rateComment}
                                onChangeText={(val) => this.props.updateLoginValues('rateComment', val)}
                            />

                        </View>
                    </DialogContent>
                </Dialog>

            </ImageBackground>
        );
    }
}

const styles = {
    imageStyle: {
        height: 100,
        width: 100,
        borderRadius: 50,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: 'white'
    },
    inputStyle: {
        marginTop: 10,
        fontFamily: 'Lato'
    }
};

const mapStateToProps = (state) => {
    return state.loginData;
};

export default connect(mapStateToProps, {
    updateLoginValues,
    authenticateUser,
    fetchUserProfilePicture,
    closeRatingDialog,
    submitSessionRate
})(Login);
