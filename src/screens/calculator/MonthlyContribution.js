import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import {CONTAINER_STYLE} from '../../shared/Styles';
import {CommonHeader, RegularText, CommonButton, BoldText} from '../../components';
import {TextInput} from 'react-native-paper';
import {DARK_COLOR, PRIMARY_COLOR, TERTIARY_COLOR} from '../../shared/Colors';
import {
    updatePensionCalculatorValues,
    calculateMonthlyContribution,
    closeMonthlyContributionDialog,
    resetCalcFields
} from '../../store/actions'
import {LOGGER} from '../../shared/Methods';
import {connect} from 'react-redux';
import {Dialog, DialogButton, DialogContent, DialogFooter, SlideAnimation} from "react-native-popup-dialog";

class MonthlyContribution extends Component {

    buttonDisability() {
        return !(this.props.payPerMonthAfterRetirement && this.props.noOfYearsToRetirement &&
            this.props.returnOnPension && this.props.payPensionAfterRetirement);
    };

    onButtonPressed() {
        this.props.calculateMonthlyContribution(this.props.payPerMonthAfterRetirement, this.props.noOfYearsToRetirement,
            this.props.returnOnPension, this.props.payPensionAfterRetirement);
    }

    onBackButtonClicked() {
        this.props.resetCalcFields();
        this.props.navigation.goBack();
    }

    render() {

        const {
            payPerMonthAfterRetirement, noOfYearsToRetirement, returnOnPension, payPensionAfterRetirement,
            updatePensionCalculatorValues, showMonthlyContribution, rsaRequired, amountMonthlyContribution, closeMonthlyContributionDialog
        } = this.props;

        LOGGER('asdf', this.props.amountMonthlyContribution);
        return (
            <View style={CONTAINER_STYLE}>

                <CommonHeader title='Pension Calculator'
                              backAction backActionPress={() => this.onBackButtonClicked()}
                              rightIcon='notifications-none'
                              rightActionPress={() => this.props.navigation.navigate("Message")}/>

                <ScrollView style={{flex: 1, padding: 20}}>

                    <RegularText label='How much do you want to collect per month after retirement?' size={14}
                                 color={DARK_COLOR}/>
                    <TextInput
                        mode='outlined'
                        keyboardType='numeric'
                        style={inputStyle}
                        value={payPerMonthAfterRetirement}
                        onChangeText={(val) => this.props.updatePensionCalculatorValues('payPerMonthAfterRetirement', val)}
                    />

                    <RegularText label='How long do you have to retirement? (Years)' size={14} color={DARK_COLOR}/>
                    <TextInput
                        mode='outlined'
                        keyboardType='numeric'
                        style={inputStyle}
                        value={noOfYearsToRetirement}
                        onChangeText={(val) => updatePensionCalculatorValues('noOfYearsToRetirement', val)}
                    />

                    <RegularText label='What return do you think you will get on your pensions? (Please note that percentage
                                        is a function of the prevailing market rate)%' size={14} color={DARK_COLOR}/>
                    <TextInput
                        mode='outlined'
                        keyboardType='numeric'
                        style={inputStyle}
                        value={returnOnPension}
                        onChangeText={(val) => this.props.updatePensionCalculatorValues('returnOnPension', val)}
                    />

                    <RegularText label='For how long after retirement do you wish to collect your pension?' size={14}
                                 color={DARK_COLOR}/>
                    <TextInput
                        mode='outlined'
                        keyboardType='numeric'
                        style={inputStyle}
                        value={payPensionAfterRetirement}
                        onChangeText={(val) => this.props.updatePensionCalculatorValues('payPensionAfterRetirement', val)}
                    />

                    <CommonButton
                        label='Calculate'
                        onPress={() => this.onButtonPressed()}
                        style={{marginBottom: 30}}
                        disabled={this.buttonDisability()}/>

                </ScrollView>

                <Dialog
                    visible={showMonthlyContribution}
                    dialogAnimation={new SlideAnimation({
                        slideFrom: 'bottom',
                    })}
                    containerStyle={{padding: 20}}
                    footer={
                        <DialogFooter>
                            <DialogButton
                                text="OK"
                                onPress={() => closeMonthlyContributionDialog()}
                                textStyle={{color: PRIMARY_COLOR}}
                            />
                        </DialogFooter>
                    }

                >
                    <DialogContent>
                        <View style={{padding: 5}}>
                            <BoldText label='RSA Required' size={15} style={{marginBottom: 13, marginTop: 10}}/>
                            <RegularText label={rsaRequired} size={18} color={TERTIARY_COLOR}
                                         style={{marginBottom: 13}}/>

                            <View
                                style={{
                                    borderBottomColor: PRIMARY_COLOR,
                                    borderBottomWidth: 1,
                                    marginBottom: 13,
                                }}
                            />

                            <BoldText label='Amount you need to contribute monthly' size={15}
                                      style={{marginBottom: 13}}/>
                            <RegularText label={amountMonthlyContribution} size={18} color={TERTIARY_COLOR}/>
                        </View>
                    </DialogContent>
                </Dialog>
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
    return state.pensionCalculatorData;
};

export default connect(mapStateToProps, {
    updatePensionCalculatorValues,
    calculateMonthlyContribution,
    closeMonthlyContributionDialog,
    resetCalcFields,
})(MonthlyContribution);
