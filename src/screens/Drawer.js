import React, {Component} from 'react';
import {View, Image, TouchableOpacity, StyleSheet, ScrollView, Linking} from 'react-native';
import {BoldText, RegularText} from '../components';
import {DARK_COLOR, ACCENT_COLOR, PRIMARY_COLOR, RED_COLOR, GRADIENT_COLOR} from '../shared/Colors';
import {Divider} from 'react-native-paper';
import MatIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {connect} from 'react-redux';
import {
    authenticateUser,
    logoutButtonPressed,
    fetchUserProfilePicture,
    activateActiveComponent,
} from "../store/actions";
import LinearGradient from "react-native-linear-gradient";

class Drawer extends Component {

    async componentDidMount() {
        this.props.fetchUserProfilePicture();
    };

    _navigate(pageName) {
        this.props.navigation.navigate(pageName);
        this.props.activateActiveComponent(pageName);
    }

    navColor(pageName) {
        if (this.props.activeComponent === pageName) {
            return ACCENT_COLOR;
        } else {
            return PRIMARY_COLOR;
        }
    }

    navLabelColor(pageName) {
        if (this.props.activeComponent === pageName) {
            return ACCENT_COLOR;
        } else {
            return DARK_COLOR;
        }
    }

    logoutButton() {
        this.props.logoutButtonPressed(true);
    }

    render() {
        const {fullname, pencom, profilepicture} = this.props;
        return (
            <View style={{flex: 1}}>

                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={GRADIENT_COLOR}>
                    <TouchableOpacity
                        style={{marginBottom: 0, padding: 20, paddingTop: 35, paddingBottom: 35, flexDirection: 'row'}}>
                        <View style={{width: '30%'}}>
                            <Image
                                source={profilepicture ? {uri: profilepicture} : require('../assets/images/user.png')}
                                style={{height: 80, width: 80, borderRadius: 40}}
                                resizeMode='cover'
                            />
                        </View>

                        <View style={{justifyContent: 'center', width: '70%', marginStart: 15}}>
                            <BoldText label={fullname} size={20} color='white' style={{textAlign: 'center'}}/>
                            <RegularText label={pencom} size={12} color='white'
                                         style={{marginTop: 10, marginStart: 10}}/>
                        </View>
                    </TouchableOpacity>
                </LinearGradient>

                <Divider/>

                <ScrollView style={{flex: 1}}>
                    <View>
                        <TouchableOpacity style={styles.row} onPress={() => this._navigate('Dashboard')}>
                            <MatIcon name='home-circle' size={22} color={this.navColor('Dashboard')}/>
                            <RegularText label='Dashboard' size={17} color={this.navLabelColor('Dashboard')}
                                         style={{marginLeft: 20}}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.row} onPress={() => this._navigate('Profile')}>
                            <MatIcon name='account-settings' size={22} color={this.navColor('Profile')}/>
                            <RegularText label='Profile' size={17} color={this.navLabelColor('Profile')}
                                         style={{marginLeft: 20}}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.row} onPress={() => this._navigate('Message')}>
                            <MatIcon name='message-text' size={22} color={this.navColor('Message')}/>
                            <RegularText label='Message' size={17} color={this.navLabelColor('Message')}
                                         style={{marginLeft: 20}}/>
                        </TouchableOpacity>

                        <Divider/>

                        <TouchableOpacity style={styles.row} onPress={() => this._navigate('Benefit')}>
                            <Icon name='poll' size={22} color={this.navColor('Benefit')}/>
                            <RegularText label='Benefit Application' size={17} color={this.navLabelColor('Benefit')}
                                         style={{marginLeft: 20}}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.row} onPress={() => this._navigate('SwitchFund')}>
                            <MatIcon name='toggle-switch-off' size={22} color={this.navColor('SwitchFund')}/>
                            <RegularText label='Switch Fund' size={17} color={this.navLabelColor('SwitchFund')}
                                         style={{marginLeft: 20}}/>
                        </TouchableOpacity>

 
                        
                        <TouchableOpacity style={styles.row} onPress={() => this._navigate('RSA')}>
                            <MatIcon name='toggle-switch-off' size={22} color={this.navColor('RSA')}/>
                            <RegularText label='Retirement Savings Account' size={17} color={this.navLabelColor('RSA')}
                                         style={{marginLeft: 20}}/>
                        </TouchableOpacity>
                          
                        <TouchableOpacity style={styles.row} onPress={() => this._navigate('AVC')}>
                            <MatIcon name='toggle-switch-off' size={22} color={this.navColor('AVC')}/>
                            <RegularText label='Additional Voluntary Contribution' size={17} color={this.navLabelColor('AVC')}
                                         style={{marginLeft: 20}}/>
                        </TouchableOpacity>
                        
                        



                        <Divider/>

                        <TouchableOpacity style={styles.row} onPress={() => this._navigate('Products')}>
                            <MatIcon name='apps' size={22} color={this.navColor('Products')}/>
                            <RegularText label='Products' size={17} color={this.navLabelColor('Products')}
                                         style={{marginLeft: 20}}/>
                        </TouchableOpacity>

                        {/*<TouchableOpacity style={styles.row} onPress={() => this._navigate('Branches')}>*/}
                        {/*<MatIcon name='domain' size={22} color={this.navColor('Branches')} />*/}
                        {/*<RegularText label='Branches' size={17} color={this.navLabelColor('Branches')} style={{marginLeft: 20}} />*/}
                        {/*</TouchableOpacity>*/}

                        {/*<Divider />*/}

                        {/*<TouchableOpacity style={styles.row} onPress={() => this._navigate('FAQs')}>*/}
                        {/*<MatIcon name='help-circle-outline' size={22} color={this.navColor('FAQs')} />*/}
                        {/*<RegularText label='FAQs' size={17} color={this.navLabelColor('FAQs')} style={{marginLeft: 20}} />*/}
                        {/*</TouchableOpacity>*/}

                        {/*<Divider/>*/}

                        {/*<TouchableOpacity style={styles.row} onPress={() => this._navigate('Survey')}>*/}
                        {/*<MatIcon name='chart-pie' size={20} color={this.navColor('Survey')} />*/}
                        {/*<RegularText label='Surveys' size={15} color={this.navColor('Survey')} style={{marginLeft: 20}} />*/}
                        {/*</TouchableOpacity>*/}

                        {/*<Divider />*/}

                        <TouchableOpacity style={styles.row} onPress={async () => await Linking.openURL('https://surecal.leadway-pensure.com/')}>
                            <MatIcon name='calculator' size={22} color={this.navColor('Calculator')}/>
                            <RegularText label='Lifestyle Calculator' size={17}
                                         color={this.navLabelColor('Calculator')} style={{marginLeft: 20}}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.row} onPress={() => this._navigate('More')}>
                            <Icon name='more-vert' size={22} color={this.navColor('More')}/>
                            <RegularText label='More' size={17} color={this.navLabelColor('More')}
                                         style={{marginLeft: 20}}/>
                        </TouchableOpacity>

                        <Divider/>

                        {/*<TouchableOpacity style={styles.row} onPress={() => this._navigate('PChart')}>*/}
                        {/*<MatIcon name='chart-line' size={22} color={this.navColor('PChart')} />*/}
                        {/*<RegularText label='Price Chart' size={17} color={this.navLabelColor('PChart')} style={{marginLeft: 20}} />*/}
                        {/*</TouchableOpacity>*/}

                        {/*<Divider />*/}

                        {/*<TouchableOpacity style={styles.row} onPress={() => this._navigate('Sector')}>*/}
                        {/*<MatIcon name='camera-burst' size={22} color={this.navColor('Sector')} />*/}
                        {/*<RegularText label='Sector' size={17} color={this.navLabelColor('Sector')} style={{marginLeft: 20}} />*/}
                        {/*</TouchableOpacity>*/}
                    </View>
                    <Divider/>

                    <View>
                        <TouchableOpacity style={styles.row} onPress={() => this._navigate('ProfileSetting')}>
                            <MatIcon name='settings' size={22} color={this.navColor('ProfileSetting')}/>
                            <RegularText label='Settings' size={17} color={this.navLabelColor('ProfileSetting')}
                                         style={{marginLeft: 20}}/>
                        </TouchableOpacity>

                        {/*<TouchableOpacity style={styles.row} onPress={() => {this.logoutButton()}}>*/}
                        {/*<MatIcon name='logout' size={22} color={RED_COLOR} />*/}
                        {/*<RegularText label='Logout' size={17} color={RED_COLOR} style={{marginLeft: 20}} />*/}
                        {/*</TouchableOpacity>*/}
                    </View>
                </ScrollView>

                <Divider/>

                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity style={styles.row} onPress={() => this.logoutButton()}>
                        <MatIcon name='logout' size={20} color={RED_COLOR}/>
                        <RegularText label='Logout' size={17} color={RED_COLOR} style={{marginLeft: 15}}/>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15
    }
});

const mapStateToProps = (state) => {
    return state.loginData;
};

export default connect(mapStateToProps, {
    authenticateUser,
    logoutButtonPressed,
    fetchUserProfilePicture,
    activateActiveComponent,
})(Drawer);
