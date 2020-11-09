import React, {Component} from 'react';
import {View, ScrollView, ImageBackground} from 'react-native';
import {CONTAINER_STYLE} from '../shared/Styles';
import {CommonHeader, CommonNextButton} from '../components';
import {TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import {changeValues, updateLoginValues, validateUser} from "../store/actions";

class PencomPin extends Component {

    buttonDisability() {
        return !(this.props.resetPinPencom);
    };

    buttonNextClicked() {
        this.props.changeValues('userType', 'resetPin');

        const body = {
            OTPType: 2,
            userType: 'resetPin',
            resetPinPencom: this.props.resetPinPencom,
        };

        this.props.validateUser(body, this.props.navigation)
    }

    render() {
        const {resetPinPencom, updateLoginValues} = this.props;

        return (
            <View style={CONTAINER_STYLE}>
                <CommonHeader
                    title='Pencom pin'
                    backAction
                    backActionPress={() => this.props.navigation.navigate('GetHelp')}
                />

                <ImageBackground
                    source={require('../assets/images/BG3.png')}
                    resizeMode='cover'
                    style={{flex: 1}}>

                    <ScrollView style={{flex: 1, padding: 20}}>

                        <TextInput
                            mode='outlined'
                            label='Pencom pin'
                            placeholder='Enter your pencom pin'
                            style={inputStyle}
                            value={resetPinPencom}
                            onChangeText={(val) => updateLoginValues('resetPinPencom', val)}
                        />

                        <View style={{marginBottom: 30}}>
                            <CommonNextButton
                                label='Next'
                                disable={true}
                                onPress={() => this.buttonNextClicked()}
                                disabled={this.buttonDisability()}
                            />
                        </View>
                    </ScrollView>

                </ImageBackground>

            </View>
        );
    }
}

const styles = {
    inputStyle: {
        marginBottom: 15,
        fontFamily: 'Lato',
    }
};

const {inputStyle} = styles;

const mapStateToProps = (state) => {
    return {...state.loginData};
};

export default connect(mapStateToProps, {updateLoginValues, changeValues, validateUser})(PencomPin);
