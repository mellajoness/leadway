import {createStackNavigator, createSwitchNavigator, createAppContainer} from 'react-navigation';

import LandingScreen from './Landing';
import UserAuthScreen from './UserAuth';
import AboutScreen from './About';
import OtpScreen from './common/OtpScreen';
import CreatePinScreen from './common/CreatePin';

import LoginScreen from './Login';
import SplashScreen from './Splash';
import GetHelpScreen from './GetHelp';
import ComponentInactivity from "./ComponentInactivity";
import FaqScreen from "./FAQ";
import BranchesScreen from "./Branches";
import PencomPinScreen from "./PencomPin";
import SignTestScreen from './SignTest';

const LandingRoute = createStackNavigator({
    Landing: LandingScreen,
    UserAuth: UserAuthScreen,
    Otp: OtpScreen,
    CreatePin: CreatePinScreen
}, {
    initialRouteName: 'Landing',
    headerMode: 'none'
});

const GetHelpRoute = createStackNavigator({
    GetHelp: GetHelpScreen,
    About: AboutScreen,
    Branches: BranchesScreen,
    FAQs: FaqScreen,
    Pencom: PencomPinScreen,
    SignTest: SignTestScreen,
}, {
    initialRouteName: 'GetHelp',
    headerMode: 'none'
});

const LoginRoute = createStackNavigator({
    Login: LoginScreen,
    GetHelp: GetHelpRoute,
    Otp: OtpScreen,
    CreatePin: CreatePinScreen
}, {
    initialRouteName: 'Login',
    headerMode: 'none'
});

const MainRoute = createSwitchNavigator({
    LandingRoute: LandingRoute,
    Splash: SplashScreen,
    Drawer: ComponentInactivity,
    Login: LoginRoute
}, {
    initialRouteName: 'Splash'
});

export default createAppContainer(MainRoute);
