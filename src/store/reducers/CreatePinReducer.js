const INITIAL_VALUES = {
    pin: '',
    loading: false,
    errorMessage: ''
};

const createPinReducer = (state = INITIAL_VALUES, action) => {
    switch(action.type) {
        case 'UPDATE_VALUES':
            return { ...state, [action.payload.key]: action.payload.value };
        case 'CREATE_PIN':
            return { ...state, loading: true };
        case 'CREATE_PIN_DONE':
            return { ...state, loading: false };
        case 'CREATE_PIN_FAILED':
            return { ...state, loading: false, errorMessage: action.payload };
        default:
            return state;
    }
};

export default createPinReducer;
