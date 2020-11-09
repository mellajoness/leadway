const INITIAL_VALUES = {
    email: '',
    pencomPin: '',
    phoneNo: '',
    userPin: '',
    registerWith: 0,
    loading: false,
    otpLoading: false,
    userType: '',
    otp: '',
    currentPin: '',
    newMobilePin: '',
    resetPinBody: {}
};

const userAuthReducer = (state = INITIAL_VALUES, action) => {
    switch(action.type) {
        case 'CHANGE_VALUES':
            return { ...state, [action.payload.key]: action.payload.value };
        case 'OTP_LOADING':
            return { ...state, otpLoading: action.payload };
        case 'OTP_LOADING_STOP':
            return { ...state, otpLoading: false, otp: action.payload };
        case 'VALIDATE_USER':
            return { ...state, loading: action.payload };
        case 'VALIDATE_USER_SUCCESS':
            return { ...state, loading: false, otp: action.payload };
        case 'SUBMIT_MOBILE_PIN_CHANGE':
            return { ...state, loading: true };
        case 'SUBMIT_MOBILE_PIN_CHANGE_DONE':
            return { ...state, loading: false };
        default:
            return state;
    }
};

export default userAuthReducer;
