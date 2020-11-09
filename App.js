/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Platform, SafeAreaView, StatusBar, View} from 'react-native';
import {DARK_PRIMARY_COLOR, PRIMARY_COLOR} from './src/shared/Colors';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import reducers from './src/store/reducers';
import Thunk from 'redux-thunk';
import Page from './src/screens/Routes';
import OneSignal from 'react-native-onesignal';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: PRIMARY_COLOR
    }
};

const store = createStore(reducers, {}, applyMiddleware(Thunk));

export default class App extends React.Component {

    constructor(properties) {
        super(properties);
        OneSignal.init("34bc6ec0-c6cf-46bd-a609-258f419d3312");
    }

    render() {
        return (
            <Provider store={store}>
                <PaperProvider theme={theme}>
                    <SafeAreaView style={{flex: 1}}>
                        <StatusBar barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
                                   backgroundColor={PRIMARY_COLOR}/>

                        <View style={{flex: 1}}>
                            <Page/>
                        </View>
                    </SafeAreaView>
                </PaperProvider>
            </Provider>
        );
    }
}

console.disableYellowBox = true;
