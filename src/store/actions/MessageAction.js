import {
    SERVER_REQUEST,
    NEW_NOTIFICATION_API,
    PERSONAL_NOTIFICATION_API
} from "../../shared/Backend";
import { LOGGER } from "../../shared/Methods";
import { ResponseModel } from "../../shared/ResponseModel";
import {GET_PENCOMPIN} from "../../shared/Storage";

export const fetchPersonalMessageList = (body) => {
    return async (dispatch) => {

        dispatch({ type: 'FETCH_MESSAGE_LIST', payload: true });

        body['PencomPin'] = await GET_PENCOMPIN();

        try {

        }
        catch (error) {
            dispatch({ type: 'FETCH_MESSAGE_LIST_FAILED', payload: error.message });
        }

        const res = await SERVER_REQUEST(body, PERSONAL_NOTIFICATION_API, 'POST');

        const response = new ResponseModel(res);

        LOGGER('MESSAGE LIST ACTION', response);
        if (response.StatusCode === '00') {
            dispatch({ type: 'FETCH_MESSAGE_LIST_DONE', payload: response.Data });
        } else {
            dispatch({ type: 'FETCH_MESSAGE_LIST_FAILED', payload: response.Message });
        }
    };
};

export const fetchNewMessageList = (body) => {
    return async (dispatch) => {

        dispatch({ type: 'FETCH_MESSAGE_LIST', payload: true });

        body['PencomPin'] = await GET_PENCOMPIN();


        try {
            const res = await SERVER_REQUEST(body, NEW_NOTIFICATION_API, 'POST');

            const response = new ResponseModel(res);

            LOGGER('MESSAGE LIST ACTION', response);
            if (response.StatusCode === '00') {
                dispatch({ type: 'FETCH_MESSAGE_LIST_DONE', payload: response.Data });
            } else {
                dispatch({ type: 'FETCH_MESSAGE_LIST_FAILED', payload: response.Message });
            }
        }
        catch (error) {
            dispatch({ type: 'FETCH_MESSAGE_LIST_FAILED', payload: error.message });
        }
    };
};

export const selectMessageList = (selectedMessage) => {
    return {
        type: 'SELECT_MESSAGE_LIST',
        payload: selectedMessage
    };
};