import React, { Component } from 'react';
import {View, TouchableOpacity, Image, ImageBackground, StyleSheet} from 'react-native';
import { CONTAINER_STYLE } from '../../shared/Styles';
import {
    CommonHeader,
    RegularText,
    BoldText
} from '../../components';
import {ACCENT_COLOR, DARK_COLOR, LIGHT_COLOR} from '../../shared/Colors';
import { connect } from 'react-redux';
import { selectSector } from "../../store/actions";
import {Divider} from "react-native-paper";
import Icon from 'react-native-vector-icons/'

class Sector extends Component {

    selectSectorButton(id)
    {
        this.props.selectSector(id);
        this.props.navigation.navigate('RequiredSectorDocuments');
    }

    render() {

        return (

            <View style={CONTAINER_STYLE}>
                <CommonHeader title='Sector'
                              backAction backActionPress={() => this.props.navigation.navigate('More')}
                              rightIcon='notifications-none'
                              rightActionPress={() => this.props.navigation.navigate("Message")}/>

                <ImageBackground
                    source={require('../../assets/images/BG2.png')}
                    resizeMode='cover'
                    style={{flex: 1}}>

                    <View>
                        <BoldText label='Select Sector Type' style={{margin: 20, marginBottom: 50}} size={23} color={ACCENT_COLOR}/>

                        <TouchableOpacity style={styles.backgroundLight} onPress={() => this.selectSectorButton(1)} >
                            <View style={{flexDirection: 'row'}}>
                                <Image source={require('../../assets/images/publicsector.png')}/>
                                <Image source={require('../../assets/images/line.png')} style={{marginStart: 10}}/>
                            </View>

                            <BoldText label='Public Sector' size={20} color={DARK_COLOR}/>
                            <Icon name={'navigate-next'} size={30} color={ACCENT_COLOR}/>
                        </TouchableOpacity>

                        <View style={{marginTop: 20}}/>

                        <TouchableOpacity style={styles.backgroundLight} onPress={() => this.selectSectorButton(2)} >
                            <View style={{flexDirection: 'row'}}>
                                <Image source={require('../../assets/images/privatesector.png')}/>
                                <Image source={require('../../assets/images/line.png')} style={{marginStart: 10}}/>
                            </View>

                            <BoldText label='Private Sector' size={20} color={DARK_COLOR}/>
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

const mapStateToProps = (state) => {
    return state.sectorData;
};

export default connect(mapStateToProps, {selectSector})(Sector);