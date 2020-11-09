const INITIAL_VALUES = {
    transactionList: [],
    loading: false,
    errorMessage: ''
};

const transactionListReducer = (state = INITIAL_VALUES, action) => {

    switch(action.type){
        case 'FETCH_TRANSACTION_LIST':
            return { ...state, loading: true };
        case 'FETCH_TRANSACTION_LIST_DONE':
            return { ...state, loading: false, transactionList: action.payload };
        case 'FETCH_TRANSACTION_LIST_FAILED':
            return { ...state, loading: false, errorMessage: action.payload };
        default:
            return state;
    }
};

export default transactionListReducer;