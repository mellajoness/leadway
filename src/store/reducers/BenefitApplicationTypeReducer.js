const INITIAL_VALUES = {
    benefitApplicationTypeList: [],
    loader: false,
    errorMessage: ''
};

const benefitApplicationTypeListReducer = (state = INITIAL_VALUES, action) => {

    switch(action.type) {
        case 'FETCH_BENEFIT_APPLICATION_TYPE_LIST':
            return { ...state, loading: true };
        case 'FETCH_BENEFIT_APPLICATION_TYPE_LIST_DONE':
            return { ...state, loading: false, benefitApplicationTypeList: action.payload };
        case 'FETCH_BENEFIT_APPLICATION_TYPE_LIST_FAILED':
            return { ...state, loading: false, errorMessage: action.payload };
        default:
            return state;
    };
};

export default benefitApplicationTypeListReducer;