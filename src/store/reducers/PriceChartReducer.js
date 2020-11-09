const INITIAL_VALUES = {
    loading: false,
    selectedFundType: '',
    selectedFundCategory: '',
    selectedDuration: '',
    selectedChartType: '',
    showModalForFundType: false,
    showModalForFundCategory: false,
    showModalForDuration: false,
    showModalForChartType: false,
    priceChartXData: [],
    priceChartYData: [],
};

const priceChartReducer = (state = INITIAL_VALUES, action) => {
    switch(action.type) {
        case 'UPDATE_VALUES':
            return { ...state, [action.payload.key]: action.payload.value };
        case 'FETCH_PRICE_CHART':
            return { ...state, loading: true };
        case 'FETCH_PRICE_CHART_X_DONE':
            return { ...state, loading: false, priceChartXData: action.payload };
        case 'FETCH_PRICE_CHART_Y_DONE':
            return { ...state, loading: false, priceChartYData: action.payload };
        case 'FETCH_PRICE_CHART_FAILED':
            return { ...state, loading: false, errorMessage: action.payload };
        case 'SHOW_FUND_TYPE_MODAL':
            return { ...state, showModalForFundType: true };
        case 'CLOSE_FUND_TYPE_MODAL':
            return { ...state, showModalForFundType: false };
        case 'SELECT_FUND_TYPE':
            return { ...state, selectedFundType: action.payload, showModalForFundType: false };
        case 'SHOW_FUND_CATEGORY_MODAL':
            return { ...state, showModalForFundCategory: true };
        case 'CLOSE_FUND_CATEGORY_MODAL':
            return { ...state, showModalForFundCategory: false };
        case 'SELECT_FUND_CATEGORY':
            return { ...state, selectedFundCategory: action.payload, showModalForFundCategory: false };
        case 'SHOW_DURATION_MODAL':
            return { ...state, showModalForDuration: true };
        case 'CLOSE_DURATION_MODAL':
            return { ...state, showModalForDuration: false };
        case 'SELECT_DURATION':
            return { ...state, selectedDuration: action.payload, showModalForDuration: false };
        case 'SHOW_CHART_TYPE_MODAL':
            return { ...state, showModalForChartType: true };
        case 'CLOSE_CHART_TYPE_MODAL':
            return { ...state, showModalForChartType: false };
        case 'SELECT_CHART_TYPE':
            return { ...state, selectedChartType: action.payload, showModalForChartType: false };
        default:
            return state;
    }
};

export default priceChartReducer;
