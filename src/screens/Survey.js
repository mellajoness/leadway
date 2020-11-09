import React, {Component} from 'react';
import {ImageBackground, View} from 'react-native';
import {CONTAINER_STYLE} from '../shared/Styles';
import {CommonHeader} from '../components';

class Survey extends Component {

    render() {

        return (
            <View style={CONTAINER_STYLE}>

                <CommonHeader
                    title='Survey'
                    backAction backActionPress={() => this.props.navigation.goBack()}
                />
                <ImageBackground
                    source={require('../assets/images/BG2.png')}
                    resizeMode='cover'
                    style={{flex: 1}}
                >

                </ImageBackground>
            </View>
        );
    }
}

export default Survey;
