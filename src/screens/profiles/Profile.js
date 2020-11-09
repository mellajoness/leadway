import React, {Component} from 'react';
import {View, Image, StyleSheet, ScrollView} from 'react-native';
import {CONTAINER_STYLE} from '../../shared/Styles';
import {CommonHeader, RegularText, BoldText, CustomLoader} from '../../components';
import {ACCENT_COLOR, PRIMARY_COLOR, TERTIARY_COLOR} from '../../shared/Colors';
import {connect} from 'react-redux';
import {fetchUserProfile, fetchUserProfilePicture} from "../../store/actions";
import {Divider} from "react-native-paper";

class Profile extends Component {

    componentDidMount() {
        this.props.fetchUserProfile({});
        this.props.fetchUserProfilePicture();
    }

    onButtonPressed() {
        // LOGGER('pencome test', this.getProfile())
        this.props.navigation.navigate('ProfileSetting');
    }

    _renderItem(item, index) {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 25, marginTop: 20}}>
                <RegularText label='Account Officer' color={ACCENT_COLOR}/>
                <View style={{flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                    <RegularText label={item.Name} color={ACCENT_COLOR} size={14} style={{fontStyle: 'italic'}}/>
                    <RegularText label={item.Email} color={ACCENT_COLOR} size={14} style={{fontStyle: 'italic'}}/>
                    <RegularText label={item.PhoneNo} color={ACCENT_COLOR} size={14} style={{fontStyle: 'italic'}}/>
                </View>
            </View>
        )
    }

    render() {
        const {
            loading, pencom, selectedTitle, surname, firstname, employername, mobileno, emailaddres, dateofbirth
            , residentialaddress1, residentialaddress2, accountOfficers, profilepicture
        } = this.props;

        return (
            <View style={CONTAINER_STYLE}>

                <CommonHeader
                    title='Profile'
                    menuButtonPress={() => this.props.navigation.openDrawer()}
                    rightIcon='settings'
                    rightActionPress={() => this.props.navigation.navigate("ProfileSetting")}
                />

                <ScrollView style={{flex: 1}}>
                    <View style={styles.profileStyle}>
                        <View style={{marginBottom: 0, padding: 20, paddingBottom: 35, flexDirection: 'row'}}>
                            <Image
                                source={profilepicture ? {uri: profilepicture} : require('../../assets/images/user.png')}
                                style={{
                                    height: 90,
                                    width: 90,
                                    borderRadius: 45,
                                    borderColor: TERTIARY_COLOR,
                                    borderWidth: 1
                                }}
                                resizeMode='cover'
                            />

                            <View style={{justifyContent: 'center', marginStart: 15}}>
                                <BoldText label={selectedTitle + ' ' + surname + ' ' + firstname} color={TERTIARY_COLOR}
                                          size={25} style={{paddingTop: 10}}/>
                                <RegularText label={pencom} color={PRIMARY_COLOR} size={15} style={{paddingTop: 5}}/>
                            </View>
                        </View>

                        <View style={{marginTop: 0}}>
                            <Divider/>

                            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 25,}}>
                                <RegularText label='Employer' color={TERTIARY_COLOR}
                                             style={{alignItems: 'flex-start', width: '30%'}}/>
                                <RegularText label={employername} color={PRIMARY_COLOR} size={14}
                                             style={{width: '60%'}}/>
                            </View>

                            <Divider/>

                            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 25,}}>
                                <RegularText label='Mobile' color={TERTIARY_COLOR}
                                             style={{alignItems: 'flex-start', width: '30%'}}/>
                                <RegularText label={mobileno} color={PRIMARY_COLOR} size={14} style={{width: '60%'}}/>
                            </View>

                            <Divider/>

                            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 25,}}>
                                <RegularText label='Email' color={TERTIARY_COLOR}
                                             style={{alignItems: 'flex-start', width: '30%'}}/>
                                <RegularText label={emailaddres} color={PRIMARY_COLOR} size={14}
                                             style={{width: '60%'}}/>
                            </View>

                            <Divider/>

                            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 25,}}>
                                <RegularText label='Date of Birth' color={TERTIARY_COLOR}
                                             style={{alignItems: 'flex-start', width: '30%'}}/>
                                <RegularText label={dateofbirth} color={PRIMARY_COLOR} size={14}
                                             style={{width: '60%'}}/>
                            </View>

                            <Divider/>

                            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 25,}}>
                                <RegularText label='Address' color={TERTIARY_COLOR}
                                             style={{alignItems: 'flex-start', width: '30%'}}/>
                                <RegularText label={residentialaddress1} color={PRIMARY_COLOR} size={14}
                                             style={{width: '60%'}}/>
                            </View>

                            <Divider/>

                            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 25,}}>
                                <RegularText label='Area' color={TERTIARY_COLOR}
                                             style={{alignItems: 'flex-start', width: '30%'}}/>
                                <RegularText label={residentialaddress2} color={PRIMARY_COLOR} size={14}
                                             style={{width: '60%'}}/>
                            </View>

                            <Divider/>

                            {/*<FlatList*/}
                            {/*data={accountOfficers}*/}
                            {/*renderItem={({item, index}) => this._renderItem(item, index)}*/}
                            {/*keyExtractor={(item, index) => index.toString()}*/}
                            {/*ItemSeparatorComponent={Divider}*/}
                            {/*/>*/}
                        </View>

                    </View>
                </ScrollView>

                <CustomLoader visible={loading}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    profileStyle: {
        paddingHorizontal: 20,
        paddingVertical: 15
    },
});

const mapStateToProps = (state) => {
    return {...state.profileSettingsData, profilepicture: state.loginData.profilepicture}
    // return { ...state.profileSettingsData, ...state.loginData}
};

export default connect(mapStateToProps, {fetchUserProfile, fetchUserProfilePicture})(Profile);
