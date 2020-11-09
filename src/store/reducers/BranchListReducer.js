const INITIAL_VALUES = {
    branchList: [],
    loader: false,
    errorMessage: '',
    showModal: false,
    selectedBranch: {}
};

const branchListReducer = (state = INITIAL_VALUES, action) => {

    switch(action.type) {
        case 'FETCH_BRANCH_LIST':
            return { ...state, loader: true };
        case 'FETCH_BRANCH_LIST_DONE':
            return { ...state, loader: false, branchList: action.payload };
        case 'FETCH_BRANCH_LIST_FAILED':
            return { ...state, loader: false, errorMessage: action.payload };
        case 'SHOW_BRANCH_MODAL':
            return { ...state, showModal: true, selectedBranch: action.payload };
        case 'CLOSE_BRANCH_MODAL':
            return { ...state, showModal: false };
        default:
            return state;
    };
};

export default branchListReducer;