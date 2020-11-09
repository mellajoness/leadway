import { Alert, InteractionManager } from 'react-native';
import {
    BENEFIT_APPLICATION_TYPE_API,
    BENEFIT_REQUIRED_DOCUMENT_API,
    GET_BANK_BRANCHES_API,
    GET_BANKS_API,
    SERVER_REQUEST,
    SUBMIT_BENEFIT_APPLICATION_API, SUBMIT_NEW_BENEFIT_APPLICATION_API,
} from "../../shared/Backend";
import {
    GET_PAYMENT_TYPE,
    GET_STORED_BANK, GET_STORED_PAYMENT_TYPE,
    GET_STORED_REQUIRED_DOCUMENT,
    STORE_BANK, STORE_PAYMENT_TYPE,
    STORE_REQUIRED_DOCUMENT
} from "../../shared/Storage";
import {ResponseModel} from "../../shared/ResponseModel";
import {LOGGER} from "../../shared/Methods";
import Moment from "moment";

export const updateBenefitApplicationValues = (key, value) => {
    return {
        type: 'UPDATE_VALUES',
        payload: { key, value }
    };
};

export const submitBenefitApplication = (body, navigation) => {
    return async (dispatch) => {

        delete body.OTPType;
        delete body.userType;
        delete body.PencomPin;

        LOGGER('benefit body log', body);

        dispatch({ type: 'BENEFIT_APPLICATION', payload: null });

        try {
            const response = await SERVER_REQUEST(body, SUBMIT_BENEFIT_APPLICATION_API, 'POST');
            const res = new ResponseModel(response);

            if (res.StatusCode === '00') {
                LOGGER('benefit submit', res);

                dispatch(resetBenefitDocuments());
                dispatch(resetBenefitFields());

                InteractionManager.runAfterInteractions(() => {
                    setTimeout(() => {
                        Alert.alert('Benefit Application Successful', 'Your Benefit Application is ' +
                            'successful and application number is ' + res.Data);
                    });
                });

                navigation.navigate('Apply');
            } else {
                InteractionManager.runAfterInteractions(() => {
                    setTimeout(() => {
                        Alert.alert('Benefit Application Error', res.Message);
                    });
                });
            }

            dispatch({ type: 'BENEFIT_APPLICATION_DONE', payload: null });
        }
        catch (error) {
            dispatch({ type: 'BENEFIT_APPLICATION_DONE', payload: error.message });
        }
    };
};

export const fetchBankList = (body) => {
    return async (dispatch) => {
        const bankList = await GET_STORED_BANK();

        if (bankList.length < 1) {
            dispatch({ type: 'FETCH_BANK_LIST', payload: true });
        } else {
            dispatch({ type: 'FETCH_BANK_LIST_DONE', payload: bankList });
        }

        try {
            const response = await SERVER_REQUEST(body, GET_BANKS_API, 'POST');
            const res = new ResponseModel(response);

            if (res.StatusCode === '00') {
                STORE_BANK(response.Data);
                dispatch({ type: 'FETCH_BANK_LIST_DONE', payload: res.Data });
            } else {
                if (bankList.length < 1) {
                    dispatch({type: 'FETCH_BANK_LIST_FAILED', payload: res.Message});
                }
            }
        }
        catch (error) {
            dispatch({type: 'FETCH_BANK_LIST_FAILED', payload: error.message});
        }
    };
};

export const fetchBankBranchList = (body, bankBranchId) => {
    return async (dispatch) => {

        dispatch({ type: 'FETCH_BANK_BRANCH_LIST', payload: true });

        try {
            const response = await SERVER_REQUEST(body, GET_BANK_BRANCHES_API + bankBranchId, 'POST');
            const res = new ResponseModel(response);

            LOGGER('bank branh list', res.Data);
            if (res.StatusCode === '00') {
                dispatch({ type: 'FETCH_BANK_BRANCH_LIST_DONE', payload: res.Data });
            } else {
                dispatch({type: 'FETCH_BANK_BRANCH_LIST_FAILED', payload: res.Message});
            }
        } catch (error) {
            dispatch({type: 'FETCH_BANK_BRANCH_LIST_FAILED', payload: error.message});
        }
    };
};

export const fetchRequiredDocuments = (body) => {
    return async (dispatch) => {

        dispatch({ type: 'FETCH_REQUIRED_DOCUMENT', payload: true });

        try {
            const response = await SERVER_REQUEST(body, BENEFIT_REQUIRED_DOCUMENT_API, 'POST');
            const res = new ResponseModel(response);

            if (res.StatusCode === '00') {

                const documents = [];

                res.Data.filter((item) => {
                    if((item.documentNameField !== 'Application Form') &&
                        (item.documentNameField !== 'RSA Snapshot'))
                    {
                        documents.push(item);
                    }
                });

                LOGGER('new documents', documents);

                dispatch({ type: 'FETCH_REQUIRED_DOCUMENT_DONE', payload: documents });
            } else {
                dispatch({type: 'FETCH_REQUIRED_DOCUMENT_FAILED', payload: res.Message});
            }
        }
        catch (error) {
            dispatch({type: 'FETCH_REQUIRED_DOCUMENT_FAILED', payload: error.message});
        }
    };
};

export const fetchBenefitType = (body) => {
    return async (dispatch) => {
        const paymentTypeList = await GET_STORED_PAYMENT_TYPE();

        if (paymentTypeList.length < 1) {
            dispatch({ type: 'FETCH_PAYMENT_TYPE', payload: true });
        } else {
            dispatch({ type: 'FETCH_PAYMENT_TYPE', payload: paymentTypeList });
        }

        try {
            const response = await SERVER_REQUEST(body, BENEFIT_APPLICATION_TYPE_API, 'POST');
            const res = new ResponseModel(response);

            if (res.StatusCode === '00') {
                STORE_PAYMENT_TYPE(response.Data);
                const filteredData = [];

                LOGGER("benefit type", response.Data);

                for (const item of response.Data) {
                    if(item.approvalIDField === 2 || item.approvalIDField === 7)
                    {
                        filteredData.push(item);
                    }
                }
                dispatch({ type: 'FETCH_PAYMENT_TYPE_DONE', payload: filteredData });
            } else {
                if (paymentTypeList.length < 1) {
                    dispatch({type: 'FETCH_PAYMENT_TYPE_FAILED', payload: res.Message});
                }
            }
        }
        catch (error) {
            dispatch({type: 'FETCH_PAYMENT_TYPE_FAILED', payload: error.message});
        }
    };
};

export const resetBenefitFields = () => {
    return {
        type: 'RESET_FIELDS',
        payload: null
    };
};

export const resetBenefitDocuments = () => {
    return {
        type: 'RESET_DOCUMENTS',
        payload: null
    };
};

export const showBankModal = () => {
    return {
        type: 'SHOW_BANK_MODAL',
        payload: null
    };
};

export const closeBankModal = () => {
    return {
        type: 'CLOSE_BANK_MODAL',
        payload: null
    };
};

export const selectBankName = (selectedBank) => {
    return {
        type: 'SELECT_BANK_NAME',
        payload: selectedBank
    };
};

// export const setPaymentType = (selectedType) => {
//     return {
//         type: 'SELECT_PAYMENT_TYPE',
//         payload: selectedType
//     };
// };

export const selectBankId = (selectedBank) => {
    return {
        type: 'SELECT_BANK_ID',
        payload: selectedBank
    };
};

export const selectBankBranchId = (selectedBankBranch) => {
    return {
        type: 'SELECT_BANK_BRANCH_ID',
        payload: selectedBankBranch
    };
};

export const selectBankBranchName = (selectedBankBranch) => {
    return {
        type: 'SELECT_BANK_BRANCH_NAME',
        payload: selectedBankBranch
    };
};

export const selectBenefitType = (selectedBenefitType) => {
    return {
        type: 'SELECT_BENEFIT_TYPE',
        payload: selectedBenefitType
    };
};

export const selectBenefitTypeName = (selectedBenefitType) => {
    return {
        type: 'SELECT_BENEFIT_TYPE_NAME',
        payload: selectedBenefitType
    };
};

export const selectDocument = (selectedDocument) => {
    return {
        type: 'SELECT_BENEFIT_DOCUMENT',
        payload: selectedDocument
    };
};

export const showReasonModal = () => {
    return {
        type: 'SHOW_REASON_MODAL',
        payload: null
    };
};

export const closeReasonModal = () => {
    return {
        type: 'CLOSE_REASON_MODAL',
        payload: null
    };
};

export const showImageCaptureModal = () => {
    return {
        type: 'SHOW_IMAGE_CATEGORY_MODAL',
        payload: null
    };
};

export const closeImageCaptureModal = () => {
    return {
        type: 'CLOSE_IMAGE_CATEGORY_MODAL',
        payload: null
    };
};

export const selectedDocumentUpload = (selectedDocument) => {
    return {
        type: 'SELECTED_BENEFIT_DOCUMENT_UPLOAD',
        payload: selectedDocument
    };
};

export const selectReason = (selectedReason) => {
    return {
        type: 'SELECT_REASON',
        payload: selectedReason
    };
};

export const documentUploadRequest = (request) => {
    return {
        type: 'DOCUMENT_UPLOAD_REQUEST',
        payload: request
    };
};

export let documentData = [];
export const requiredApplicationDocuments = (document, selectedDocumentName) => {

    const doc = document.find(x => x.documentNameField === selectedDocumentName);

    // const chunkedData = chunckString(doc.image, 100000);
    // LOGGER('chunked data', chunkedData);

    const data = {
        'documentHashValue': doc.image,
        // 'SplitdocumentHashValue': chunkedData,
        'isVerified': '',
        'documentLocation': '',
        'documentTypeID': doc.documentIDField,
        'documentTypeName': doc.documentNameField,
        'dateReceived': Moment().format(),
        'receivedBy': '',
        'memberApplicationID': '',
        'documentSource': '',
    };

    const res = (documentData.findIndex(x => x.documentTypeName === selectedDocumentName));
    if(res >= 0)
    {
        const existingData = documentData.find(x => x.documentTypeName === selectedDocumentName);
        existingData.documentHashValue = data.documentHashValue;
    }
    else
    {
        documentData.push(data);
    }

    // LOGGER('document data', documentData)

    // const newArray = documentData;
    // documentData = [];

    return {
        type: 'BENEFIT_REQUIRED_DOCUMENT_DATA',
        payload: documentData
    };
};

const chunckString = (string, length) => {
    // return string.match(new RegExp('.{1,' + length + '}', 'g'));
    LOGGER('string length', string.length)
    const numChunks = Math.ceil(string.length / length)
    const chunks = new Array(numChunks)

    for (let i = 0, o = 0; i < numChunks; ++i, o += length) {
        const data = {
            'Position': i,
            'splitText': string.substr(o, length),
        };

        chunks.push(data);
    }

    return chunks
};