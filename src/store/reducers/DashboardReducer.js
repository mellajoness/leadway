const INITITAL_VALUES = {
    fundTypes: [],
    fundedData: [],
    selectedFund: ''
};

const dashboardReducer = (state = INITITAL_VALUES, action) => {
    switch(action.type) {
        case 'ACTIVE_FUND_TYPES':
            return { ...state, fundTypes: action.payload, selectedFund: action.payload[0].FundTitle };
        case 'FUNDED_FUND_TYPES':
            return { ...state, fundedData: action.payload, selectedFund: action.payload[0].FundTitle };
        case 'SELECTED_FUND':
            return { ...state, selectedFund: action.payload };
        default:
            return state;
    }
};

export default dashboardReducer;
