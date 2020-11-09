import React, { Component } from 'react';
import {View, TouchableOpacity, Platform, Alert, FlatList, ScrollView, Image, ImageBackground, Text} from 'react-native';
import { CONTAINER_STYLE } from '../../shared/Styles';
import {
    CommonHeader,
    RegularText,
    BoldText,
    CommonNextButton,
    DatePickerButton,
    IOSDatePicker,
    CustomLoader
} from '../../components';
import {Divider, TextInput} from 'react-native-paper';
import {ACCENT_COLOR, DARK_COLOR, LIGHT_COLOR, PRIMARY_COLOR} from '../../shared/Colors';
import {ANDROID_DATE_PICKER, LOGGER} from '../../shared/Methods';
import { connect } from 'react-redux';
import { submitBenefitApplication, updateBenefitApplicationValues, fetchBenefitType, selectBenefitType, selectBenefitTypeName} from "../../store/actions";
import Icon from 'react-native-vector-icons/MaterialIcons'
import Moment from "moment";

class Apply extends Component {

    componentDidMount() {
        this.props.fetchBenefitType({});
    }

    selectBenefitButton(id, name)
    {
        this.props.selectBenefitType(id);
        this.props.selectBenefitTypeName(name);
        this.setState({paymentType: id})
    }

    monthStrings = [
        'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
        'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
    ];

    state = {
        paymentType: '',
        dateOfDisengagement: '',
        dob: '',
        tin: '',
        selectedDate: new Date(),
        showDateIOS: false,
        caller: ''
    };

    async showPicker(caller) {
        LOGGER('caller', caller)
        let sDate = new Date();

        // if (this.state[caller]) {
        //     const splitter = this.state[caller].split('/');
        //     sDate = new Date(splitter[2], this.monthStrings.indexOf(splitter[1]), splitter[0]);
        //     // sDate = new Date(splitter[2], splitter[1] - 1, splitter[0]);
        // }

        if (Platform.OS === 'ios') {
            LOGGER('sDate', sDate)
            this.setState({showDateIOS: true, selectedDate: new Date(sDate), caller: caller});
        } else {
            const _date = await ANDROID_DATE_PICKER(sDate);
            const formatedDate = Moment(_date, "YYYY-MM-DD").format("YYYY-MM-DD");

            this.validateDate(caller, formatedDate, _date)
        }
    }

    validateDate(caller, formatedDate, _date) {
        LOGGER('_date', _date)
        if(caller === 'dob') {
            const years = Moment().diff(formatedDate, 'years');

            if ((years < 18) || years > 49) {
                this.props.updateBenefitApplicationValues('dob', '')
                Alert.alert("Error", "You are not eligible to apply for this benefit type because your age is either" +
                    " below 18 or above 49");
            }
            else {
                if (_date) this.setState({[caller]: _date, selectedDate: new Date(_date)});
            }
        }
        else if(caller === 'dateOfDisengagement')
        {
            const months = Moment().diff(formatedDate, 'months');

            if (months < 4) {
                Alert.alert("Error", "Date of disengagement cannot be less than 4 months");
                this.props.updateBenefitApplicationValues('dateOfDisengagement', '')
            }
            else {
                if (_date) this.setState({[caller]: _date, selectedDate: new Date(_date)});
            }
        }
    }

    updateDate(val) {
        const { caller } = this.state;
        const date = new Date(val);
        const formatedDate = Moment(date, "YYYY-MM-DD").format("YYYY-MM-DD");

        this.validateDate(caller, formatedDate, formatedDate)
    }

    closeDatePicker() {
        this.setState({showDateIOS: false});
    }

    onSubmitButtonPressed() {
        this.props.navigation.navigate('BenefitForm');
    }

    buttonDisability() {
        if(this.state.paymentType === 7)
        {
            return !(this.props.taxNum);
        }
        else if(this.state.paymentType === 2)
        {
            return !(this.state.dob && this.state.dateOfDisengagement);
        }
    };

    _icon = (value) => {
        return value === 7 ? require('../../assets/images/tin.png') : require('../../assets/images/lumpsum.png')
    };

    _renderItem(item, index) {
        return (
            <View>
                <TouchableOpacity style={styles.backgroundLight} onPress={() =>
                    this.selectBenefitButton(item.approvalIDField, item.approvalNameField)} >
                    <View style={{flexDirection: 'row'}}>
                        <Image source={this._icon(item.approvalIDField)}/>
                        <Image source={require('../../assets/images/line.png')} style={{marginStart: 10}}/>
                    </View>
                    <BoldText label={item.approvalNameField} size={20} style={{width: '65%', marginStart: 20}} color={DARK_COLOR}/>
                    <Icon name={'navigate-next'} size={30} color={ACCENT_COLOR}/>
                </TouchableOpacity>

                <View style={{marginTop: 20}}/>
            </View>
        )
    }

    render() {

        const { taxNum, updateBenefitApplicationValues, benefitTypeList, loading } = this.props;

        const _borderColor = (value) => {
            return value === this.state.paymentType ? PRIMARY_COLOR : DARK_COLOR
        };

        const avcView = () => {
            if (this.state.paymentType === 7) {
                return (
                    <TextInput
                        mode='outlined'
                        label='TIN (Tax ID Number)'
                        value={taxNum}
                        placeholder='Tax ID Number'
                        onChangeText={(val) => updateBenefitApplicationValues('taxNum', val)}
                    />
                )
            }
        };

        const lumpSum = () => {
            if (this.state.paymentType === 2) {
                return (
                    <View>
                        <TextInput
                            mode='outlined'
                            label='Date of Birth'
                            value={this.state.dob}
                            render={props => <DatePickerButton {...props} value={this.state.dob} onPress={() => this.showPicker('dob')}/>}
                            style={{marginBottom: 20}}
                            onChangeText={(val) => updateBenefitApplicationValues('dob', val)}
                        />
    
                        <TextInput
                            mode='outlined'
                            label='Date of Disengagement'
                            value={this.state.dateOfDisengagement}
                            render={
                                props => 
                                <DatePickerButton {...props} value={this.state.dateOfDisengagement} onPress={() => this.showPicker('dateOfDisengagement')}/>
                            }
                            onChangeText={(val) => updateBenefitApplicationValues('dateOfDisengagement', val)}
                        />
                    </View>
                )
            }

            return null;
        };

        return (

            <View style={CONTAINER_STYLE}>
                <CommonHeader title='Benefit Application'
                              menuButtonPress={() => this.props.navigation.openDrawer()}
                              rightIcon='notifications-none'
                              rightActionPress={() => this.props.navigation.navigate("Message")}/>

                <ImageBackground
                    source={require('../../assets/images/BG2.png')}
                    resizeMode='cover'
                    style={{flex: 1}}>

                    <View>
                        <BoldText label='Select Payment Type' style={{margin: 20, marginBottom: 30}} size={23} color={ACCENT_COLOR}/>

                        <FlatList
                            data={benefitTypeList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item, index}) => this._renderItem(item, index)}
                        />

                    </View>

                <View style={{flex: 1, paddingHorizontal: 20, justifyContent: 'center'}}>

                    {avcView()}
                    {lumpSum()}

                    {
                        this.state.paymentType
                            ? <CommonNextButton label='Next'
                                            disabled={this.buttonDisability()}
                                            onPress={() => this.onSubmitButtonPressed() } />
                            : null
                    }
                </View>

                <IOSDatePicker
                    visible={this.state.showDateIOS}
                    onDateChange={(val) => this.updateDate(val)}
                    onRequestClose={() => this.closeDatePicker()}
                    closeDate={() => this.closeDatePicker()}
                    date={new Date(this.state.selectedDate)}
                />

                <CustomLoader visible={loading} />

                </ImageBackground>

            </View>
        );
    }
}

const styles = {
    benefitActions: {
        height: 130,
        width: 130,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 5
    },
    backgroundLight: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
        justifyContent: 'space-between',
        backgroundColor: LIGHT_COLOR
    }
};

const mapStateToProps = (state) => {
    return state.benefitApplicationData;
};

export default connect(mapStateToProps, {updateBenefitApplicationValues, submitBenefitApplication, fetchBenefitType,
    selectBenefitType, selectBenefitTypeName})(Apply);