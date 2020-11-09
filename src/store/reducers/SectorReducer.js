const INITIAL_VALUES = {
    selectedSector: null,
    requiredDocuments: [],
    requiredDocumentsData: [],
    loading: false,
    publicSectorList: [],
    privateSectorList: [],
};

const sectorReducer = (state = INITIAL_VALUES, action) => {
    switch(action.type) {
        case 'SELECT_SECTOR':
            return { ...state, loading: false, selectedSector: action.payload };
        case 'SELECT_SECTOR_DOCUMENT':
            return { ...state, loading: false, requiredDocuments: [...action.payload] };
        case 'SECTOR_REQUIRED_DOCUMENT_DATA':
            return { ...state, loading: false, requiredDocumentsData: action.payload };
        case 'SUBMIT_SECTOR_DOCUMENT':
            return { ...state, loading: true };
        case 'SUBMIT_SECTOR_DOCUMENT_DONE':
            return { ...state, loading: false };
        case 'FETCH_SECTORS':
            return { ...state, loading: true };
        case 'FETCH_PUBLIC_SECTOR_LIST':
            return { ...state, loading: false, publicSectorList: action.payload };
        case 'FETCH_PRIVATE_SECTOR_LIST':
            return { ...state, loading: false, privateSectorList: action.payload };
        case 'RESET_DOCUMENTS':
            return INITIAL_VALUES;
        default:
            return state;
    }
};

export default sectorReducer;
