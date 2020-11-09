const INITIAL_VALUES = {
    fullname: '',
    pencom: '',
    emailaddres: '',
    showModalForGender: false,
    showModalForTitle: false,
    loading: false,
    selectedGender: '',
    selectedTitle: '',
    dateofbirth: '',
    employername: '',
    residentialaddress1: '',
    residentialaddress2: '',
    mobileno: '',
    surname: '',
    firstname: '',
    othername: '',
    officeaddress1: '',
    officeaddress2: '',
    dateofemployment: '',
    stateoforigin: '',
    localgovenmentList: [],
    selectedLocalGovernment: '',
    activefunds: [],
    showModelForFundType: false,
    selectedFundType: '',
    showModelForFundTypeTo: false,
    selectedFundTypeTo: '',
    accountOfficers: [],
    showCertificate: false,
    switchRequest: {},
};

const profileSettingsReducer = (state = INITIAL_VALUES, action) => {
    switch(action.type) {
        case 'UPDATE_VALUES':
            return { ...state, [action.payload.key]: action.payload.value };
        case 'USER_PROFILE':
            return { ...state, loading: true };
        case 'USER_PROFILE_DONE':
            return {...state, loading: false };
        case 'USER_PROFILE_INFO':
            return { ...state, loading: false,
                fullname: action.payload.Fullname,
                pencom: action.payload.pencompin,
                emailaddres: action.payload.emailaddres,
                dateofbirth: action.payload.dateofbirth,
                employername: action.payload.employername,
                residentialaddress1: action.payload.residentialaddress1,
                residentialaddress2: action.payload.residentialaddress2,
                mobileno: action.payload.mobileno,
                selectedTitle: action.payload.title,
                surname: action.payload.surname,
                firstname: action.payload.firstname,
                othername: action.payload.othername,
                officeaddress1: action.payload.officeaddress1,
                officeaddress2: action.payload.officeaddress2,
                dateofemployment: action.payload.date_of_first_employment,
                stateoforigin: action.payload.stateoforigjn,
                selectedLocalGovernment: action.payload.lgastateoforigin,
                selectedGender: action.payload.sex,
                accountOfficers: action.payload.AccountOfficers
            };
        case 'SHOW_GENDER_MODAL':
            return { ...state, showModalForGender: true };
        case 'CLOSE_GENDER_MODAL':
            return { ...state, showModalForGender: false };
        case 'SELECT_GENDER':
            return { ...state, selectedGender: action.payload, showModalForGender: false };
        case 'SHOW_TITLE_MODAL':
            return { ...state, showModalForTitle: true };
        case 'CLOSE_TITLE_MODAL':
            return { ...state, showModalForTitle: false };
        case 'SELECT_TITLE':
            return { ...state, selectedTitle: action.payload, showModalForTitle: false };
        case 'SUBMIT_PERSONAL_DETAILS':
            return { ...state, loading: true };
        case 'SUBMIT_PERSONAL_DETAILS_DONE':
            return { ...state, loading: false };
        case 'SUBMIT_EMPLOYER_DETAILS':
            return { ...state, loading: true };
        case 'SUBMIT_EMPLOYER_DETAILS_DONE':
            return { ...state, loading: false };
        case 'FETCH_LG_LIST':
            return { ...state, localgovenmentList: action.payload};
        case 'SELECT_LOCAL_GOVERNMENT':
            return { ...state, selectedLocalGovernment: action.payload};
        case 'ACTIVE_FUND_TYPES':
            return { ...state, activefunds: action.payload};
        case 'SHOW_FUND_TYPE_MODAL':
            return { ...state, showModelForFundType: true };
        case 'CLOSE_FUND_TYPE_MODAL':
            return { ...state, showModelForFundType: false };
        case 'SELECT_FUND_TYPE':
            return { ...state, selectedFundType: action.payload, showModelForFundType: false };
        case 'SHOW_FUND_TYPE_TO_MODAL':
            return { ...state, showModelForFundTypeTo: true };
        case 'CLOSE_FUND_TYPE_TO_MODAL':
            return { ...state, showModelForFundTypeTo: false };
        case 'SELECT_FUND_TYPE_TO':
            return { ...state, selectedFundTypeTo: action.payload, showModelForFundTypeTo: false };
        case 'SUBMIT_SWITCH_FUND':
            return { ...state, loading: true };
        case 'SUBMIT_SWITCH_FUND_DONE':
            return { ...state, loading: false };
        case 'SHOW_CERTIFICATE_DIALOG':
            return { ...state, showCertificate: true };
        case 'CLOSE_CERTIFICATE_DIALOG':
            return { ...state, showCertificate: false };
        case 'SWITCH_FUND_REQUEST':
            return { ...state, switchRequest: action.payload };
        default:
            return state;
    }
};

export default profileSettingsReducer;
