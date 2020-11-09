import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import {CONTAINER_STYLE} from '../../shared/Styles';
import {CommonHeader, RegularText, CommonButton, BoldText} from '../../components';
import {TextInput} from 'react-native-paper';
import {DARK_COLOR, PRIMARY_COLOR, TERTIARY_COLOR} from '../../shared/Colors';
import {
    updatePensionCalculatorValues, calculateRetireCollection, closeRetireCollectionDialog, resetCalcFields
} from '../../store/actions';
import {connect} from 'react-redux';
import {Dialog, DialogButton, DialogContent, DialogFooter, SlideAnimation} from "react-native-popup-dialog";

class RetireCollection extends Component {

    buttonDisability() {
        return !(this.props.initialAmount && this.props.monthlyContribution &&
            this.props.yearsToRetirement && this.props.pensionReturn && this.props.payAfterRetirement);
    };

    onButtonPressed() {
        this.props.calculateRetireCollection(this.props.initialAmount, this.props.monthlyContribution,
            this.props.yearsToRetirement, this.props.pensionReturn, this.props.payAfterRetirement);
    }

    onBackButtonClicked() {
        this.props.resetCalcFields();
        this.props.navigation.goBack();
    }

    render() {
        const {
            initialAmount, monthlyContribution, yearsToRetirement, pensionReturn, payAfterRetirement,
            updatePensionCalculatorValues, showRetireCollection, retireCollection, retireClosingRsa, closeRetireCollectionDialog
        } = this.props;
        return (
            <View style={CONTAINER_STYLE}>

                <CommonHeader title='Pension Calculator'
                              backAction backActionPress={() => this.onBackButtonClicked()}
                              rightIcon='notifications-none'
                              rightActionPress={() => this.props.navigation.navigate("Message")}/>

                <ScrollView style={{flex: 1, padding: 20}}>

                    <RegularText label='Lump sum initial amount? (If any)' size={14} color={DARK_COLOR}/>
                    <TextInput
                        mode='outlined'
                        keyboardType='numeric'
                        style={inputStyle}
                        value={initialAmount}
                        onChangeText={(val) => updatePensionCalculatorValues('initialAmount', val)}
                    />

                    <RegularText label='How much do you contribute monthly?' size={14} color={DARK_COLOR}/>
                    <TextInput
                        mode='outlined'
                        keyboardType='numeric'
                        style={inputStyle}
                        value={monthlyContribution}
                        onChangeText={(val) => updatePensionCalculatorValues('monthlyContribution', val)}
                    />

                    <RegularText label='How many years do you have to retirement? (Years)' size={14}
                                 color={DARK_COLOR}/>
                    <TextInput
                        mode='outlined'
                        keyboardType='numeric'
                        style={inputStyle}
                        value={yearsToRetirement}
                        onChangeText={(val) => updatePensionCalculatorValues('yearsToRetirement', val)}
                    />

                    <RegularText label='What return do you think you will get on your pensions %?' size={14}
                                 color={DARK_COLOR}/>
                    <TextInput
                        mode='outlined'
                        keyboardType='numeric'
                        style={inputStyle}
                        value={pensionReturn}
                        onChangeText={(val) => updatePensionCalculatorValues('pensionReturn', val)}
                    />

                    <RegularText label='For how long after retirement do you wish to collect your pension?' size={14}
                                 color={DARK_COLOR}/>
                    <TextInput
                        mode='outlined'
                        keyboardType='numeric'
                        style={inputStyle}
                        value={payAfterRetirement}
                        onChangeText={(val) => updatePensionCalculatorValues('payAfterRetirement', val)}
                    />

                    <CommonButton
                        label='Calculate'
                        onPress={() => this.onButtonPressed()}
                        style={{marginBottom: 30}}
                        disabled={this.buttonDisability()}/>

                </ScrollView>

                <Dialog
                    visible={showRetireCollection}
                    dialogAnimation={new SlideAnimation({
                        slideFrom: 'bottom',
                    })}
                    containerStyle={{padding: 20}}
                    footer={
                        <DialogFooter>
                            <DialogButton
                                text="OK"
                                onPress={() => closeRetireCollectionDialog()}
                                textStyle={{color: PRIMARY_COLOR}}
                            />
                        </DialogFooter>
                    }
                >
                    <DialogContent>
                        <View style={{padding: 5}}>
                            <BoldText label='Closing RSA' size={15} style={{marginBottom: 13, marginTop: 10}}/>
                            <RegularText label={retireClosingRsa} size={18} color={TERTIARY_COLOR}
                                         style={{marginBottom: 13}}/>

                            <View
                                style={{
                                    borderBottomColor: PRIMARY_COLOR,
                                    borderBottomWidth: 1,
                                    marginBottom: 13,
                                }}
                            />

                            <BoldText label='Amount to be collected per month' size={15} style={{marginBottom: 13}}/>
                            <RegularText label={retireCollection} size={18} color={TERTIARY_COLOR}/>
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
    updatePensionCalculatorValues, calculateRetireCollection, closeRetireCollectionDialog,
    resetCalcFields
})(RetireCollection);
