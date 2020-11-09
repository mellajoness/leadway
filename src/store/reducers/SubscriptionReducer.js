const INITIAL_VALUES = {
    subscriptionList: [],
    loading: false,
    errorMessage: ''
};

const subscriptionReducer = (state = INITIAL_VALUES, action) => {

    switch(action.type){
        case 'FETCH_SUBSCRIPTION_LIST':
            return { ...state, loading: true };
        case 'FETCH_SUBSCRIPTION_LIST_DONE':
            return { ...state, loading: false, subscriptionList: action.payload };
        case 'FETCH_SUBSCRIPTION_LIST_FAILED':
            return { ...state, loading: false, errorMessage: action.payload };
        case 'UPDATE_SUBSCRIPTION_LIST':
            return { ...state, loading: true };
        case 'UPDATE_SUBSCRIPTION_LIST_DONE':
            return { ...state, loading: false };
        case 'UPDATE_SUBSCRIPTION':
            return { ...state, subscriptionList: [ ...action.payload ] };
        default:
            return state;
    }
};

export default subscriptionReducer;