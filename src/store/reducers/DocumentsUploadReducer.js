const INITIAL_VALUES = {
    documentList: [],
    loading: false,
    errorMessage: ''
};

const documentsUploadReducer = (state = INITIAL_VALUES, action) => {

    switch(action.type){
        case 'DOCUMENTS_UPLOAD_LIST':
            return { ...state, loading: true };
        case 'DOCUMENTS_UPLOAD_LIST_DONE':
            return { ...state, loading: false, documentList: action.payload };
        case 'DOCUMENTS_UPLOAD_LIST_FAILED':
            return { ...state, loading: false, errorMessage: action.payload };
        default:
            return state;
    }
};

export default documentsUploadReducer;