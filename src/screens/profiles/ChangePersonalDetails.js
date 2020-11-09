import React, { Component } from 'react';
import { View, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { CONTAINER_STYLE } from '../../shared/Styles';
import {CommonHeader, CommonButton, DatePickerButton, RegularText, CustomLoader} from '../../components';
import { TextInput, List, Divider } from 'react-native-paper';
import { showGenderModal,
        closeGenderModal,
        showTitleModal,
        closeTitleModal,
        selectGender,
        selectTitle,
        updatePersonalDetailValues,
        submitPersonalDetailsApplication } from '../../store/actions';
import { connect } from 'react-redux';

class ChangePersonalDetails extends Component {

    onButtonPressed(request) {
        this.props.submitPersonalDetailsApplication(request);
    }

    buttonDisability() {
        return !(this.props.selectedTitle && this.props.emailaddres &&
            this.props.mobileno && this.props.selectedGender && this.props.selectedLocalGovernment);
    };

    requestBody() {
        return {
            Title: this.props.selectedTitle,
            Email: this.props.emailaddres,
            Mobile: this.props.mobileno,
            Gender: this.props.selectedGender,
            LGA: this.props.selectedLocalGovernment
        };
    }

    render () {
        const { showModalForGender, showModalForTitle, selectedGender, selectedTitle, mobileno, emailaddres,
                loading, updatePersonalDetailValues, selectedLocalGovernment } = this.props;

        return (
            <View style={CONTAINER_STYLE}>

                <CommonHeader
                    title='Change personal details'
                    backAction backActionPress={() => this.props.navigation.goBack()}
                    rightIcon='notifications-none'
                    rightActionPress={() => this.props.navigation.navigate("Message")}
                />

                <ScrollView style={{flex: 1, padding: 20}}>

                    <TextInput
                        mode='outlined'
                        label='Title'
                        render={props =>
                            <DatePickerButton
                                {...props}
                                icon='arrow-drop-down'
                                value={selectedTitle}
                                disabled={true}
                                onPress={() => this.props.showTitleModal()}
                            />
                        }
                        style={inputStyle}
                        value={selectedTitle}
                        onChangeText={(val) => updatePersonalDetailValues('selectedTitle', val)}
                    />

                    <TextInput
                        mode='outlined'
                        label='Email address'
                        placeholder='Enter email address'
                        style={inputStyle}
                        keyboardType='email-address'
                        value={emailaddres}
                        editable={false}
                        onChangeText={(val) => updatePersonalDetailValues('emailaddres', val)}
                    />

                    <TextInput
                        mode='outlined'
                        label='Mobile number'
                        placeholder='Enter mobile number'
                        keyboardType='numeric'
                        maxLength={15}
                        style={inputStyle}
                        value={mobileno}
                        onChangeText={(val) => updatePersonalDetailValues('mobileno', val)}
                    />

                    <TextInput
                        mode='outlined'
                        label='Gender'
                        render={props =>
                            <DatePickerButton
                                {...props}
                                icon='arrow-drop-down'
                                value={selectedGender}
                                disabled={true}
                                onPress={() => this.props.showGenderModal()}
                            />
                        }
                        style={inputStyle}
                        value={selectedGender}
                        onChangeText={(val) => updatePersonalDetailValues('selectedGender', val)}
                    />

                    <TextInput
                        mode='outlined'
                        label='LGA'
                        render={props =>
                            <DatePickerButton
                                {...props}
                                icon='arrow-drop-down'
                                value={selectedLocalGovernment}
                                onPress={() => this.props.navigation.navigate('LocalGovernment')}
                            />
                        }
                        value={selectedLocalGovernment}
                        onChangeText={(val) => updatePersonalDetailValues('selectedLocalGovernment', val)}
                    />

                    <CommonButton
                        label='Update'
                        onPress={() => this.onButtonPressed(this.requestBody())}
                        style={{marginBottom: 30}}
                        disabled={this.buttonDisability()}/>
                </ScrollView>

                <CustomLoader visible={loading} />

                <Modal
                    visible={showModalForGender}
                    onRequestClose={() => this.props.closeGenderModal()}
                    animationType='slide'
                    transparent
                >
                    <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.4)'}}>
                        <TouchableOpacity
                            style={{flex: 1}}
                            onPress={() => this.props.closeGenderModal()}
                        />

                        <View style={{backgroundColor: 'white', paddingBottom: 10}}>
                            <List.Item
                                title={<RegularText label='Male' />}
                                onPress={() => this.props.selectGender('M')}
                            />

                            <Divider />

                            <List.Item
                                title={<RegularText label='Female' />}
                                onPress={() => this.props.selectGender('F')}
                            />

                        </View>
                    </View>
                </Modal>

                <Modal
                    visible={showModalForTitle}
                    onRequestClose={() => this.props.closeTitleModal()}
                    animationType='slide'
                    transparent
                >
                    <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.4)'}}>
                        <TouchableOpacity
                            style={{flex: 1}}
                            onPress={() => this.props.closeTitleModal()}
                        />

                        <View style={{backgroundColor: 'white', paddingBottom: 10}}>
                            <List.Item
                                title={<RegularText label='Mr.' />}
                                onPress={() => this.props.selectTitle('Mr.')}
                            />

                            <Divider />

                            <List.Item
                                title={<RegularText label='Mrs.' />}
                                onPress={() => this.props.selectTitle('Mrs.')}
                            />

                            <Divider />

                            <List.Item
                                title={<RegularText label='Miss' />}
                                onPress={() => this.props.selectTitle('Miss')}
                            />

                        </View>
                    </View>
                </Modal>

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

export default connect(mapStateToProps, {
                        showGenderModal,
                        closeGenderModal,
                        showTitleModal,
                        closeTitleModal,
                        selectGender,
                        selectTitle,
                        updatePersonalDetailValues,
                        submitPersonalDetailsApplication
                    })(ChangePersonalDetails);
