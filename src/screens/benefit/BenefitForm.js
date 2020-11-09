import React, {Component} from 'react';
import {View, ScrollView, TouchableOpacity, Modal, Alert} from 'react-native';
import {CONTAINER_STYLE} from '../../shared/Styles';
import {CommonHeader, DatePickerButton, CommonNextButton, RegularText} from '../../components';
import {TextInput, HelperText, Divider, List} from 'react-native-paper';
import {connect} from 'react-redux';
import {
    submitBenefitApplication,
    updateBenefitApplicationValues,
    showBankModal,
    closeBankModal,
    showReasonModal,
    closeReasonModal, selectReason, closeRatingDialog, openRatingDialog, resetBenefitFields
} from "../../store/actions";
import {LOGGER} from "../../shared/Methods";
import {
    Dialog,
    DialogButton,
    DialogContent,
    DialogFooter,
    DialogTitle,
    ScaleAnimation
} from "react-native-popup-dialog";
import {PRIMARY_COLOR} from "../../shared/Colors";
import {GET_STORED_AVC_AMOUNT} from "../../shared/Storage";

class BenefitForm extends Component {

    buttonDisability() {
        return !(this.props.designation &&
            this.props.department && this.props.bankAccountName &&
            this.props.bankAccountNumber && this.props.bvn && this.props.selectedBank && this.props.selectedBankBranch);
    };

    buttonNextClicked() {
        if (this.props.bvn.length !== 11) {
            Alert.alert('Invalid Bvn', 'Length of Bvn should be 11.');
        } else if (this.props.bankAccountNumber.length !== 10) {
            Alert.alert('Invalid Account Number', 'Length of account number should be 10.');
        } else if((this.props.selectedBenefitType === 7) && (this.props.avcValue < this.props.withdrawalAmount)) {
            Alert.alert('Invalid Withdrawal Amount', 'Withdrawal amount is more than expected amount');
        } else {
            this.props.navigation.navigate('DocumentUpload');
        }
    }

    onBackButtonClicked() {
        this.props.closeRatingDialog();
        this.props.resetBenefitFields();
        this.props.navigation.goBack();
    }

    lumpsumPaymentType() {
        if (this.props.selectedBenefitType === 2) {
            return (
                <TextInput
                    mode='outlined'
                    label='Reason for benefit application'
                    // placeholder='Enter your reason for benefit application'
                    render={props =>
                        <DatePickerButton
                            {...props}
                            icon='arrow-drop-down'
                            value={this.props.reason}
                            onPress={() => this.props.showReasonModal()}
                        />
                    }
                    style={inputStyle}
                    value={this.props.reason}
                    onChangeText={(val) => this.props.updateBenefitApplicationValues('reason', val)}
                />
            )
        } else {
            return null;
        }
    }

    avcPaymentType() {
        if (this.props.selectedBenefitType === 7) {
            return (
                <View>
                    <TextInput
                        mode='outlined'
                        label='Tax ID Number'
                        placeholder='Tax ID Number'
                        style={inputStyle}
                        value={this.props.taxNum}
                        onChangeText={(val) => this.props.updateBenefitApplicationValues('taxNum', val)}
                    />

                    <TextInput
                        mode='outlined'
                        label='Withdrawal Amount'
                        placeholder='Enter amount to withdraw'
                        keyboardType='numeric'
                        style={inputStyle}
                        value={this.props.withdrawalAmount}
                        onChangeText={(val) => this.props.updateBenefitApplicationValues('withdrawalAmount', val)}
                    />

                </View>
            )
        } else {
            return null;
        }
    }

    render() {
        const {
            designation, department, bankAccountName, bankAccountNumber,
            bvn, selectedBankBranch, updateBenefitApplicationValues, selectedBank, selectedBenefitType,
            showModalForReason, closeRatingDialog, showRating, openRatingDialog, avcValue
        } = this.props;

        LOGGER('selectedBenefitType', selectedBenefitType)
        LOGGER('GET_STORED_AVC_AMOUNT', avcValue)
        return (
            <View style={CONTAINER_STYLE}>
                <CommonHeader
                    title='Benefit Application'
                    backAction
                    backActionPress={() => openRatingDialog()}
                    rightIcon='notifications-none'
                    rightActionPress={() => this.props.navigation.navigate("Message")}
                />

                <ScrollView style={{flex: 1, padding: 20}}>

                    {this.avcPaymentType()}

                    <TextInput
                        mode='outlined'
                        label='Designation'
                        placeholder='Enter your designation'
                        style={inputStyle}
                        value={designation}
                        onChangeText={(val) => updateBenefitApplicationValues('designation', val)}
                    />

                    <TextInput
                        mode='outlined'
                        label='Department'
                        placeholder='Enter your department'
                        style={inputStyle}
                        value={department}
                        onChangeText={(val) => updateBenefitApplicationValues('department', val)}
                    />

                    {this.lumpsumPaymentType()}

                    <View style={{marginBottom: 15}}>
                        <TextInput
                            mode='outlined'
                            label='Bank Account Name'
                            placeholder='Enter your account name'
                            autoCorrect={false}
                            autoCapitalize='words'
                            value={bankAccountName}
                            onChangeText={(val) => updateBenefitApplicationValues('bankAccountName', val)}
                        />
                        <HelperText type='info'>Must be same as RSA Account Name</HelperText>
                    </View>

                    <TextInput
                        mode='outlined'
                        label='Bank Account Number'
                        placeholder='Enter your account number'
                        keyboardType='numeric'
                        maxLength={10}
                        style={inputStyle}
                        value={bankAccountNumber}
                        onChangeText={(val) => updateBenefitApplicationValues('bankAccountNumber', val)}
                    />

                    <TextInput
                        mode='outlined'
                        label='BVN'
                        placeholder='Enter your BVN'
                        keyboardType='numeric'
                        style={inputStyle}
                        maxLength={11}
                        value={bvn}
                        onChangeText={(val) => updateBenefitApplicationValues('bvn', val)}
                    />

                    <TextInput
                        mode='outlined'
                        label='Bank'
                        render={props =>
                            <DatePickerButton
                                {...props}
                                icon='arrow-drop-down'
                                value={selectedBank}
                                onPress={() => this.props.navigation.navigate('Bank')}
                            />
                        }
                        style={inputStyle}
                        value={selectedBank}
                        onChangeText={(val) => updateBenefitApplicationValues('selectedBank', val)}
                    />

                    <TextInput
                        mode='outlined'
                        label='Bank Branch'
                        render={props =>
                            <DatePickerButton
                                {...props}
                                icon='arrow-drop-down'
                                value={selectedBankBranch}
                                onPress={() => this.props.navigation.navigate('BankBranch')}
                            />
                        }
                        value={selectedBankBranch}
                        onChangeText={(val) => updateBenefitApplicationValues('selectedBankBranch', val)}
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

                <Modal
                    visible={showModalForReason}
                    onRequestClose={() => this.props.closeReasonModal()}
                    animationType='slide'
                    transparent
                >
                    <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.4)'}}>
                        <TouchableOpacity
                            style={{flex: 1}}
                            onPress={() => this.props.closeReasonModal()}
                        />

                        <View style={{backgroundColor: 'white', paddingBottom: 10}}>
                            <List.Item
                                title={<RegularText label='Loss'/>}
                                onPress={() => this.props.selectReason('Loss')}
                            />

                            <Divider/>

                            <List.Item
                                title={<RegularText label='Others'/>}
                                onPress={() => this.props.selectReason('Others')}
                            />

                        </View>
                    </View>
                </Modal>

                <Dialog
                    visible={showRating}
                    dialogAnimation={new ScaleAnimation({
                        toValue: 0,
                        useNativeDriver: true,
                    })}
                    dialogTitle={<DialogTitle title='Warning!!!'/>}
                    containerStyle={{padding: 20}}
                    footer={
                        <DialogFooter>
                            <DialogButton
                                text="No"
                                onPress={() => closeRatingDialog()}
                                textStyle={{color: PRIMARY_COLOR}}
                            />
                            <DialogButton
                                text="Yes"
                                onPress={() => this.onBackButtonClicked()}
                                textStyle={{color: PRIMARY_COLOR}}
                            />
                        </DialogFooter>
                    }
                >

                    <DialogContent style={{padding: 0, height: 90, width: 300}}>
                        <View><RegularText
                            label='Going back means you want to erase your changes. Are you sure you want to go back?'/></View>
                    </DialogContent>
                </Dialog>

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
    return {
        ...state.benefitApplicationData,
        showRating: state.loginData.showRating,
        avcValue: state.accountData.avcValue
    };
};

export default connect(mapStateToProps, {
    updateBenefitApplicationValues, submitBenefitApplication,
    showBankModal, closeBankModal, showReasonModal, closeReasonModal, selectReason,
    closeRatingDialog, openRatingDialog, resetBenefitFields
})(BenefitForm);
