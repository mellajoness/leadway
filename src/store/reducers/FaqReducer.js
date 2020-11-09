const INITIAL_VALUES = {
    faqList: [],
    loading: false,
    errorMessage: ''
};

const faqReducer = (state = INITIAL_VALUES, action) => {

    switch(action.type){
        case 'FETCH_FAQ_LIST':
            return { ...state, loading: true };
        case 'FETCH_FAQ_LIST_DONE':
            return { ...state, loading: false, faqList: action.payload };
        case 'FETCH_FAQ_LIST_FAILED':
            return { ...state, loading: false, errorMessage: action.payload };
        case 'FAQ_LIST_FEEDBACK':
            return { ...state, loading: true };
        case 'FAQ_LIST_FEEDBACK_DONE':
            return { ...state, loading: false};
        case 'FAQ_LIST_FEEDBACK_FAILED':
            return { ...state, loading: false};
        default:
            return state;
    }
};

export default faqReducer;