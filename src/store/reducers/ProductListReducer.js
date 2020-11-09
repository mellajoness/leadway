const INITIAL_VALUES = {
    productList: [],
    loading: false,
    errorMessage: '',
    showModal: false,
    selectedProduct: {}
};

const productListReducer = (state = INITIAL_VALUES, action) => {

    switch(action.type) {
        case 'FETCH_PRODUCT_LIST':
            return { ...state, loading: true };
        case 'FETCH_PRODUCT_LIST_DONE':
            return { ...state, loading: false, productList: action.payload };
        case 'FETCH_PRODUCT_LIST_FAILED':
            return { ...state, loading: false, errorMessage: action.payload };
        case 'SHOW_PRODUCT_DETAILS': 
            return { ...state, showModal: true, selectedProduct: action.payload };
        case 'CLOSE_PRODUCT_DETAILS':
            return { ...state, showModal: false };
        case 'PRODUCT_LIST_FEEDBACK':
            return { ...state, loading: true };
        case 'PRODUCT_LIST_FEEDBACK_DONE':
            return { ...state, loading: false};
        case 'PRODUCT_LIST_FEEDBACK_FAILED':
            return { ...state, loading: false};
        default:
            return state;
    }
};

export default productListReducer;