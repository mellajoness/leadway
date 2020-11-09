const INITIAL_VALUES = {
    designation: '',
    department: '',
    bankAccountName: '',
    bankAccountNumber: '',
    bvn: '',
    withdrawalAmount: '',
    loading: false,
    taxNum: '',
    // dob: '',
    reason: '',
    // dateOfDisengagement: '',
    errorMessage: '',
    bankList: [],
    bankBranchList: [],
    requiredDocuments: [],
    requiredDocumentsData: [],
    benefitTypeList: [],
    selectedBank: '',
    selectedBenefitType: null,
    selectedBenefitTypeName: '',
    selectedBankId: null,
    selectedBankBranchId: null,
    selectedBankBranch: '',
    selectedDocument: [],
    showModal: false,
    showModalForReason: false,
    showModalForImageCategory: false,
    documentUploadRequest: {},
    documentItem: '',
    documentIndex: 0,
    // paymentType: 0,
};

const benefitApplicationReducer = (state = INITIAL_VALUES, action) => {
    switch(action.type) {
        case 'UPDATE_VALUES':
            return { ...state, [action.payload.key]: action.payload.value };
        case 'BENEFIT_APPLICATION':
            return { ...state, loading: true };
        case 'RESET_FIELDS':
            return { ...state,
                designation: '',
                department: '',
                bankAccountName: '',
                bankAccountNumber: '',
                bvn: '',
                withdrawalAmount: '',
                taxNum: '',
                reason: '',
                bankList: [],
                bankBranchList: [],
                requiredDocumentsData: [],
                selectedBank: '',
                selectedBankId: null,
                selectedBankBranch: '',
                showModal: false,
                showModalForReason: false,
                showModalForImageCategory: false,
                loading: false,
            };
        case 'RESET_DOCUMENTS':
            return { ...state,
                // documentUploadRequest: {},
                selectedDocument: [],
                requiredDocumentsData: [],
            };
        case 'BENEFIT_APPLICATION_DONE':
            return { ...state, loading: false };
        case 'BENEFIT_APPLICATION_FAILED':
            return { ...state, loading: false, errorMessage: action.payload };
        case 'SHOW_BANK_MODAL':
            return { ...state, showModal: true };
        case 'CLOSE_BANK_MODAL':
            return { ...state, showModal: false };
        case 'FETCH_BANK_LIST':
            return { ...state, loading: true };
        case 'FETCH_BANK_LIST_DONE':
            return { ...state, loading: false, bankList: action.payload };
        case 'FETCH_BANK_LIST_FAILED':
            return { ...state, loading: false, errorMessage: action.payload };
        case 'FETCH_REQUIRED_DOCUMENT':
            return { ...state, loading: true };
        case 'FETCH_REQUIRED_DOCUMENT_DONE':
            return { ...state, loading: false, requiredDocuments: action.payload };
        case 'FETCH_REQUIRED_DOCUMENT_FAILED':
            return { ...state, loading: false, errorMessage: action.payload };
        case 'FETCH_PAYMENT_TYPE':
            return { ...state, loading: true };
        case 'FETCH_PAYMENT_TYPE_DONE':
            return { ...state, loading: false, benefitTypeList: action.payload };
        case 'FETCH_PAYMENT_TYPE_FAILED':
            return { ...state, loading: false, errorMessage: action.payload };
        case 'SELECT_BANK_NAME':
            return { ...state, selectedBank: action.payload };
        case 'SELECT_BANK_ID':
            return { ...state, selectedBankId: action.payload };
        case 'SELECT_BANK_BRANCH_ID':
            return { ...state, selectedBankBranchId: action.payload };
        case 'FETCH_BANK_BRANCH_LIST':
            return { ...state, loading: true };
        case 'FETCH_BANK_BRANCH_LIST_DONE':
            return { ...state, loading: false, bankBranchList: action.payload };
        case 'SELECT_BANK_BRANCH_NAME':
            return { ...state, selectedBankBranch: action.payload };
        case 'FETCH_BANK_BRANCH_LIST_FAILED':
            return { ...state, loading: false, errorMessage: action.payload };
        case 'SELECT_BENEFIT_TYPE':
            return { ...state, selectedBenefitType: action.payload };
        case 'SELECT_BENEFIT_TYPE_NAME':
            return { ...state, selectedBenefitTypeName: action.payload };
        case 'SELECT_BENEFIT_DOCUMENT':
            return { ...state, requiredDocuments: [...action.payload] };
        case 'SELECTED_BENEFIT_DOCUMENT_UPLOAD':
            return { ...state,
                documentItem: action.payload.item,
                documentIndex: action.payload.index, };
        case 'BENEFIT_REQUIRED_DOCUMENT_DATA':
            return { ...state, requiredDocumentsData: action.payload };
        case 'SHOW_REASON_MODAL':
            return { ...state, showModalForReason: true };
        case 'CLOSE_REASON_MODAL':
            return { ...state, showModalForReason: false };
        case 'SHOW_IMAGE_CATEGORY_MODAL':
            return { ...state, showModalForImageCategory: true };
        case 'CLOSE_IMAGE_CATEGORY_MODAL':
            return { ...state, showModalForImageCategory: false };
        case 'SELECT_REASON':
            return { ...state, reason: action.payload, showModalForReason: false };
        case 'DOCUMENT_UPLOAD_REQUEST':
            return { ...state, documentUploadRequest: action.payload};
        // case 'SELECT_PAYMENT_TYPE':
        //     return { ...state, paymentType: action.payload };
        default:
            return state;
    }
};

export default benefitApplicationReducer;
