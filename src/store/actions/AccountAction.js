import { SERVER_REQUEST, DETAILED_ACCOUNT_STATEMENT_API, SUMMARY_ACCOUNT_STATEMENT_API, } from "../../shared/Backend";
import { LOGGER } from "../../shared/Methods";
import {GET_TOKEN, SAVE_AVC_AMOUNT} from "../../shared/Storage";
import { ResponseModel } from "../../shared/ResponseModel";

export const updateTransactionValues = (key, value) => {
    return {
        type: 'UPDATE_VALUES',
        payload: { key, value } 
    };
};

export const summaryAccountData = (fundId) => {
    return async (dispatch) => {
        dispatch({ type: 'ACCOUNT_DATA', payload: true });

        const token = await GET_TOKEN();

        const body = {
            FundID: fundId,
            sessionID: token
        };

        try {
            const response = await SERVER_REQUEST(body, SUMMARY_ACCOUNT_STATEMENT_API, 'POST');
            const res = new ResponseModel(response);
            LOGGER('SUMMARY ACCOUNT ', body);
            LOGGER('SUMMARY ACCOUNT ACTION', res);

            if (res.StatusCode === '00') {
                dispatch({ type: 'SUMMARY_ACCOUNT', payload: res.Data });
            } else {
                dispatch({ type: 'GET_ACCOUNT_FAILED', payload: res.Message });
            }
        }
        catch (error) {
            LOGGER('SUMMARY ACCOUNT ERROR', error.message);
            dispatch({ type: 'GET_ACCOUNT_FAILED', payload: error.message });
        }
    };
};

export const detailedAccountData = (fundId, startDate, endDate, navigation) => {
    return async (dispatch) => {
        dispatch({ type: 'ACCOUNT_DATA', payload: true });

        console.log('Got here');
        const token = await GET_TOKEN();

        const body = {
            FundID: fundId,
            startDate: startDate,
            endDate: endDate,
            sessionID: token
        };

        try {
            LOGGER('detail body', body);
            const response = await SERVER_REQUEST(body, DETAILED_ACCOUNT_STATEMENT_API, 'POST');
            const res = new ResponseModel(response);
            LOGGER('DETAILED ACCOUNT ACTION', res);

            if (res.StatusCode === '00') {
                if((res.Data.funds_account_details === null) || (res.Data.FundType === null))
                {
                    dispatch({ type: 'RESET_DETAILED_ACCOUNT', payload: null });
                }
                else
                {
                    dispatch({ type: 'DETAILED_ACCOUNT', payload: res.Data });
                    dispatch({ type: 'SELECTED_FUND', payload: res.Data.FundType });
                }

                dispatch({ type: 'RESET_DATE_FIELDS', payload: null });

                if(navigation)
                    navigation.navigate("Transaction");
            } else {
                dispatch({ type: 'GET_ACCOUNT_FAILED', payload: res.Message });
            }
        }
        catch (error) {
            dispatch({ type: 'GET_ACCOUNT_FAILED', payload: error.message });
        }
    };
};

export const showTransactionModal = (selectedTransaction) => {
    return {
        type: 'SHOW_TRANSACTION_MODAL',
        payload: selectedTransaction
    };
};

export const closeTransactionModal = () => {
    return {
        type: 'CLOSE_TRANSACTION_MODAL',
        payload: null
    };
};

export const selectAccountFundType = (selectedFundType) => {
    return {
        type: 'SELECT_FUND_TYPE',
        payload: selectedFundType
    };
};

export const selectDefaultAccountFundType = (selectedFundType) => {
    return {
        type: 'SELECT_DEFAULT_FUND_TYPE',
        payload: selectedFundType
    };
};