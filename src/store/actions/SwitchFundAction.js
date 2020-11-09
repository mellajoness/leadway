import {GET_ACTIVE_FUND_TYPES, GET_PENCOMPIN} from '../../shared/Storage';
import {DEVICE_ID, LOGGER} from "../../shared/Methods";
import {CHANGE_PERSONAL_DETAILS_API, FUND_SWITCH_API, SERVER_REQUEST} from "../../shared/Backend";
import {Alert, InteractionManager} from "react-native";

export const updateSwitchFundValues = (key, value) => {
    return {
        type: 'UPDATE_VALUES',
        payload: { key, value }
    };
};

export const submitSwitchFundRequest = (body, navigation) => {
    return async (dispatch) => {
        dispatch({ type: 'SUBMIT_SWITCH_FUND', payload: null });

        body['RSAPIN'] = await GET_PENCOMPIN();

        LOGGER('switch body', body);

        try {
            const response = await SERVER_REQUEST(body, FUND_SWITCH_API, 'POST');
            if (response.StatusCode === '00') {
                InteractionManager.runAfterInteractions(() => {
                    setTimeout(() => {
                        Alert.alert('Update Success', response.Message);
                    });
                });
                navigation.navigate('Account');
            } else {
                InteractionManager.runAfterInteractions(() => {
                    setTimeout(() => {
                        Alert.alert('Update Error', response.Message);
                    });
                });
            }

            dispatch({ type: 'SUBMIT_SWITCH_FUND_DONE', payload: null });
        }
        catch (error) {
            dispatch({ type: 'SUBMIT_SWITCH_FUND_DONE', payload: error.message });
        }
    };
};

export const getActiveFunds = () => {
    return async (dispatch) => {

        const activeFunds = await GET_ACTIVE_FUND_TYPES();
        dispatch({ type: 'ACTIVE_FUND_TYPES', payload: activeFunds });
    };
};

export const showFundTypesModal = () => {
    return {
        type: 'SHOW_FUND_TYPE_MODAL',
        payload: null
    };
};

export const closeFundTypesModal = () => {
    return {
        type: 'CLOSE_FUND_TYPE_MODAL',
        payload: null
    };
};

export const selectFundTypes = (selectedFundType) => {
    return {
        type: 'SELECT_FUND_TYPE',
        payload: selectedFundType
    };
};

export const showFundTypesToModal = () => {
    return {
        type: 'SHOW_FUND_TYPE_TO_MODAL',
        payload: null
    };
};

export const closeFundTypesToModal = () => {
    return {
        type: 'CLOSE_FUND_TYPE_TO_MODAL',
        payload: null
    };
};

export const selectFundTypesTo = (selectedFundTypeTo) => {
    return {
        type: 'SELECT_FUND_TYPE_TO',
        payload: selectedFundTypeTo
    };
};

export const switchFundRequest = (request) => {
    return {
        type: 'SWITCH_FUND_REQUEST',
        payload: request
    };
};