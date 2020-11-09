import {selectFundType} from "../actions";

const INITIAL_VALUES = {
    detailedAccount: {},
    summaryAccount: [],
    transactionList: [],
    loading: false,
    errorMessage: '',
    totalUnits: '',
    unitPriceDate: '',
    unitPrice: '',
    lastCreditedDate: '',
    totalContribution: '',
    contributionValue: '',
    investmentIncome: '',
    avcUnits: '',
    avcValue: '',
    showModal: false,
    selectedTransaction: {},
    endDate: '',
    startDate: '',
    selectedFundType: '',
    defaultSelectedTransaction: '',
};

export const accountReducer = (state = INITIAL_VALUES, action) => {

    switch(action.type){
        case 'UPDATE_VALUES':
            return { ...state, [action.payload.key]: action.payload.value };
        case 'ACCOUNT_DATA':
            return { ...state, loading: true };
        case 'DETAILED_ACCOUNT':
            return {
                ...state, loading: false, detailedAccount: action.payload,
                avcUnits: action.payload.funds_account_details.summaryField.avcunitField,
                totalUnits: action.payload.funds_account_details.summaryField.totalunitsField,
                avcValue: action.payload.funds_account_details.summaryField.valueonavcField,
                transactionList: action.payload.funds_account_details.transactionsField,
            };
        case 'SUMMARY_ACCOUNT':
            return { 
                ...state, summaryAccount: action.payload,
                unitPriceDate: action.payload[0].unitpricedateField,
                contributionValue: action.payload[0].valueofcontributionField,
                unitPrice: action.payload[0].unitpriceField,
                lastCreditedDate: action.payload[0].lastvaluedateField,
                investmentIncome: action.payload[0].investmentincomeField,
                totalContribution: action.payload[0].totalamountcontributedField
            };
        case 'GET_ACCOUNT_FAILED':
            return { ...state, loading: false, errorMessage: action.payload };
        case 'SHOW_TRANSACTION_MODAL':
            return { ...state, showModal: true, selectedTransaction: action.payload };
        case 'CLOSE_TRANSACTION_MODAL':
            return { ...state, showModal: false };
        case 'SELECT_FUND_TYPE':
            return { ...state, selectedFundType: action.payload};
        case 'SELECT_DEFAULT_FUND_TYPE':
            return { ...state, defaultSelectedTransaction: action.payload };
        case 'RESET_DETAILED_ACCOUNT':
            return { ...state,
                loading: false,
                detailedAccount: {},
                avcUnits: '',
                totalUnits: '',
                avcValue: '',
                transactionList: []
            };
        case 'RESET_DATE_FIELDS':
            return { ...state,
                startDate: '',
                endDate: ''
            };
        default:
            return state;
    }
};

export default accountReducer;
