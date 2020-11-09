import React, { Component } from 'react';
import {View, ScrollView, Platform, DatePickerAndroid} from 'react-native';
import { CONTAINER_STYLE } from '../../shared/Styles';
import {CommonHeader, CommonButton, DatePickerButton, CustomLoader, IOSDatePicker} from '../../components';
import { TextInput } from 'react-native-paper';
import { updateEmployerDetailValues, submitEmployerDetailsApplication } from '../../store/actions';
import { connect } from 'react-redux';
import {ANDROID_DATE_PICKER, LOGGER} from '../../shared/Methods';
import Moment from "moment";

class ChangeEmployeeDetails extends Component {

    onButtonPressed(request) {
        this.props.submitEmployerDetailsApplication(request);
    }

    buttonDisability() {
        return !(this.props.employername && this.props.officeaddress1 && this.props.dateofemployment);
    };

    requestBody() {
        return {
            EmployerName: this.props.employername,
            EmployerAddress: this.props.officeaddress1,
            EmploymentDate: this.props.dateofemployment,
        };
    }

    state = {
        startDate: '',
        showDateIOS: false,
        selectedDate: new Date(),
    };

    async showPicker(caller) {
        LOGGER('caller', caller)
        let sDate = new Date();

        if (Platform.OS === 'ios') {
            this.setState({showDateIOS: true, selectedDate: new Date(sDate)});
        } else {
            const _date = await ANDROID_DATE_PICKER(sDate);
            this.props.updateEmployerDetailValues('dateofemployment', _date)
        }
    }

    closeDatePicker() {
        this.setState({showDateIOS: false});
    }

    updateDate(val) {
        const formatedDate = Moment(new Date(val), "YYYY-MM-DD").format("YYYY-MM-DD");
        this.props.updateEmployerDetailValues('dateofemployment', formatedDate)
    }

    render () {
        const { employername, officeaddress1, dateofemployment, loading, updateEmployerDetailValues } = this.props;

        return (
            <View style={CONTAINER_STYLE}>

                <CommonHeader
                    title='Change employee details'
                    backAction backActionPress={() => this.props.navigation.goBack()}
                    rightIcon='notifications-none'
                    rightActionPress={() => this.props.navigation.navigate("Message")}
                />

                <ScrollView style={{flex: 1, padding: 20}}>
                    <TextInput
                        mode='outlined'
                        label='Employer Name'
                        placeholder='Enter employer name'
                        style={inputStyle}
                        value={employername}
                        onChangeText={(val) => updateEmployerDetailValues('employername', val)}
                    />

                    <TextInput
                        mode='outlined'
                        label='Start Date'
                        value={dateofemployment}
                        render={props => <DatePickerButton {...props} value={dateofemployment} onPress={() => this.showPicker()}/>}
                        style={{marginBottom: 20}}
                        onChangeText={(val) => updateEmployerDetailValues('dateofemployment', val)}
                    />

                    <TextInput
                        mode='outlined'
                        label='Employer Address'
                        placeholder='Enter employer address'
                        style={inputStyle}
                        value={officeaddress1}
                        onChangeText={(val) => updateEmployerDetailValues('officeaddress1', val)}
                    />

                    <CommonButton
                        label='Update'
                        onPress={() => this.onButtonPressed(this.requestBody())}
                        style={{marginBottom: 30}}
                        disabled={this.buttonDisability()}
                    />

                </ScrollView>

                <IOSDatePicker
                    visible={this.state.showDateIOS}
                    onDateChange={(val) => this.updateDate(val)}
                    onRequestClose={() => this.closeDatePicker()}
                    closeDate={() => this.closeDatePicker()}
                    date={new Date(this.state.selectedDate)}
                />

                <CustomLoader visible={loading} />

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

const { inputStyle } = styles;

const mapStateToProps = (state) => {
    return state.profileSettingsData;
};

export default connect(mapStateToProps, { updateEmployerDetailValues, submitEmployerDetailsApplication })(ChangeEmployeeDetails);