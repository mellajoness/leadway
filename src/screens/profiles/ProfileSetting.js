import React, { Component } from 'react';
import {View, TouchableOpacity, StyleSheet, ImageBackground, Image} from 'react-native';
import { CONTAINER_STYLE } from '../../shared/Styles';
import { CommonHeader, BoldText } from '../../components';
import { Divider } from 'react-native-paper';
import {ACCENT_COLOR, DARK_COLOR, LIGHT_COLOR} from '../../shared/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {fetchUserProfile} from "../../store/actions";
import {connect} from "react-redux";

class ProfileSetting extends Component {

    componentDidMount() {
        this.props.fetchUserProfile({});
    }

    onItemPressed(page) {
        this.props.navigation.navigate(page);
    }

    render () {
        return (
            <View style={CONTAINER_STYLE}>

                <CommonHeader title='Profile Settings'
                              menuButtonPress={() => this.props.navigation.openDrawer()}
                              rightIcon='notifications-none'
                              rightActionPress={() => this.props.navigation.navigate("Message")}
                />

                <ImageBackground
                    source={require('../../assets/images/BG2.png')}
                    resizeMode='cover'
                    style={{flex: 1}}>

                    <View>
                        <BoldText label='Profile Settings' style={{margin: 20}} size={23} color={ACCENT_COLOR}/>

                        <TouchableOpacity style={styles.backgroundLight} onPress={() => this.onItemPressed("ChangePersonalDetails")}>
                            <View style={{flexDirection: 'row'}}>
                                <Image source={require('../../assets/images/changeuserdetails.png')}/>
                                <BoldText label='Change personal details' size={16} color={DARK_COLOR} style={{marginLeft: 30}} />
                            </View>

                            <Icon name={'navigate-next'} size={30} color={ACCENT_COLOR}/>

                        </TouchableOpacity>

                        <Divider/>

                        <TouchableOpacity style={styles.background} onPress={() => this.onItemPressed("ChangeEmployerDetails")}>
                            <View style={{flexDirection: 'row'}}>
                                <Image source={require('../../assets/images/change_employer_details.png')}/>
                                <BoldText label='Change employer details' size={16} color={DARK_COLOR} style={{marginLeft: 30}} />
                            </View>

                            <Icon name={'navigate-next'} size={30} color={ACCENT_COLOR}/>

                        </TouchableOpacity>

                        <Divider/>

                        <TouchableOpacity style={styles.backgroundLight} onPress={() => this.onItemPressed("ChangeMobilePin")}>
                            <View style={{flexDirection: 'row'}}>
                                <Image source={require('../../assets/images/change_mobile_pin.png')}/>
                                <BoldText label='Change mobile pin' size={16} color={DARK_COLOR} style={{marginLeft: 30}} />
                            </View>

                            <Icon name={'navigate-next'} size={30} color={ACCENT_COLOR}/>

                        </TouchableOpacity>

                        <Divider/>

                        <TouchableOpacity style={styles.background} onPress={() => this.onItemPressed("Subscription")}>
                            <View style={{flexDirection: 'row'}}>
                                <Image source={require('../../assets/images/Subscription.png')}/>
                                <BoldText label='Subscription' size={16} color={DARK_COLOR} style={{marginLeft: 30}} />
                            </View>

                            <Icon name={'navigate-next'} size={30} color={ACCENT_COLOR}/>

                        </TouchableOpacity>

                        <Divider/>

                        {/*<TouchableOpacity style={styles.backgroundLight} onPress={() => this.onItemPressed("SwitchFund")}>*/}
                            {/*<View style={{flexDirection: 'row'}}>*/}
                                {/*<Image source={require('../../assets/images/Sswitchfunds.png')}/>*/}
                                {/*<BoldText label='Switch Fund' size={16} color={DARK_COLOR} style={{marginLeft: 30}} />*/}
                            {/*</View>*/}

                            {/*<Icon name={'navigate-next'} size={30} color={ACCENT_COLOR}/>*/}

                        {/*</TouchableOpacity>*/}

                        {/*<Divider/>*/}

                    </View>

                </ImageBackground>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    backgroundLight: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 25,
        backgroundColor: LIGHT_COLOR,
        justifyContent: 'space-between',
    },
    background: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 25,
        justifyContent: 'space-between',
    }
});

const mapStateToProps = (state) => {
    return { ...state.profileSettingsData};
};

export default connect(mapStateToProps, { fetchUserProfile })(ProfileSetting);