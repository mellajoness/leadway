import { SERVER_REQUEST, DETAILED_ACCOUNT_STATEMENT_API, } from "../../shared/Backend";
import { LOGGER } from "../../shared/Methods";

export const fetchTransactionList = (body) => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_TRANSACTION_LIST', payload: null });

        const response = await SERVER_REQUEST(body, DETAILED_ACCOUNT_STATEMENT_API, 'POST');
        LOGGER('TRANSACTION LIST ACTION', response);
        if (response.StatusCode === '00') {

        } else {
            dispatch({ type: 'FETCH_TRANSACTION_LIST_FAILED', payload: response.Message });
        }

        dispatch({ type: 'FETCH_TRANSACTION_LIST_DONE', payload: null });
    };
}