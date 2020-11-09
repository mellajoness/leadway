import { LOGGER } from "../../shared/Methods";
import {lga} from "../../assets/lga";

const LGData = lga;

export const fetchLGList = (stateoforigin) => {

    return async (dispatch) => {
        const localGovenments = [];
        for (const item of LGData) {
            if(item.value === stateoforigin)
            {
                localGovenments.push(item.label);
            }
        }

        if (localGovenments.length < 1) {
            for (const item of LGData) {
                localGovenments.push(item.label);
            }
        }
        dispatch({ type: 'FETCH_LG_LIST', payload: localGovenments });
    };
};

export const selectLocalGovernment = (selectedLocalGovernment) => {
    return {
        type: 'SELECT_LOCAL_GOVERNMENT',
        payload: selectedLocalGovernment
    };
};
