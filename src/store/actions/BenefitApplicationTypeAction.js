import { SERVER_REQUEST, BENEFIT_APPLICATION_TYPE_API, } from "../../shared/Backend";
import { LOGGER } from "../../shared/Methods";

export const fetchBenefitApplicationTypeList = (body) => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_BENEFIT_APPLICATION_TYPE_LIST', payload: null });

        const response = await SERVER_REQUEST(body, BENEFIT_APPLICATION_TYPE_API, 'POST');
        LOGGER('BENEFIT APPLICATION TYPE LIST ACTION', response);
        if (response.StatusCode === '00') {

        } else {
            dispatch({ type: 'FETCH_BENEFIT_APPLICATION_TYPE_LIST_FAILED', payload: response.Message });
        }

        dispatch({ type: 'FETCH_BENEFIT_APPLICATION_TYPE_LIST', payload: null });
    };
}