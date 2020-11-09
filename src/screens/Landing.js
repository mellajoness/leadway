import React, {Component} from 'react';
import {View, ImageBackground, Image, TouchableOpacity} from 'react-native';
import {BoldText, CommonButton, RegularText} from '../components';
import {ACCENT_COLOR, PRIMARY_COLOR} from '../shared/Colors';
import {connect} from 'react-redux';
import {changeValues} from '../store/actions';

class Landing extends Component {

    navigatePage(stringVal) {
        this.props.changeValues('userType', stringVal);
        this.props.navigation.navigate('UserAuth');
    }

    render() {
        return (
            <ImageBackground
                source={require('../assets/images/BG1.png')}
                resizeMode='cover'
                style={{flex: 1}}
            >
                <View style={{flex: 1}}>
                    <Image
                        source={require('../assets/images/logo.png')}
                        style={{height: 120, width: 120, alignSelf: 'center', marginTop: 80}}
                        resizeMode='cover'
                    />

                    <View style={{paddingHorizontal: 20, flex: 1, justifyContent: 'center'}}>
                        <BoldText label='Manage your Pensure Account easily' style={{
                            textAlign: 'center',
                            paddingStart: 20, paddingEnd: 20
                        }} color={PRIMARY_COLOR} size={20}/>

                        <CommonButton label='Get Started' onPress={() => this.navigatePage('new')}/>
                    </View>

                    <View style={{height: 70, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20}}>
                        <RegularText label='Exisiting user?' color='black' size={15}/>

                        <TouchableOpacity style={{marginLeft: 5}} onPress={() => this.navigatePage('existing')}>
                            <RegularText label='Register Device' color={ACCENT_COLOR} size={15}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = (state) => {
    return state.userAuthData;
};

export default connect(mapStateToProps, {changeValues})(Landing);
