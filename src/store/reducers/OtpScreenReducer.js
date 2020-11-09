const INITIAL_VALUES = {
    otp: '',
    loading: false,
    errorMessage: ''
};

const otpScreenReducer = (state = INITIAL_VALUES, action) => {
    switch(action.type) {
        case 'UPDATE_VALUES':
            return { ...state, [action.payload.key]: action.payload.value };
        case 'OTP_SCREEN':
            return { ...state, loading: true };
        case 'OTP_SCREEN_DONE':
            return { ...state, loading: false, errorMessage: action.payload };
        case 'OTP_SCREEN_FAILED':
            return { ...state, loading: false, errorMessage: action.payload };
        default:
            return state;
    }
};

export default otpScreenReducer;
