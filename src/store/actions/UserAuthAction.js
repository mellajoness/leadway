import {
    SERVER_REQUEST,
    VALIDATE_USER_API,
    VALIDATE_OTP_API,
    REGISTER_USER_API,
    CHANGE_PASSWORD_API, FORGOT_MOBILE_PIN_API
} from "../../shared/Backend";
import { ResponseModel } from '../../shared/ResponseModel';
import { Alert, InteractionManager } from 'react-native';
import { DEVICE_ID, LOGGER } from "../../shared/Methods";
import {GET_PENCOMPIN, SAVE_PENCOMPIN, SAVE_TOKEN} from "../../shared/Storage";
import {submitBenefitApplication, submitSwitchFundRequest} from './index';
import { StackActions, NavigationActions } from 'react-navigation';
import {logoutButtonPressed} from "./LoginAction";

const resetAction = StackActions.reset({
    index: 0,
    actions: [ NavigationActions.navigate({ routeName: 'Login' })]
});

export const changeValues = (key, value) => {
    return {
        type: 'CHANGE_VALUES',
        payload: { key, value }
    };
};

export const validateUser = (body, navigation) => {
    return async (dispatch) => {
        dispatch({ type: 'VALIDATE_USER', payload: true });

        const pencom = await GET_PENCOMPIN(); LOGGER('pencom', pencom)

        if((body['PencomPin'] === '') || !(body['PencomPin']))
        {
            body['PencomPin'] = pencom;
        }

        if(body['userType'] === 'resetPin')
        {
            body['PencomPin'] = body['resetPinPencom'];
        }

        delete body.resetPinPencom;

        try {
            // dispatch({ type: 'VALIDATE_USER', payload: false });
            const response = await SERVER_REQUEST(body, VALIDATE_USER_API, 'POST');
            const res = new ResponseModel(response);

            dispatch({ type: 'VALIDATE_USER', payload: false });

            if (res.StatusCode === '00') {

                // dispatch(changeValues('userPin', body['userPin']));
                LOGGER('validate user body', body)
                dispatch(changeValues('pencomPin', res.Data));

                navigation.navigate('Otp');
            } else {
                LOGGER('response', res)
                InteractionManager.runAfterInteractions(() => {
                    setTimeout(() => {
                        Alert.alert('Error', res.Message);
                    });
                });
            }

            dispatch({ type: 'VALIDATE_USER', payload: false });
        }
        catch (error) {
            dispatch({ type: 'VALIDATE_USER', payload: false });
        }
    };
};

export const validateOtp = (body, navigation) => {
    return async (dispatch) => {
        dispatch({ type: 'OTP_LOADING', payload: true });

        LOGGER('otp', body);

        const mainBody = {
            OTPType: body['OTPType'],
            PencomPin: body['PencomPin'],
            resetPinPencom: body['resetPinPencom'],
            userType: body['userType'],
            OTP: body['OTP'],
            userPin: body['userPin']
        };

        const vOtpBody = {
            OTPType: body['OTPType'],
            PencomPin: body['PencomPin'],
            OTP: body['OTP'],
        };

        const pencom = await GET_PENCOMPIN();

        mainBody['PencomPin'] = body['PencomPin'] === '' ? pencom : mainBody['PencomPin'];

        if(body.userType === 'resetPin')
        {
            mainBody['PencomPin'] = mainBody['resetPinPencom'];
        }

        delete mainBody.resetPinPencom;

        LOGGER('validate otp', mainBody);

        try {
            const response = await SERVER_REQUEST(vOtpBody, VALIDATE_OTP_API, 'POST');
            const res = new ResponseModel(response);

            if (res.StatusCode === '00') {

                if (mainBody.OTPType === 1) {
                    await registerUserDevice(mainBody, navigation, dispatch);
                }
                else if (mainBody.OTPType === 2) {
                    if(mainBody.userType === 'resetPin')
                    {
                        delete mainBody.OTPType;
                        delete mainBody.userType;
                        delete mainBody.PencomPin;

                        dispatch({ type: 'OTP_LOADING_STOP', payload: mainBody['OTP'] });

                        navigation.navigate('CreatePin');
                    }
                    else if(mainBody.userType === 'changePin')
                    {
                        const changePinBody = {
                            oldMobilePin: body['oldMobilePin'],
                            newMobilePin: body['newMobilePin']
                        };

                        dispatch(changeUserPin(changePinBody, navigation, mainBody.userType))
                    }
                }
                else if (mainBody.OTPType === 3) {
                    dispatch(submitBenefitApplication(body, navigation));
                }
                else if(mainBody.OTPType === 5)
                {
                    const switchFundBody = {
                        OTP: body['OTP'],
                        NewSourceFundID: body['switchRequest']['NewSourceFundID'],
                        Signature: body['switchRequest']['Signature'],
                    };

                    dispatch(submitSwitchFundRequest(switchFundBody, navigation));
                }
                else
                {
                    navigation.navigate('CreatePin');
                }
            } else {
                InteractionManager.runAfterInteractions(() => {
                    setTimeout(() => {
                        Alert.alert('Error', res.Message);
                    });
                });
            }

            dispatch({type: 'OTP_LOADING', payload: false});
        }
        catch (error) {
            dispatch({ type: 'OTP_LOADING', payload: false });
        }
    };
};

const registerUserDevice = async (body, navigation, dispatch) => {
    const _data = {
        deviceId: DEVICE_ID(),
        pencomPin: body.PencomPin,
        mobilePin: body.userPin
    };
    LOGGER('REGISTER USER', _data);

    try {
        const response = await SERVER_REQUEST(_data, REGISTER_USER_API, 'POST');
        const res = new ResponseModel(response);
        LOGGER('REGISTER USER', res);

        dispatch({ type: 'OTP_LOADING', payload: false });

        if (res.StatusCode === '00') {
            SAVE_PENCOMPIN(body.PencomPin);
            navigation.navigate('Login');
        } else {
            if (res.Message === 'RSA PIN already registered!') {
                SAVE_PENCOMPIN(body.PencomPin);
                navigation.navigate('Login');
            } else {
                InteractionManager.runAfterInteractions(() => {
                    setTimeout(() => {
                        Alert.alert('Error', res.Message);
                    });
                });
            }
        }
    }
    catch (error) {
        dispatch({ type: 'OTP_LOADING', payload: false });
    }
};

export const changeUserPin = (body, navigation, userType) => {
    return async (dispatch) => {

        if(userType === 'new')
        {
            await registerUserDevice(body, navigation, dispatch);
        }
        else
        {
            dispatch({ type: 'OTP_LOADING', payload: true });

            body['deviceId'] = DEVICE_ID();
            body['pencomPin'] = await GET_PENCOMPIN();

            LOGGER('change pin body', body);

            try {
                const response = await SERVER_REQUEST(body, CHANGE_PASSWORD_API, 'POST');
                const res = new ResponseModel(response);

                if (res.StatusCode === '00') {
                    InteractionManager.runAfterInteractions(() => {
                        setTimeout(() => {
                            Alert.alert('Update Success', response.Message);
                        });
                    });
                    SAVE_TOKEN('');

                    dispatch(logoutButtonPressed(true));

                } else {
                    dispatch({ type: 'OTP_LOADING', payload: false });
                    InteractionManager.runAfterInteractions(() => {
                        setTimeout(() => {
                            Alert.alert('Error', res.Message);
                        });
                    });
                }
            }
            catch (error) {
                dispatch({ type: 'OTP_LOADING', payload: false });
            }
        }
    };
};

export const resetUserPin = (body, navigation) => {
    return async (dispatch) => {

        dispatch({ type: 'OTP_LOADING', payload: true });

        const pencom = await GET_PENCOMPIN();

        body['PencomPin'] = pencom;

        LOGGER('reset pin body', body);

        try {
            const response = await SERVER_REQUEST(body, FORGOT_MOBILE_PIN_API, 'POST');
            const res = new ResponseModel(response);

            LOGGER('res', res);
            if (res.StatusCode === '00') {
                InteractionManager.runAfterInteractions(() => {
                    setTimeout(() => {
                        Alert.alert('Update Success', response.Message);
                    });
                });
                navigation.navigate('Login');
            } else {
                dispatch({ type: 'OTP_LOADING', payload: false });
                InteractionManager.runAfterInteractions(() => {
                    setTimeout(() => {
                        Alert.alert('Error', res.Message);
                    });
                });
            }
        }
        catch (error) {
            dispatch({ type: 'OTP_LOADING', payload: false });
        }
    };
};

export const submitMobilePinChange = (body, navigation) => {
    LOGGER('NAVIGATION', navigation);
    return async (dispatch) => {
        dispatch({ type: 'SUBMIT_MOBILE_PIN_CHANGE', payload: null });

        body['PencomPin'] = await GET_PENCOMPIN();

        try {
            LOGGER('mobile pin data', body);
            const response = await SERVER_REQUEST(body, VALIDATE_USER_API, 'POST');
            if (response.StatusCode === '00') {
                navigation.navigate('Otp');
            } else {
                InteractionManager.runAfterInteractions(() => {
                    setTimeout(() => {
                        Alert.alert('Error', response.Message);
                    });
                });
            }

            dispatch({ type: 'SUBMIT_MOBILE_PIN_CHANGE_DONE', payload: null });
        }
        catch (error) {
            dispatch({ type: 'SUBMIT_MOBILE_PIN_CHANGE_DONE', payload: error.message });
        }
    };
};
