import { FETCH_PREFERENCE_API, SERVER_REQUEST, UPDATE_PREFERENCE_API} from "../../shared/Backend";
import {DEVICE_ID, LOGGER} from "../../shared/Methods";
import { ResponseModel } from "../../shared/ResponseModel";
import {
    GET_PENCOMPIN,
    GET_TOKEN
} from "../../shared/Storage";
import {Alert, InteractionManager} from "react-native";

export const fetchSubscriptionList = (body) => {
    return async (dispatch) => {

        dispatch({ type: 'FETCH_SUBSCRIPTION_LIST', payload: true });

        body['sessionID'] = await GET_TOKEN();

        LOGGER('token', body);

        try {
            const res = await SERVER_REQUEST(body, FETCH_PREFERENCE_API, 'POST');
            const response = new ResponseModel(res);

            if (response.StatusCode === '00') {
                LOGGER('SUBSCRIPTION LIST ACTION', response);
                const subscriptionData = [];

                const data1 = {
                    'id': 1,
                    'title': 'Send me email on my birthday',
                    'data': response.Data.email_birthdayField,
                };

                const data2 = {
                    'id': 2,
                    'title': 'Send me newsletter email',
                    'data': response.Data.email_newsletterField,
                };

                const data3 = {
                    'id': 3,
                    'title': 'Send me statement of account (printed)',
                    'data': response.Data.print_statementsField,
                };

                const data4 = {
                    'id': 4,
                    'title': 'Send me statement of account (email)',
                    'data': response.Data.email_statementsField,
                };

                const data5 = {
                    'id': 5,
                    'title': 'Send me sms on my birthday',
                    'data': response.Data.sms_birthdayField,
                };

                const data6 = {
                    'id': 6,
                    'title': 'Send me sms contribution notification',
                    'data': response.Data.sms_contribution_notificationField,
                };

                subscriptionData.push(data1);
                subscriptionData.push(data2);
                subscriptionData.push(data3);
                subscriptionData.push(data4);
                subscriptionData.push(data5);
                subscriptionData.push(data6);

                dispatch({ type: 'FETCH_SUBSCRIPTION_LIST_DONE', payload: subscriptionData });
            } else {
                dispatch({ type: 'FETCH_SUBSCRIPTION_LIST_FAILED', payload: response.Message });
            }
        }
        catch (error) {
            dispatch({ type: 'FETCH_SUBSCRIPTION_LIST_FAILED', payload: error.message });
        }
    };
};

export const updateSubscriptionList = (request, navigation) => {
    return async (dispatch) => {

        dispatch({ type: 'UPDATE_SUBSCRIPTION_LIST', payload: null });

        const body = {};

        for (const item of request.subscriptionList) {
            if (item.id === 1)
                body['bDayEmail'] = item.data;
            else if(item.id === 2)
                body['newsLetter'] = item.data;
            else if(item.id === 3)
                body['stateAccountPrinted'] = item.data;
            else if(item.id === 4)
                body['stateAccountEmail'] = item.data;
            else if(item.id === 5)
                body['bDaySMS'] = item.data;
            else if(item.id === 6)
                body['contibNotification'] = item.data;
        }

        body['pencomPin'] = await GET_PENCOMPIN();
        body['mobileId'] = DEVICE_ID();

        try {
            const res = await SERVER_REQUEST(body, UPDATE_PREFERENCE_API, 'POST');
            const response = new ResponseModel(res);

            if (response.StatusCode === '00') {
                InteractionManager.runAfterInteractions(() => {
                    setTimeout(() => {
                        Alert.alert('Update Success', response.Message);
                    });
                });

                navigation.navigate('ProfileSetting');
            } else {
                InteractionManager.runAfterInteractions(() => {
                    setTimeout(() => {
                        Alert.alert('Update Error', response.Message);
                    });
                });
            }

            dispatch({ type: 'UPDATE_SUBSCRIPTION_LIST_DONE', payload: null });
        }
        catch (error) {
            dispatch({ type: 'UPDATE_SUBSCRIPTION_LIST_DONE', payload: error.message });
        }
    };
};

export const updateSubscription = (list) => {
    return {
        type: 'UPDATE_SUBSCRIPTION',
        payload: list
    };
};
