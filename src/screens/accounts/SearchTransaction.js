import React, { Component } from 'react';
import {View, ScrollView, Platform, DatePickerAndroid, Alert, Modal, TouchableOpacity, FlatList} from 'react-native';
import { CONTAINER_STYLE } from '../../shared/Styles';
import {
    CommonHeader,
    CommonButton,
    DatePickerButton,
    CustomLoader,
    BoldText,
    RegularText,
    IOSDatePicker
} from '../../components';
import {Divider, TextInput, List} from 'react-native-paper';
import {
    updateTransactionValues,
    detailedAccountData,
    selectFundType,
    showFundTypesModal, closeFundTypesModal
} from '../../store/actions';
import { connect } from 'react-redux';
import {ANDROID_DATE_PICKER, LOGGER} from '../../shared/Methods';
import Moment from "moment";

class SearchTransaction extends Component {

    state = {
        selectedDate: new Date(),
        showDateIOS: false,
        caller: '',
        fundTypeId: 0

    };

    onButtonPressed() {
        let selectedFundType = this.props.selectedFundType;
        selectedFundType = selectedFundType[selectedFundType.length - 1];
        if(!selectedFundType)
        {
            selectedFundType = this.props.selectFundType;
        }

        this.props.detailedAccountData(selectedFundType, this.props.startDate, this.props.endDate, this.props.navigation);
    }

    buttonDisability() {
        return !(this.props.endDate && this.props.startDate && this.props.selectedFundType);
    };

    async showPicker(caller) {
        let sDate = new Date();

        if (Platform.OS === 'ios') {
            this.setState({showDateIOS: true, selectedDate: new Date(sDate), caller: caller});
        } else {
            const _date = await ANDROID_DATE_PICKER(sDate);
            this.props.updateTransactionValues(caller, _date)
        }
    }

    closeDatePicker() {
        this.setState({showDateIOS: false});
    }

    updateDate(val) {
        const { caller } = this.state;
        const date = new Date(val);
        const formatedDate = Moment(date, "YYYY-MM-DD").format("YYYY-MM-DD");

        this.props.updateTransactionValues(caller, formatedDate)
    }

    selectFundType(fundName, fundTypeId)
    {
        this.props.selectFundType(fundName);
        this.setState({fundTypeId: fundTypeId});
    }

    _renderItem(item, index) {
        return <List.Item
            title={<BoldText label={item['FundTitle']}/>}
            onPress={() => this.selectFundType(item['FundTitle'], item['FundID'])}
        />
    }

    render () {
        const { loading, updateTransactionValues, activefunds, fundedData, endDate, startDate, showModelForFundType, selectedFundType } = this.props;

        return (
            <View style={CONTAINER_STYLE}>

                <CommonHeader
                    title='Search transaction'
                    backAction backActionPress={() => this.props.navigation.goBack()}
                    rightIcon='notifications-none'
                    rightActionPress={() => this.props.navigation.navigate("Message")}
                />

                <ScrollView style={{flex: 1, padding: 20}}>
                    <TextInput
                        mode='outlined'
                        label='Fund Type'
                        render={props =>
                            <DatePickerButton
                                {...props}
                                icon='arrow-drop-down'
                                value={selectedFundType}
                                onPress={() => this.props.showFundTypesModal()}
                            />
                        }
                        style={inputStyle}
                        value={selectedFundType}
                        onChangeText={(val) => updateTransactionValues('selectedFundType', val)}
                    />

                    <Modal
                        visible={showModelForFundType}
                        onRequestClose={() => this.props.closeFundTypesModal()}
                        animationType='slide'
                        transparent
                    >
                        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.4)'}}>
                            <TouchableOpacity
                                style={{flex: 1}}
                                onPress={() => this.props.closeFundTypesModal()}
                            />

                            <View style={{backgroundColor: 'white', paddingBottom: 10}}>

                                <FlatList
                                    data={fundedData}
                                    renderItem={({item, index}) => this._renderItem(item, index)}
                                    keyExtractor={(item, index) => index.toString()}
                                    ItemSeparatorComponent={Divider}
                                />

                            </View>
                        </View>
                    </Modal>

                    <TextInput
                        mode='outlined'
                        label='Start Date'
                        value={startDate}
                        render={props => <DatePickerButton {...props} value={startDate} onPress={() => this.showPicker('startDate')}/>}
                        style={{marginBottom: 20}}
                        onChangeText={(val) => updateTransactionValues('startDate', val)}
                    />

                    <TextInput
                        mode='outlined'
                        label='End Date'
                        value={endDate}
                        render={
                            props =>
                                <DatePickerButton {...props} value={endDate} onPress={() => this.showPicker('endDate')}/>
                        }
                        onChangeText={(val) => updateTransactionValues('endDate', val)}
                    />

                    <CommonButton
                        label='Search'
                        onPress={() => this.onButtonPressed()}
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
    return { ...state.profileSettingsData, ...state.accountData, ...state.priceChartData,
        fundedData: state.dashboardData.fundedData };
};

export default connect(mapStateToProps, { updateTransactionValues, showFundTypesModal, closeFundTypesModal, selectFundType
,detailedAccountData})(SearchTransaction);