import React, {Component} from 'react';
import UserInactivity from 'react-native-user-inactivity';
import {LOGGER} from "../shared/Methods";
import {connect} from 'react-redux';
import {logoutButtonPressed, logoutUser, sessionTimeout} from "../store/actions";
import DrawerRoute from "./DrawerRoute";

class ComponentInactivity extends Component {
    state = {
        active: true,
    };

    onAction = (active) => {
        this.setState({
            active,
        });
    };

    render() {
        const {active} = this.state;
        LOGGER('component active? ', active);
        if (this.state.active === false) {
            // this.setState({active: true});
            this.props.sessionTimeout(this.props.navigation);
        }

        if (this.props.isLogout === true) {
            LOGGER('logout data', this.props.isLogout)

            this.props.logoutButtonPressed(false);
            this.props.logoutUser(this.props.navigation);
        }

        return (
            <UserInactivity
                timeForInactivity={300000}
                checkInterval={1000}
                onAction={this.onAction}
                style={{flex: 1}}>
                {/*{this.props.children}*/}
                <DrawerRoute/>

            </UserInactivity>
        );
    }
}

const mapStateToProps = (state) => {
    return {...state.loginData};
};

export default connect(mapStateToProps, {
    sessionTimeout,
    logoutUser,
    logoutButtonPressed
})(ComponentInactivity);
