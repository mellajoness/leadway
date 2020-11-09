const INITIAL_VALUES = {
    username: '',
    pin: '',
    loading: false,
    sensorAvailable: '',
    showFingerprintModal: false,
    authError: '',
    fullname: '',
    pencom: '',
    email: '',
    profilepicture: '',
    showRating: false,
    rateComment: '',
    rateValue: 3,
    activeComponent: 'Account',
    isGetHelp: true,
    isLogout: false,
    resetPinPencom: '',
};

const loginReducer = (state = INITIAL_VALUES, action) => {
    switch(action.type) {
        case 'UPDATE_VALUES':
            return { ...state, [action.payload.key]: action.payload.value };
        case 'AUTHENTICATE_USER':
            return { ...state, loading: true };
        case 'FETCH_PROFILE_PICTURE':
            return { ...state, loading: false, profilepicture: action.payload };
        case 'LOGIN_USER_DATA':
            return {...state, loading: false};
        case 'AUTHENTICATE_USER_DONE':
            return {...state, loading: false};
        case 'AUTHENTICATE_USER_INFO':
            return { ...state, loading: false,
                    fullname: action.payload.Fullname,
                    pencom: action.payload.pencomPin,
                    email: action.payload.email
            };
        case 'LOGOUT_USER':
            return {...state, loading: false, showRating: true};
        case 'CLOSE_RATING_DIALOG':
            return { ...state, showRating: false };
        case 'OPEN_RATING_DIALOG':
            return { ...state, showRating: true };
        case 'SUBMIT_SESSION_RATE':
            return {...state, loading: true};
        case 'SUBMIT_SESSION_RATE_DONE':
            return {...state, loading: false, showRating: false};
        case 'SUBMIT_SESSION_RATE_FAILED':
            return {...state, loading: false};
        case 'ACTIVE_COMPONENT':
            return {...state, loading: false, activeComponent: action.payload};
        case 'SET_IS_GET_HELP':
            return {...state, isGetHelp: action.payload};
        case 'IS_LOGOUT_CLICKED':
            return {...state, isLogout: action.payload};
        default:
            return state;
    }
};

export default loginReducer;
