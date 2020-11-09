import { Alert, InteractionManager } from 'react-native';
import { SERVER_REQUEST, VALIDATE_OTP_API, } from "../../shared/Backend";
import { LOGGER } from "../../shared/Methods";

// export const updateCreatePinValues = (key, value) => {
//     return {
//         type: 'UPDATE_VALUES',
//         payload: { key, value }
//     };
// };

export const createPin = (body) => {
    return async (dispatch) => {
        dispatch({ type: 'OTP_SCREEN', payload: null });

        const response = await SERVER_REQUEST(body, VALIDATE_OTP_API, 'POST');
        LOGGER('OTP SCREEN ACTION', response);
        if (response.StatusCode === '00') {

        } else {
            InteractionManager.runAfterInteractions(() => {
                setTimeout(() => {
                    Alert.alert('OTP Screen Error', response.Message);
                });
            });
        }

        dispatch({ type: 'OTP_SCREEN_DONE', payload: null });
    };
}