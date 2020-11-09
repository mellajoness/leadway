import { Alert, InteractionManager } from 'react-native';
import {GET_PENCOMPIN} from "../../shared/Storage";
import {CHANGE_EMPLOYER_DETAILS_API, SERVER_REQUEST} from "../../shared/Backend";
import {DEVICE_ID, LOGGER} from "../../shared/Methods";

export const updateEmployerDetailValues = (key, value) => {
    return {
        type: 'UPDATE_VALUES',
        payload: { key, value }
    };
};

export const submitEmployerDetailsApplication = (body) => {
    return async (dispatch) => {
        dispatch({ type: 'SUBMIT_EMPLOYER_DETAILS', payload: null });

        body['PencomPin'] = await GET_PENCOMPIN();
        body['mobileId'] = DEVICE_ID();

        try {
            LOGGER('submit employer', body);
            const response = await SERVER_REQUEST(body, CHANGE_EMPLOYER_DETAILS_API, 'POST');
            if (response.StatusCode === '00') {
                InteractionManager.runAfterInteractions(() => {
                    setTimeout(() => {
                        Alert.alert('Update Success', response.Message);
                    });
                });
            } else {
                InteractionManager.runAfterInteractions(() => {
                    setTimeout(() => {
                        Alert.alert('Update Error', response.Message);
                    });
                });
            }

            dispatch({ type: 'SUBMIT_EMPLOYER_DETAILS_DONE', payload: null });
        }
        catch (error) {
            dispatch({ type: 'SUBMIT_EMPLOYER_DETAILS_DONE', payload: error.message });
        }
    };
};