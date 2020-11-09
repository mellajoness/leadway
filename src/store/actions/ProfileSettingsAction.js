import {SERVER_REQUEST, FULL_CLIENT_DETAILS_API,} from "../../shared/Backend";
import { LOGGER } from "../../shared/Methods";
import { ResponseModel } from '../../shared/ResponseModel';
import {GET_TOKEN, SAVE_MOBILE_NUMBER} from '../../shared/Storage';

export const fetchUserProfile = (body) => {
    return async (dispatch) => {
        dispatch({ type: 'USER_PROFILE', payload: null });

        body['FundID'] = 2;
        body['sessionID'] = await GET_TOKEN();

        try {
            const response = await SERVER_REQUEST(body, FULL_CLIENT_DETAILS_API, 'POST');
            const res = new ResponseModel(response);
            LOGGER('full profile info', res);

            if (res.StatusCode === '00') {

                SAVE_MOBILE_NUMBER(res.Data.mobileno);
                dispatch({ type: 'USER_PROFILE_INFO', payload: res.Data });

            }
            else {
                dispatch({ type: 'USER_PROFILE_DONE', payload: null });
            }
        }
        catch (error) {
            dispatch({ type: 'USER_PROFILE_DONE', payload: error.message });
        }
    };
};

export const showCertificateDialog = () => {
    return {
        type: 'SHOW_CERTIFICATE_DIALOG',
        payload: null
    };
};

export const closeCertificateDialog = () => {
    return {
        type: 'CLOSE_CERTIFICATE_DIALOG',
        payload: null
    };
};