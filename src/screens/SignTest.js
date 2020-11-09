import React, { Component, PropTypes } from 'react';
import { AlertIOS, WebView, Alert } from 'react-native';
import Permissions from 'react-native-permissions'

class SignTest extends Component {

    componentDidMount() {
        this.webView.postMessage("Ademola");
    }

    state = {
        photoPermission: '',
    };

    _alertForPhotosPermission() {
        Alert.alert(
            'Can we access your photos?',
            'We need access so you can set your profile pic',
            [
                {
                    text: 'No way',
                    onPress: () => console.log('Permission denied'),
                    style: 'cancel',
                },
                this.state.photoPermission == 'undetermined'
                    ? { text: 'OK', onPress: this._requestPermission }
                    : { text: 'Open Settings', onPress: Permissions.openSettings },
            ],
        )
    }

    _requestPermission = () => {
        Permissions.request('photo').then(response => {
            // Returns once the user has chosen to 'allow' or to 'not allow' access
            // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
            this.setState({ photoPermission: response })
        })
    }


    render() {
        const htmlString = `
            <html>
                <body></body>
                <script>
                document.addEventListener("message", function(data) {
                    alert(data)
                })
</script>
            </html>
        `;
        return (
            <WebView
                style={{flex: 1}}
                source={{html: htmlString}}
                originWhitelist={['*']}
                ref={ref => this.webView = ref}
            />
        )

        return (

            this._alertForPhotosPermission()
        );

    }
}

export default SignTest;