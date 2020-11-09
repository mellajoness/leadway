import {SERVER_REQUEST, CHART_API} from "../../shared/Backend";
import {DEVICE_ID, LOGGER} from "../../shared/Methods";
import {ResponseModel} from "../../shared/ResponseModel";

export const updatePriceChartValues = (key, value) => {
    return {
        type: 'UPDATE_VALUES',
        payload: {key, value}
    };
};

export const fetchChartData = (body, navigation) => {
    return async (dispatch) => {

        const fund1 = body['fundCategory']['fund1'];
        const fund2 = body['fundCategory']['fund2'];
        const fund3 = body['fundCategory']['fund3'];
        const fund4 = body['fundCategory']['fund4'];

        const duration = body['duration'];

        const request = {
            fund1: fund1,
            fund2: fund2,
            fund3: fund3,
            fund4: fund4,
            duration: duration,
            mobileId: DEVICE_ID()
        };

        LOGGER('request', request)

        dispatch({type: 'FETCH_PRICE_CHART', payload: true});

        try {
            const res = await SERVER_REQUEST(request, CHART_API, 'POST');
            const response = new ResponseModel(res);

            if (response.StatusCode === '00') {
                let chartXData = [];
                let chartYData = [];
                response.Data.Datelabels.map((data, id) => {
                    const value = response.Data.values[id];
                    // const d = {x: data, y: value};

                    chartXData.push(data);
                    chartYData.push(value);
                });

                dispatch({type: 'FETCH_PRICE_CHART_X_DONE', payload: chartXData});
                dispatch({type: 'FETCH_PRICE_CHART_Y_DONE', payload: chartYData});
                navigation.navigate('Chart');
            } else {
                dispatch({type: 'FETCH_PRICE_CHART_FAILED', payload: response.Message});
            }
        } catch (error) {
            dispatch({type: 'FETCH_PRICE_CHART_FAILED', payload: error.message});
        }
    };
};

// Fund Type
export const showFundTypeModal = () => {
    return {
        type: 'SHOW_FUND_TYPE_MODAL',
        payload: null
    };
};

export const closeFundTypeModal = () => {
    return {
        type: 'CLOSE_FUND_TYPE_MODAL',
        payload: null
    };
};

export const selectFundType = (selectedFundType) => {
    return {
        type: 'SELECT_FUND_TYPE',
        payload: selectedFundType
    };
};

// Fund Category
export const showFundCategoryModal = () => {
    return {
        type: 'SHOW_FUND_CATEGORY_MODAL',
        payload: null
    };
};

export const closeFundCategoryModal = () => {
    return {
        type: 'CLOSE_FUND_CATEGORY_MODAL',
        payload: null
    };
};

export const selectFundCategory = (selectedFundCategory) => {
    return {
        type: 'SELECT_FUND_CATEGORY',
        payload: selectedFundCategory
    };
};

// Duration
export const showDurationModal = () => {
    return {
        type: 'SHOW_DURATION_MODAL',
        payload: null
    };
};

export const closeDurationModal = () => {
    return {
        type: 'CLOSE_DURATION_MODAL',
        payload: null
    };
};

export const selectDuration = (selectedDuration) => {
    return {
        type: 'SELECT_DURATION',
        payload: selectedDuration
    };
};

// Chart Type
export const showChartTypeModal = () => {
    return {
        type: 'SHOW_CHART_TYPE_MODAL',
        payload: null
    };
};

export const closeChartTypeModal = () => {
    return {
        type: 'CLOSE_CHART_TYPE_MODAL',
        payload: null
    };
};

export const selectChartType = (selectedChartType) => {
    return {
        type: 'SELECT_CHART_TYPE',
        payload: selectedChartType
    };
};
