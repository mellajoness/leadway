import React, {Component} from 'react';
import {ImageBackground} from 'react-native';
import {GET_PENCOMPIN} from '../shared/Storage';

class Splash extends Component {

    async componentDidMount() {

        setTimeout(async () => {
            const pencom = await GET_PENCOMPIN();
            const routeName = pencom ? 'Login' : 'LandingRoute';
            // const routeName = 'SignTest';

            this.props.navigation.navigate(routeName);
        }, 1000);
    }

    render() {
        return (
            <ImageBackground
                source={require('../assets/images/splash.png')}
                style={{flex: 1}}
                resizeMode='cover'
            />
        );
    }
}

export default Splash;
