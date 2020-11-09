const INITIAL_VALUES = {
    initialAmount: 0,
    monthlyContribution: 0,
    yearsToRetirement: 0,
    pensionReturn: 0,
    payAfterRetirement: 0,
    payPerMonthAfterRetirement: 0,
    noOfYearsToRetirement: 0,
    returnOnPension: 0,
    payPensionAfterRetirement: 0,
    showDisclaimer: true,
    retireCollection: 0,
    retireClosingRsa: 0,
    showRetireCollection: false,
    showMonthlyContribution: false,
    rsaRequired: 0,
    amountMonthlyContribution: 0,

};

const pensionCalculatorReducer = (state = INITIAL_VALUES, action) => {
    switch(action.type) {
        case 'UPDATE_VALUES':
            return { ...state, [action.payload.key]: action.payload.value };
        case 'CALCULATE_RETIRE_COLLECTION':
            return { ...state};
        case 'SHOW_DISCLAIMER_DIALOG':
            return { ...state, showDisclaimer: true };
        case 'RESET_CALC':
            return { ...state,
                initialAmount: 0,
                monthlyContribution: 0,
                yearsToRetirement: 0,
                pensionReturn: 0,
                payAfterRetirement: 0,
                payPerMonthAfterRetirement: 0,
                noOfYearsToRetirement: 0,
                returnOnPension: 0,
                payPensionAfterRetirement: 0,
                retireCollection: 0,
                retireClosingRsa: 0,
                showRetireCollection: false,
                showMonthlyContribution: false,
                rsaRequired: 0,
                amountMonthlyContribution: 0,
            };
        case 'CLOSE_DISCLAIMER_DIALOG':
            return { ...state, showDisclaimer: false };
        case 'RETIRE_COLLECTION':
            return { ...state, retireCollection: action.payload };
        case 'RETIRE_CLOSING_RSA':
            return { ...state, retireClosingRsa: action.payload };
        case 'CLOSE_RETIRE_COLLECTION_DIALOG':
            return { ...state, showRetireCollection: false };
        case 'RSA_REQUIRED':
            return { ...state, rsaRequired: action.payload };
        case 'AMOUNT_CONTRIBUTE_MONTHLY':
            return { ...state, amountMonthlyContribution: action.payload };
        case 'CLOSE_MONTHLY_CONTRIBUTION_DIALOG':
            return { ...state, showMonthlyContribution: false };
        case 'CONTRIBUTE_MONTHLY_RESULT':
            return { ...state, showMonthlyContribution: true};
        case 'RETIRE_COLLECTION_RESULT':
            return { ...state, showRetireCollection: true};
        default:
            return state;
    }
};

export default pensionCalculatorReducer;
