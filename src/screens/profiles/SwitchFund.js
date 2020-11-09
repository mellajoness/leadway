import React, {Component} from 'react';
import {CONTAINER_STYLE} from "../../shared/Styles";
import {FlatList, Linking, Modal, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {BoldText, CommonNextButton, CommonHeader, DatePickerButton, RegularText} from "../../components";
import {DARK_COLOR, GRADIENT_COLOR, PRIMARY_COLOR} from "../../shared/Colors";
import {
    closeFundTypesModal,
    getActiveFunds,
    showFundTypesModal,
    updateSwitchFundValues,
    selectFundTypes,
    selectFundTypesTo,
    closeFundTypesToModal,
    showFundTypesToModal,
    submitSwitchFundRequest,
    closeCertificateDialog,
    showCertificateDialog,
} from "../../store/actions";
import {Divider, TextInput, List, Text} from "react-native-paper";
import Moment from 'moment';
import {GET_EMAIL, GET_FULLNAME, GET_MOBILE_NUMBER, GET_PENCOMPIN} from "../../shared/Storage";
import {connect} from "react-redux";
import LinearGradient from 'react-native-linear-gradient';
import {LOGGER} from "../../shared/Methods";

class SwitchFund extends Component {

    componentDidMount() {
        this.props.getActiveFunds();
        this.fetchStoredData();

        const selectedFT = this.props.selectedFundType;
        const lastChar = selectedFT[selectedFT.length - 1];
        this.pickFundType(parseInt(lastChar));
    }

    buttonDisability() {
        return !(this.props.selectedFundType && this.props.selectedFundTypeTo);
    };

    state = {
        switchFundToList: [],
        fullName: '',
        penCom: '',
        mobile: '',
    };

    submitSwitchButton() {
        LOGGER('age', this.getEmployerAge())
        if ((this.props.selectedFundType === 'Fund 2')
            && (this.props.selectedFundTypeTo === 'Fund 3')
            && (this.getEmployerAge() < 50)) {
            alert('You are not allowed to switch fund because you are not up to 50 years old.');
            this.props.closeCertificateDialog();
        } else {
            this.props.showCertificateDialog();
        }
    }

    getEmployerAge() {
        const dateofbirth = this.props.dateofbirth;
        const formatedDOB = Moment(dateofbirth).format("YYYY-MM-DD");

        return Moment().diff(formatedDOB, 'years', false);
    }

    agreeTermAndCondtions() {
        this.props.closeCertificateDialog();
        this.props.navigation.navigate('Sig');
    }

    async fetchStoredData() {
        const pencom = await GET_PENCOMPIN();
        const fullname = await GET_FULLNAME();
        const email = await GET_EMAIL();
        const mobile = await GET_MOBILE_NUMBER();

        this.setState({penCom: pencom, fullName: fullname, email: email, mobile: mobile});
    }

    pickFundType(id) {
        this.props.selectFundTypes('Fund ' + id);

        let ids;
        if (id === 1)
            ids = [2];
        else if (id === 2)
        {
            if(this.getEmployerAge() < 50)
                ids = [1];
            else
                ids = [1,3];
        }
        else if (id === 3)
            ids = [2];
        else
            ids = [];

        this.setState({switchFundToList: ids})
    }

    _renderItem(item, index, isSwitch) {
        if (isSwitch) {
            return <List.Item
                title={<BoldText label={'Fund ' + item}/>}
                onPress={() => this.props.selectFundTypesTo('Fund ' + item)}
            />
        } else {
            return <List.Item
                title={<BoldText label={'Fund ' + item['FundID'] + ' (' + item['FundTitle'] + ')'}/>}
                onPress={() => this.pickFundType(item['FundID'])}
            />
        }
    }

    render() {
        const {
            activefunds, showModelForFundType, showModelForFundTypeTo, updateSwitchFundValues, selectedFundType,
            selectedFundTypeTo, loading, showCertificate, closeCertificateDialog, showCertificateDialog
        } = this.props;

        return (
            <View style={CONTAINER_STYLE}>
                <CommonHeader
                    title='Switch Fund'
                    // backAction backActionPress={() => this.props.navigation.goBack()}
                    menuButtonPress={() => this.props.navigation.openDrawer()}
                    rightIcon='notifications-none'
                    rightActionPress={() => this.props.navigation.navigate("Message")}
                />

                <View style={{padding: 20}}>

                    <BoldText label='MULTI-FUND SWITCH FORM' color={DARK_COLOR} size={18} style={{marginBottom: 15}}/>

                    {/*<RegularText label={data} color={DARK_COLOR} size={15} style={{marginBottom: 30, lineHeight: 20}} />*/}
                    <RegularText>
                        <RegularText label="I "/>
                        <BoldText label={this.state.fullName}/>
                    </RegularText>

                    <Text numberOfLines={5}
                          style={{fontFamily: 'Lato', fontSize: 15, lineHeight: 25, marginBottom: 20}}>
                        <Text>
                            {"I "}
                        </Text>
                        <Text style={{fontWeight: 'bold'}}>
                            {this.state.fullName}
                        </Text>
                        <Text>
                            {" Holder of Retirement Savings Account (RSA) "}
                        </Text>
                        <Text style={{fontWeight: 'bold'}}>
                            {this.state.penCom}
                        </Text>
                        <Text>
                            {" Email Address "}
                        </Text>
                        <Text style={{fontWeight: 'bold'}}>
                            {this.state.email}
                        </Text>
                        <Text>
                            {" Mobile Number "}
                        </Text>
                        <Text style={{fontWeight: 'bold'}}>
                            {this.state.mobile}
                        </Text>
                        <Text>
                            {" would like to switch from: "}
                        </Text>
                    </Text>

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
                        onChangeText={(val) => updateSwitchFundValues('selectedFundType', val)}
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
                                    data={activefunds}
                                    renderItem={({item, index}) => this._renderItem(item, index, false)}
                                    keyExtractor={(item, index) => index.toString()}
                                    ItemSeparatorComponent={Divider}
                                />

                            </View>
                        </View>
                    </Modal>

                    <TextInput
                        mode='outlined'
                        label='Switch Fund Type To'
                        render={props =>
                            <DatePickerButton
                                {...props}
                                icon='arrow-drop-down'
                                value={selectedFundTypeTo}
                                onPress={() => this.props.showFundTypesToModal()}
                            />
                        }
                        style={inputStyle}
                        value={selectedFundTypeTo}
                        onChangeText={(val) => updateSwitchFundValues('selectedFundTypeTo', val)}
                    />

                    <Modal
                        visible={showModelForFundTypeTo}
                        onRequestClose={() => this.props.closeFundTypesToModal()}
                        animationType='slide'
                        transparent
                    >
                        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.4)'}}>
                            <TouchableOpacity
                                style={{flex: 1}}
                                onPress={() => this.props.closeFundTypesToModal()}
                            />

                            <View style={{backgroundColor: 'white', paddingBottom: 10}}>

                                <FlatList
                                    data={this.state.switchFundToList}
                                    renderItem={({item, index}) => this._renderItem(item, index, true)}
                                    keyExtractor={(item, index) => index.toString()}
                                    ItemSeparatorComponent={Divider}
                                />

                            </View>
                        </View>
                    </Modal>

                    <TouchableOpacity
                        onPress={async () => await Linking.openURL('https://leadway-pensure.com/multifundfaq.htm')}
                        style={{alignItems: 'center', marginTop: 20}}>
                        <BoldText label='Click here to know more about Switch Fund' color={PRIMARY_COLOR}/>
                    </TouchableOpacity>

                    <Modal
                        visible={showCertificate}
                        onRequestClose={() => closeCertificateDialog()}
                        animationType='fade'
                    >
                        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.4)'}}>

                            <View style={{backgroundColor: 'white', flex: 1, padding: 10}}>
                                <View style={{paddingBottom: 10}}>
                                    <BoldText label='CERTIFICATION' style={{
                                        padding: 20, justifyContent: 'center',
                                        textAlign: 'center'
                                    }}/>
                                    <Divider/>
                                </View>

                                <ScrollView>
                                    <Text style={{fontFamily: 'Lato', fontSize: 15, lineHeight: 25, marginBottom: 0}}>
                                        <Text>
                                            {"I am fully aware and understand the features of the new fund type I am " +
                                            "choosing, and that:\n\n"}
                                        </Text>
                                        <Text style={{fontWeight: 'bold', width: 20}}>
                                            <Text>{'\u2022' + " "}</Text>
                                        </Text>
                                        <Text style={{flex: 1}}>
                                            <Text>
                                                <Text>{"RSA holders can switch between fund types maximum of twice in a " +
                                                "calendar year.\n"}</Text>
                                            </Text>
                                        </Text>
                                        <Text style={{fontWeight: 'bold', width: 20}}>
                                            <Text>{'\u2022' + " "}</Text>
                                        </Text>
                                        <Text style={{flex: 1}}>
                                            <Text>
                                                <Text>{"The first switch is free but the second switch within the calendar " +
                                                "year would attract a fee.\n"}</Text>
                                            </Text>
                                        </Text>
                                        <Text style={{fontWeight: 'bold', width: 20}}>
                                            <Text>{'\u2022' + " "}</Text>
                                        </Text>
                                        <Text style={{flex: 1}}>
                                            <Text>
                                                <Text>{"Contributors would be able to switch back to the default fund type " +
                                                "as long as age limits are not breached. \n"}</Text>
                                            </Text>
                                        </Text>
                                        <Text style={{fontWeight: 'bold', width: 20}}>
                                            <Text>{'\u2022' + " "}</Text>
                                        </Text>
                                        <Text style={{flex: 1}}>
                                            <Text>
                                                <Text>{"The fee for moving between funds (where it applies) would be deducted" +
                                                " from the contributor’s RSA."}</Text>
                                            </Text>
                                        </Text>
                                        <Text style={{fontWeight: 'bold', fontStyle: 'italic'}}>
                                            {"\n\nDISCLAIMER: "}
                                        </Text>
                                        <Text style={{fontStyle: 'italic'}}>
                                            {" By this application, made with full knowledge of the multi fund guideline, I " +
                                            "accept the consequences of my change instruction; subject to PenCom’s investment" +
                                            " guideline on multi fund which came into force on the 2nd July 2018. I have read" +
                                            " and agreed with this disclaimer. "}
                                        </Text>
                                    </Text>

                                    <Divider style={{marginTop: 10}}/>

                                    <View
                                        style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>

                                        <LinearGradient style={[styles.linearButton, {marginRight: 5}]}
                                                        start={{x: 0, y: 0}}
                                                        end={{x: 1, y: 0}} colors={GRADIENT_COLOR}>
                                            <TouchableOpacity onPress={() => closeCertificateDialog()}>
                                                <RegularText label='DISAGREE' color='white' size={14}/>
                                            </TouchableOpacity>
                                        </LinearGradient>

                                        <LinearGradient style={[styles.linearButton, {marginLeft: 5}]}
                                                        start={{x: 0, y: 0}}
                                                        end={{x: 1, y: 0}} colors={GRADIENT_COLOR}>
                                            <TouchableOpacity onPress={() => this.agreeTermAndCondtions()}>
                                                <RegularText label='AGREE' color='white' size={14}/>
                                            </TouchableOpacity>
                                        </LinearGradient>
                                    </View>

                                </ScrollView>
                            </View>
                        </View>
                    </Modal>

                </View>

                <View style={{marginStart: 20, marginEnd: 20, marginBottom: 20}}>
                    <CommonNextButton
                        label='Next'
                        onPress={() => this.submitSwitchButton()}
                        disabled={this.buttonDisability()}
                    />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputStyle: {
        marginBottom: 15,
        fontFamily: 'Lato'
    },
    linearButton: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderRadius: 3
    },
});

const {inputStyle} = styles;

const mapStateToProps = (state) => {
    return state.profileSettingsData
};

export default connect(mapStateToProps, {
    updateSwitchFundValues, getActiveFunds, showFundTypesModal, closeFundTypesModal
    , showFundTypesToModal, closeFundTypesToModal, selectFundTypes, selectFundTypesTo, submitSwitchFundRequest,
    closeCertificateDialog, showCertificateDialog
})(SwitchFund);
