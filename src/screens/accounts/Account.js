import React, {Component} from 'react';
import {View, TouchableOpacity, Image, ImageBackground, StyleSheet} from 'react-native';
import {CONTAINER_STYLE} from '../../shared/Styles';
import {CommonHeader, BoldText} from '../../components';
import {ACCENT_COLOR, DARK_COLOR, LIGHT_COLOR} from '../../shared/Colors';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

class Account extends Component {

    render() {

        return (

            <View style={CONTAINER_STYLE}>
                <CommonHeader title='Account'
                              backAction backActionPress={() => this.props.navigation.goBack()}
                              rightIcon='notifications-none'
                              rightActionPress={() => this.props.navigation.navigate("Message")}/>

                <ImageBackground
                    source={require('../../assets/images/BG2.png')}
                    resizeMode='cover'
                    style={{flex: 1}}>

                    <View>
                        <BoldText label='Account' style={{margin: 20, marginBottom: 50}} size={23}
                                  color={ACCENT_COLOR}/>

                        <TouchableOpacity style={styles.backgroundLight}
                                          onPress={() => this.props.navigation.navigate('Summary')}>
                            <View style={{flexDirection: 'row'}}>
                                <Image source={require('../../assets/images/pricechart.png')}/>
                                <Image source={require('../../assets/images/line.png')} style={{marginStart: 10}}/>
                            </View>

                            <BoldText label='Summary' size={20} color={DARK_COLOR}/>
                            <Icon name={'navigate-next'} size={30} color={ACCENT_COLOR}/>
                        </TouchableOpacity>

                        <View style={{marginTop: 20}}/>

                        <TouchableOpacity style={styles.backgroundLight}
                                          onPress={() => this.props.navigation.navigate('Transaction')}>
                            <View style={{flexDirection: 'row'}}>
                                <Image source={require('../../assets/images/privatesector.png')}/>
                                <Image source={require('../../assets/images/line.png')} style={{marginStart: 10}}/>
                            </View>

                            <BoldText label='Statement' size={20} color={DARK_COLOR}/>
                            <Icon name={'navigate-next'} size={30} color={ACCENT_COLOR}/>
                        </TouchableOpacity>

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
        justifyContent: 'space-between',
        backgroundColor: LIGHT_COLOR
    }
});

export default Account;
