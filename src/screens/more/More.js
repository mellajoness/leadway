import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet, ImageBackground, Image} from 'react-native';
import {CONTAINER_STYLE} from '../../shared/Styles';
import {CommonHeader, BoldText} from '../../components';
import {Divider} from 'react-native-paper';
import {ACCENT_COLOR, DARK_COLOR, LIGHT_COLOR} from '../../shared/Colors';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {setIsGetHelp} from "../../store/actions";
import {connect} from "react-redux";

class More extends Component {

    _navigate(pageName) {
        if ((pageName === "Branches") || (pageName === "FAQs") || (pageName === "ProfileSetting"))
            this.props.setIsGetHelp(false);
        this.props.navigation.navigate(pageName);
    }

    render() {
        return (
            <View style={CONTAINER_STYLE}>

                <CommonHeader title='More'
                              menuButtonPress={() => this.props.navigation.openDrawer()}
                              rightIcon='notifications-none'
                              rightActionPress={() => this.props.navigation.navigate("Message")}
                />

                <ImageBackground
                    source={require('../../assets/images/BG2.png')}
                    resizeMode='cover'
                    style={{flex: 1}}>

                    <View>
                        <BoldText label='More' style={{margin: 20}} size={23} color={ACCENT_COLOR}/>

                        <TouchableOpacity style={styles.backgroundLight} onPress={() => this._navigate("Branches")}>
                            <View style={{flexDirection: 'row'}}>
                                <Image source={require('../../assets/images/Branches.png')}/>
                                <BoldText label='Branches' size={16} color={DARK_COLOR} style={{marginLeft: 40}}/>
                            </View>

                            <Icon name={'navigate-next'} size={30} color={ACCENT_COLOR}/>
                        </TouchableOpacity>

                        <Divider/>

                        <TouchableOpacity style={styles.background} onPress={() => this._navigate("PChart")}>
                            <View style={{flexDirection: 'row'}}>
                                <Image source={require('../../assets/images/pricechart.png')}/>
                                <BoldText label='Price Chart' size={16} color={DARK_COLOR} style={{marginLeft: 30}}/>
                            </View>

                            <Icon name={'navigate-next'} size={30} color={ACCENT_COLOR}/>
                        </TouchableOpacity>

                        <Divider/>

                        {/*<TouchableOpacity style={styles.backgroundLight} onPress={() => this._navigate("Sector")}>*/}
                        {/*<View style={{flexDirection: 'row'}}>*/}
                        {/*<Image source={require('../../assets/images/Uploads.png')}/>*/}
                        {/*<BoldText label='Sector' size={16} color={DARK_COLOR} style={{marginLeft: 30}} />*/}
                        {/*</View>*/}

                        {/*<Icon name={'navigate-next'} size={30} color={ACCENT_COLOR}/>*/}
                        {/*</TouchableOpacity>*/}

                        {/*<Divider/>*/}

                        <TouchableOpacity style={styles.backgroundLight} onPress={() => this._navigate("FAQs")}>
                            <View style={{flexDirection: 'row'}}>
                                <Image source={require('../../assets/images/FAQ.png')}/>
                                <BoldText label='FAQs' size={16} color={DARK_COLOR} style={{marginLeft: 30}}/>
                            </View>

                            <Icon name={'navigate-next'} size={30} color={ACCENT_COLOR}/>
                        </TouchableOpacity>

                        <Divider/>

                        {/*<TouchableOpacity style={styles.background} onPress={() => this._navigate("Survey")}>*/}
                            {/*<View style={{flexDirection: 'row'}}>*/}
                                {/*<Image source={require('../../assets/images/pricechart.png')}/>*/}
                                {/*<BoldText label='Survey' size={16} color={DARK_COLOR} style={{marginLeft: 30}}/>*/}
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
    return state.loginData;
};

export default connect(mapStateToProps, {
    setIsGetHelp
})(More);
