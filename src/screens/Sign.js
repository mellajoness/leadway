import React, {Component} from 'react';
import {View, StatusBar} from 'react-native';
import Signature from 'react-native-signature-canvas';
import {CommonHeader, CustomLoader} from "../components";
import {connect} from 'react-redux';
import {
    changeValues,
    closeCertificateDialog, showCertificateDialog, submitSwitchFundRequest, switchFundRequest,
    updateSwitchFundValues, validateUser
} from "../store/actions";
import {CONTAINER_STYLE} from "../shared/Styles";
import {LOGGER} from "../shared/Methods";

class Sign extends Component {
    constructor(props) {
        super(props);
        this.state = {signature: null};
    }

    handleSignature = signature => {
        this.setState({signature: signature});
        // LOGGER('signature', signature)
        const selectedFundTo = this.props.selectedFundTypeTo;
        const length = selectedFundTo.length;

        const request = {
            NewSourceFundID: selectedFundTo.charAt(length - 1),
            Signature: signature
        };

        this.submitSwitchButton(request)
    };

    submitSwitchButton(request) {
        LOGGER('request before submit', request);
        this.props.switchFundRequest(request);
        this.props.changeValues('userType', 'switchFund');
        this.props.validateUser({OTPType: 5}, this.props.navigation)
    }

    render() {
        const style = `.m-signature-pad--footer
    .button {
      background-color: #f8822c;
      color: #FFF;
    }`;

        const {loading} = this.props;

        return (
            <View style={CONTAINER_STYLE}>
                <StatusBar barStyle={'dark-content'}/>
                <CommonHeader title='Signature' backAction backActionPress={() => this.props.navigation.goBack()}/>

                <View style={{flex: 1}}>
                    <Signature
                        onOK={this.handleSignature}
                        descriptionText="Signature"
                        clearText="Clear"
                        confirmText="Next"
                        webStyle={style}
                    />

                    <CustomLoader visible={loading}/>

                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return state.profileSettingsData
};

export default connect(mapStateToProps, {
    updateSwitchFundValues, submitSwitchFundRequest,
    closeCertificateDialog, showCertificateDialog, validateUser, switchFundRequest, changeValues
})(Sign);
