import React, {Component} from 'react';
import {View, TouchableOpacity, Image, ImageBackground, StyleSheet, Linking, WebView} from 'react-native';
import {CONTAINER_STYLE} from '../../shared/Styles';
import {CommonHeader, BoldText} from '../../components';
import {ACCENT_COLOR, DARK_COLOR, LIGHT_COLOR} from '../../shared/Colors';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

class Calculator extends Component {

    componentDidMount() {
        this.openWebLink();
    }

    async openWebLink() {
        await Linking.openURL('https://surecal.leadway-pensure.com/');
        this.props.navigation.navigate('Dashboard');
    }

    render() {

        return (

            <View style={CONTAINER_STYLE}>
                <CommonHeader title='Calculator'
                              menuButtonPress={() => this.props.navigation.openDrawer()}
                              rightIcon='notifications-none'
                              rightActionPress={() => this.props.navigation.navigate("Message")}/>

                             <WebView

                             />

                {/*<ImageBackground*/}
                {/*    source={require('../../assets/images/BG2.png')}*/}
                {/*    resizeMode='cover'*/}
                {/*    style={{flex: 1}}>*/}

                {/*    <View>*/}
                {/*        <BoldText label='Calculator' style={{margin: 20, marginBottom: 50}} size={23}*/}
                {/*                  color={ACCENT_COLOR}/>*/}

                        {/*<TouchableOpacity style={styles.backgroundLight}*/}
                        {/*                  onPress={() => this.props.navigation.navigate('PensionCalculator')}>*/}
                        {/*    <View style={{flexDirection: 'row'}}>*/}
                        {/*        <Image source={require('../../assets/images/calculator.png')}/>*/}
                        {/*        <Image source={require('../../assets/images/line.png')} style={{marginStart: 10}}/>*/}
                        {/*    </View>*/}

                        {/*    <BoldText label='Pension' size={20} color={DARK_COLOR}/>*/}
                        {/*    <Icon name={'navigate-next'} size={30} color={ACCENT_COLOR}/>*/}
                        {/*</TouchableOpacity>*/}

                        {/*<View style={{marginTop: 20}}/>*/}

                    {/*    <TouchableOpacity style={styles.backgroundLight}*/}
                    {/*                      onPress={async () => await Linking.openURL('https://surecal.leadway-pensure.com/')}>*/}
                    {/*        <View style={{flexDirection: 'row'}}>*/}
                    {/*            <Image source={require('../../assets/images/surecalicon.png')}/>*/}
                    {/*            <Image source={require('../../assets/images/line.png')} style={{marginStart: 10}}/>*/}
                    {/*        </View>*/}

                    {/*        <BoldText label='Lifestyle' size={20} color={DARK_COLOR}/>*/}
                    {/*        <Icon name={'navigate-next'} size={30} color={ACCENT_COLOR}/>*/}
                    {/*    </TouchableOpacity>*/}

                    {/*</View>*/}

                {/*</ImageBackground>*/}

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

export default Calculator;
