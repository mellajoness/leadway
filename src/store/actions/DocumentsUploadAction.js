import { SERVER_REQUEST, BENEFIT_REQUIRED_DOCUMENT_API, } from "../../shared/Backend";
import { LOGGER } from "../../shared/Methods";

export const fetchDocumentList = (body) => {
    return async (dispatch) => {
        dispatch({ type: 'DOCUMENTS_UPLOAD_LIST', payload: null });

        const response = await SERVER_REQUEST(body, BENEFIT_REQUIRED_DOCUMENT_API, 'POST');
        LOGGER('DOCUMENT LIST ACTION', response);
        if (response.StatusCode === '00') {

        } else {
            dispatch({ type: 'DOCUMENTS_UPLOAD_LIST_FAILED', payload: response.Message });
        }

        dispatch({ type: 'DOCUMENTS_UPLOAD_LIST_DONE', payload: null });
    };
}