import { SERVER_REQUEST, FAQ_API, FEEDBACK_API } from "../../shared/Backend";
import { LOGGER } from "../../shared/Methods";
import { ResponseModel } from "../../shared/ResponseModel";
import {SAVE_FEEDBACK} from '../../shared/Storage';
import { GET_STORED_FAQ, SAVE_FAQ } from "../../shared/Storage";
import { Alert, InteractionManager } from 'react-native';

export const fetchFaqList = (body) => {
    return async (dispatch) => {
        const faqList = await GET_STORED_FAQ();

        if (faqList.length < 1) {
            dispatch({ type: 'FETCH_FAQ_LIST', payload: true });
        } else {
            dispatch({ type: 'FETCH_FAQ_LIST_DONE', payload: faqList });
        }

        try {

        }
        catch (error) {
            dispatch({ type: 'SUBMIT_PERSONAL_DETAILS_DONE', payload: null });
        }

        const res = await SERVER_REQUEST(body, FAQ_API, 'POST');
        const response = new ResponseModel(res);

        LOGGER('FAQ LIST ACTION', response);
        if (response.StatusCode === '00') {
            SAVE_FAQ(response.Data);
            dispatch({ type: 'FETCH_FAQ_LIST_DONE', payload: response.Data });
        } else {
            if (faqList.length < 1) {
                dispatch({ type: 'FETCH_FAQ_LIST_FAILED', payload: response.Message });
            }
        }
    };
}

export const FAQListFeedback = (body) => {
    return async (dispatch) => {
        dispatch({ type: 'FAQ_LIST_FEEDBACK', payload: null });

        try {
            const res = await SERVER_REQUEST(body, FEEDBACK_API, 'POST');
            const response = new ResponseModel(res);
            LOGGER('FAQ LIST FEEDBACK ACTION', response);

            if (response.StatusCode === '00') {
                dispatch({ type: 'FAQ_LIST_FEEDBACK_DONE', payload: response.Data });
                SAVE_FEEDBACK(body.Title);
                InteractionManager.runAfterInteractions(() => {
                    setTimeout(() => {
                        Alert.alert('Feedback', 'Feedback successfully received');
                    });
                });
            } else {
                dispatch({ type: 'FAQ_LIST_FEEDBACK_FAILED', payload: response.Message });
            }
        }
        catch (error) {
            dispatch({ type: 'FAQ_LIST_FEEDBACK_FAILED', payload: error.message });
        }
    };
};