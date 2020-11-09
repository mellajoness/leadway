import { Alert } from 'react-native';
import { SERVER_REQUEST, VALIDATE_USER_API, } from "../../shared/Backend";
import { LOGGER } from "../../shared/Methods";

export const updateCreatePinValues = (key, value) => {
    return {
        type: 'UPDATE_VALUES',
        payload: { key, value }
    };
};

// export const createPin = (body) => {
//     return async (dispatch) => {
//         dispatch({ type: 'CREATE_PIN', payload: null });

//         const response = await SERVER_REQUEST(body, VALIDATE_USER_API, 'POST');
//         LOGGER('CREATE PIN ACTION', response);
//         if (response.StatusCode === '00') {

//         } else {
//             Alert.alert('Create Pin Error', response.Message);
//         }

//         dispatch({ type: 'CREATE_PIN_DONE', payload: null });
//     };
// }