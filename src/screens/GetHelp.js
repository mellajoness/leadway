import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { CONTAINER_STYLE } from '../shared/Styles';
import { CommonHeader, BoldText, CustomLoader } from '../components';
import { Divider } from 'react-native-paper';
import { ACCENT_COLOR, DARK_COLOR, LIGHT_COLOR } from '../shared/Colors';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {
    changeValues,
    setIsGetHelp,
    validateUser
} from "../store/actions";
import { connect } from "react-redux";

class GetHelp extends Component {

    onItemPressed(page) {
        this.props.setIsGetHelp(true);

        this.props.navigation.navigate(page);
    }

    render() {
        return (
            <View style={CONTAINER_STYLE}>

                <CommonHeader title='Help'
                    backAction backActionPress={() => this.props.navigation.navigate('Login')}
                />

                <ImageBackground
                    source={require('../assets/images/BG3.png')}
                    resizeMode='cover'
                    style={{ flex: 1 }}>

                    <View>
                        <BoldText label='Need Help?' style={{ margin: 20 }} size={23} color={ACCENT_COLOR} />

                        <TouchableOpacity style={styles.backgroundLight} onPress={() => this.onItemPressed("Pencom")}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../assets/images/change_mobile_pin.png')} />
                                <BoldText label='Reset mobile pin' size={16} color={DARK_COLOR}
                                    style={{ marginLeft: 40 }} />
                            </View>

                            <Icon name={'navigate-next'} size={30} color={ACCENT_COLOR} />

                        </TouchableOpacity>

                        <Divider />

                        <TouchableOpacity style={styles.background} onPress={() => this.onItemPressed("FAQs")}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../assets/images/FAQ.png')} />
                                <BoldText label='FAQs' size={16} color={DARK_COLOR} style={{ marginLeft: 30 }} />
                            </View>

                            <Icon name={'navigate-next'} size={30} color={ACCENT_COLOR} />

                        </TouchableOpacity>

                        <Divider />

                        <TouchableOpacity style={styles.backgroundLight} onPress={() => this.onItemPressed("Branches")}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../assets/images/Branches.png')} />
                                <BoldText label='Contact Us' size={16} color={DARK_COLOR} style={{ marginLeft: 40 }} />
                            </View>

                            <Icon name={'navigate-next'} size={30} color={ACCENT_COLOR} />

                        </TouchableOpacity>

                        <Divider />

                        <TouchableOpacity style={styles.background} onPress={() => this.onItemPressed("About")}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../assets/images/about.png')} />
                                <BoldText label='About' size={16} color={DARK_COLOR} style={{ marginLeft: 40 }} />
                            </View>

                            <Icon name={'navigate-next'} size={30} color={ACCENT_COLOR} />

                        </TouchableOpacity>

                        <Divider />

                    </View>

                </ImageBackground>

                <CustomLoader visible={this.props.loading} />

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
    return {
        ...state.loginData,
        loading: state.userAuthData.loading
    }
};

export default connect(mapStateToProps, {
    setIsGetHelp,
    changeValues,
    validateUser
})(GetHelp);
