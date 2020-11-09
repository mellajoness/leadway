import React, {Component} from 'react';
import {StyleSheet, View, Platform, Image} from 'react-native';
import {CONTAINER_STYLE} from "../shared/Styles";
import {BoldText, CommonHeader, RegularText} from "../components";
import VersionNumber from 'react-native-version-number';

class About extends Component {

    render() {
        let platforOS;
        if (Platform.OS === "android")
            platforOS = "Android";
        else if (Platform.OS === "ios")
            platforOS = "iOS";
        return (
            <View style={CONTAINER_STYLE}>

                <CommonHeader title='About'
                              backAction backActionPress={() => this.props.navigation.goBack()}
                />

                <View style={styles.column}>
                    <View style={{alignItems: 'center'}}>
                        <BoldText label='Pensure App' size={22} style={{marginBottom: 5}}/>
                        <RegularText label={VersionNumber.appVersion} size={16}/>
                    </View>

                    <Image
                        source={require('../assets/images/logo.png')}
                        style={styles.imageStyle}
                        resizeMode='cover'
                    />

                    <View style={{alignItems: 'center'}}>
                        <BoldText label='Platform' size={20} style={{marginBottom: 5}}/>
                        <RegularText label={platforOS} size={16} style={{marginBottom: 15}}/>

                        <BoldText label='Platform Version' size={20}/>
                        <RegularText label={Platform.Version} size={16}/>
                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    imageStyle: {
        height: 150,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    column: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly'

    }
});

export default About;
