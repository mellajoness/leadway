import { SERVER_REQUEST, LIST_BRANCH_DETAILS_API, } from "../../shared/Backend";
import { LOGGER } from "../../shared/Methods";
import { ResponseModel } from "../../shared/ResponseModel";
import {GET_STORED_BRANCH, SAVE_BRANCH} from "../../shared/Storage";

export const fetchBranchList = (body) => {
    return async (dispatch) => {
        const branchList = await GET_STORED_BRANCH();

        if (branchList.length < 1) {
            dispatch({ type: 'FETCH_BRANCH_LIST', payload: true });
        } else {
            dispatch({ type: 'FETCH_BRANCH_LIST_DONE', payload: branchList });
        }

        try {
            const response = await SERVER_REQUEST(body, LIST_BRANCH_DETAILS_API, 'POST');
            const res = new ResponseModel(response);

            if (res.StatusCode === '00') {
                SAVE_BRANCH(response.Data);
                dispatch({ type: 'FETCH_BRANCH_LIST_DONE', payload: res.Data });
            } else {
                if (branchList.length < 1) {
                    dispatch({type: 'FETCH_BRANCH_LIST_FAILED', payload: res.Message});
                }
            }
        }
        catch (error) {
            dispatch({ type: 'FETCH_BRANCH_LIST_FAILED', payload: error.message });
        }
    };
};

export const showBranchModal = (selectedBranch) => {
    return {
        type: 'SHOW_BRANCH_MODAL',
        payload: selectedBranch
    };
};

export const closeBranchModal = () => {
    return {
        type: 'CLOSE_BRANCH_MODAL',
        payload: null
    };
};
