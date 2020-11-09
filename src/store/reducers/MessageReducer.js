const INITIAL_VALUES = {
    messageList: [],
    loading: false,
    errorMessage: '',
    selectedMessageList: {}
};

const messageReducer = (state = INITIAL_VALUES, action) => {

    switch(action.type){
        case 'FETCH_MESSAGE_LIST':
            return { ...state, loading: true };
        case 'FETCH_MESSAGE_LIST_DONE':
            return { ...state, loading: false, messageList: action.payload };
        case 'FETCH_MESSAGE_LIST_FAILED':
            return { ...state, loading: false, errorMessage: action.payload };
        case 'SELECT_MESSAGE_LIST':
            return { ...state, selectedMessageList: action.payload };
        default:
            return state;
    }
};

export default messageReducer;