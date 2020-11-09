import { Alert } from 'react-native';
import {GET_PENCOMPIN} from "../../shared/Storage";
import { SERVER_REQUEST, VALIDATE_USER_API} from "../../shared/Backend";
import {DEVICE_ID, LOGGER} from "../../shared/Methods";

// export const updateMobilePinValues = (key, value) => {
//     return {
//         type: 'UPDATE_VALUES',
//         payload: { key, value }
//     };
// };
//
// export const submitMobilePinChange = (body, navigation) => {
//     return async (dispatch) => {
//         dispatch({ type: 'SUBMIT_MOBILE_PIN_CHANGE', payload: null });
//
//         body['PencomPin'] = await GET_PENCOMPIN();
//
//         LOGGER('mobile pin data', body);
//         const response = await SERVER_REQUEST(body, VALIDATE_USER_API, 'POST');
//         if (response.StatusCode === '00') {
//             navigation.navigate('Otp');
//         } else {
//             Alert.alert('Error', response.Message);
//         }
//
//         dispatch({ type: 'SUBMIT_MOBILE_PIN_CHANGE_DONE', payload: null });
//     };
// };