import {Alert, Platform, Linking, InteractionManager} from 'react-native';
import {SERVER_REQUEST, LOGIN_USER_API, BIOMETRICS_API, SATISFACTION_RATING_API,} from "../../shared/Backend";
import { LOGGER, DEVICE_ID } from "../../shared/Methods";
import { ResponseModel } from '../../shared/ResponseModel';
import {
    SAVE_TOKEN,
    SAVE_PENCOMPIN,
    SAVE_FULLNAME,
    GET_TOKEN,
    SAVE_EMAIL,
    GET_EMAIL,
    SAVE_PROFILE_PICTURE,
    STORE_ACTIVE_FUND_TYPES,
    GET_ACTIVE_FUND_TYPES,
    GET_PROFILE_PICTURE,
    GET_PENCOMPIN,
    GET_STORED_BRANCH
} from '../../shared/Storage';
import OneSignal from "react-native-onesignal";

export const updateLoginValues = (key, value) => {
    return {
        type: 'UPDATE_VALUES',
        payload: { key, value }
    };
};

export const authenticateUser = (body, navigation) => {
    return async (dispatch) => {
        const appUrl = Platform.OS === "ios" ? "https://itunes.apple.com/ng/app/pensure/id1263724149?mt=8"
                                        : "https://play.google.com/store/apps/details?id=com.leadway.pensure";

        dispatch({ type: 'AUTHENTICATE_USER', payload: null });

        LOGGER('auth body', body);
        try {
            const response = await SERVER_REQUEST(body, LOGIN_USER_API, 'POST');
            const res = new ResponseModel(response);
            LOGGER('ACTION', res);

            if (res.StatusCode === '00') {
                saveData(res);

                const fundedArray = [];

                const newArray = res.Data.FundTypes.filter((item) => {
                    return item.IsActive === true;
                });

                res.Data.FundTypes.filter((item) => {
                    if(((item.IsFunded === true) && (item.IsActive === true))
                        || ((item.IsFunded === true) && (item.IsActive === false)))
                    {
                        fundedArray.push(item);
                    }
                });

                const statusOrder = [true, false];

                fundedArray.sort(function(a, b) {
                    return statusOrder.indexOf(a.IsActive) - statusOrder.indexOf(b.IsActive);
                });

                LOGGER('ACTION fundedArray', fundedArray);

                dispatch({ type: 'AUTHENTICATE_USER_INFO', payload: res.Data });
                dispatch({ type: 'ACTIVE_FUND_TYPES', payload: newArray });
                dispatch({ type: 'FUNDED_FUND_TYPES', payload: fundedArray });

                STORE_ACTIVE_FUND_TYPES(newArray);
                OneSignal.sendTag("pencomPin", body.PencomPIN);
                navigation.navigate('Drawer');
            } else if (res.StatusCode === '-1') {
                InteractionManager.runAfterInteractions(() => {
                    setTimeout(() => {
                        Alert.alert(
                            'Outdated Application',
                            res.Message,
                            [
                                {
                                    text: 'Update',
                                    onPress: () => Linking.openURL(appUrl)
                                },
                            ],
                            {cancelable: false},
                        );
                    });
                });
            } else {
                InteractionManager.runAfterInteractions(() => {
                    setTimeout(() => {
                        Alert.alert('Login Error', res.Message);
                    });
                });
            }

            dispatch({ type: 'AUTHENTICATE_USER_DONE', payload: null });
        }
        catch (error) {
            dispatch({ type: 'AUTHENTICATE_USER_DONE', payload: error.message });
        }
    };
};

export const fetchUserProfilePicture = () => {
    return async (dispatch) => {

        const body = {
            sessionId: await GET_TOKEN(),
            username: await GET_PENCOMPIN(),
            mobileId: DEVICE_ID()
        };

        LOGGER('picture', body);

        // const savedProfilePicture = await GET_PROFILE_PICTURE();

        // if ((savedProfilePicture === '') || (savedProfilePicture === null)) {
            try {
                const response = await SERVER_REQUEST(body, BIOMETRICS_API, 'POST');
                const res = new ResponseModel(response);

                SAVE_PROFILE_PICTURE(res.Data.PassportUrl);

                dispatch({ type: 'FETCH_PROFILE_PICTURE', payload: res.Data.PassportUrl });
            }
            catch (error) {
                dispatch({ type: 'FETCH_PROFILE_PICTURE', payload: error.message });
            }
        // } else {
        //     dispatch({ type: 'FETCH_PROFILE_PICTURE', payload: savedProfilePicture });
        // }
    };
};

export const submitSessionRate = (body) => {
    return async (dispatch) => {

        dispatch({ type: 'SUBMIT_SESSION_RATE', payload: null });

        body['RSAPIN'] = await GET_PENCOMPIN();

        try {
            // LOGGER('body', body);
            const response = await SERVER_REQUEST(body, SATISFACTION_RATING_API, 'POST');
            const res = new ResponseModel(response);

            if (res.StatusCode === '00') {

                dispatch({ type: 'SUBMIT_SESSION_RATE_DONE', payload: null });

            } else {
                InteractionManager.runAfterInteractions(() => {
                    setTimeout(() => {
                        Alert.alert('Login Error', res.Message);
                    });
                });

                dispatch({ type: 'SUBMIT_SESSION_RATE_FAILED', payload: null });
            }
        }
        catch (error) {
            dispatch({ type: 'SUBMIT_SESSION_RATE_FAILED', payload: error.message });
        }
    };
};

export const closeRatingDialog = () => {
    return {
        type: 'CLOSE_RATING_DIALOG',
        payload: null
    };
};

export const openRatingDialog = () => {
    return {
        type: 'OPEN_RATING_DIALOG',
        payload: null
    };
};

export const activateActiveComponent = (selectedComponent) => {
    return {
        type: 'ACTIVE_COMPONENT',
        payload: selectedComponent
    };
};

export const setIsGetHelp = (data) => {
    return {
        type: 'SET_IS_GET_HELP',
        payload: data
    };
};

export const logoutButtonPressed = (data) => {
    return {
        type: 'IS_LOGOUT_CLICKED',
        payload: data
    };
};

export const logoutUser = (navigation) => {
    return async (dispatch) => {

        SAVE_TOKEN('');
        navigation.navigate('Login');

        dispatch({ type: 'LOGOUT_USER', payload: null });
    };
};

export const sessionTimeout = (navigation) => {
    return async (dispatch) => {

        SAVE_TOKEN('');
        Alert.alert('Session Timeout', 'You have been logged out');
        navigation.navigate('Login');
        // dispatch(NavigationActions.navigate({routeName: 'Login'}));

        dispatch({ type: 'LOGOUT_USER', payload: null });
    };
};

const saveData = (res) => {
    SAVE_TOKEN(res.Data.sessionid);
    SAVE_PENCOMPIN(res.Data.pencomPin);
    SAVE_FULLNAME(res.Data.Fullname);
    SAVE_EMAIL(res.Data.email);
};
