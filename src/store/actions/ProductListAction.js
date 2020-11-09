import { SERVER_REQUEST, PRODUCT_LIST_API, FEEDBACK_API,  } from "../../shared/Backend";
import { LOGGER } from "../../shared/Methods";
import { ResponseModel } from '../../shared/ResponseModel';
import {GET_STORED_PRODUCT, SAVE_FEEDBACK, SAVE_PRODUCT} from "../../shared/Storage";
import { Alert, InteractionManager } from 'react-native';

export const fetchProductList = (body) => {
    return async (dispatch) => {
        const productList = await GET_STORED_PRODUCT();

        if (productList.length < 1) {
            dispatch({ type: 'FETCH_PRODUCT_LIST', payload: true });
        } else {
            dispatch({ type: 'FETCH_PRODUCT_LIST_DONE', payload: productList });
        }

        try {
            const res = await SERVER_REQUEST(body, PRODUCT_LIST_API, 'POST');
            const response = new ResponseModel(res);
            LOGGER('PRODUCT LIST ACTION', response);

            if (response.StatusCode === '00') {
                SAVE_PRODUCT(response.Data);
                dispatch({ type: 'FETCH_PRODUCT_LIST_DONE', payload: response.Data });
            } else {
                if (productList.length < 1) {
                    dispatch({type: 'FETCH_PRODUCT_LIST_FAILED', payload: response.Message});
                }
            }
        }
        catch (error) {
            dispatch({ type: 'FETCH_PRODUCT_LIST_FAILED', payload: error.message });
        }
    };
};

export const setProductDetails = (detail) => {
    return {
        type: 'SHOW_PRODUCT_DETAILS',
        payload: detail
    };
};

export const closeDetailModal = () => {
    return {
        type: 'CLOSE_PRODUCT_DETAILS',
        payload: null
    };
};


export const productListFeedback = (body) => {
    return async (dispatch) => {
        dispatch({ type: 'PRODUCT_LIST_FEEDBACK', payload: null });

        try {
            const res = await SERVER_REQUEST(body, FEEDBACK_API, 'POST');
            const response = new ResponseModel(res);
            LOGGER('PRODUCT LIST FEEDBACK ACTION', response);

            if (response.StatusCode === '00') {
                dispatch({ type: 'PRODUCT_LIST_FEEDBACK_DONE', payload: response.Data });
                SAVE_FEEDBACK(body.Title);
                InteractionManager.runAfterInteractions(() => {
                    setTimeout(() => {
                        Alert.alert('Feedback', 'Feedback successfully received');
                    });
                });
            } else {
                dispatch({ type: 'PRODUCT_LIST_FEEDBACK_FAILED', payload: response.Message });
            }
        }
        catch (error) {
            dispatch({ type: 'PRODUCT_LIST_FEEDBACK_FAILED', payload: error.message });
        }
    };
};