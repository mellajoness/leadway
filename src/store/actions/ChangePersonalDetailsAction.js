import { Alert, InteractionManager } from 'react-native';
import {CHANGE_PERSONAL_DETAILS_API, SERVER_REQUEST} from "../../shared/Backend";
import {DEVICE_ID, LOGGER} from "../../shared/Methods";
import {GET_PENCOMPIN} from "../../shared/Storage";

export const updatePersonalDetailValues = (key, value) => {
    return {
        type: 'UPDATE_VALUES',
        payload: { key, value }
    };
};

export const submitPersonalDetailsApplication = (body) => {
    return async (dispatch) => {
        dispatch({ type: 'SUBMIT_PERSONAL_DETAILS', payload: null });

        body['PencomPin'] = await GET_PENCOMPIN();
        body['mobileId'] = DEVICE_ID();

        try {
            LOGGER('submit personal', body);
            const response = await SERVER_REQUEST(body, CHANGE_PERSONAL_DETAILS_API, 'POST');
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

            dispatch({ type: 'SUBMIT_PERSONAL_DETAILS_DONE', payload: null });
        }
        catch (error) {
            dispatch({ type: 'SUBMIT_PERSONAL_DETAILS_DONE', payload: error.message });
        }
    };
};

// Gender
export const showGenderModal = () => {
    return {
        type: 'SHOW_GENDER_MODAL',
        payload: null
    };
};

export const closeGenderModal = () => {
    return {
        type: 'CLOSE_GENDER_MODAL',
        payload: null
    };
};

export const selectGender = (selectedGender) => {
    return {
        type: 'SELECT_GENDER',
        payload: selectedGender
    };
};

// Title

export const showTitleModal = () => {
    return {
        type: 'SHOW_TITLE_MODAL',
        payload: null
    };
};

export const closeTitleModal = () => {
    return {
        type: 'CLOSE_TITLE_MODAL',
        payload: null
    };
};

export const selectTitle = (selectedTitle) => {
    return {
        type: 'SELECT_TITLE',
        payload: selectedTitle
    };
};