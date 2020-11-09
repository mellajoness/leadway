import {LOGGER} from "../../shared/Methods";

export const updatePensionCalculatorValues = (key, value) => {
    return {
        type: 'UPDATE_VALUES',
        payload: { key, value }
    };
};

Number.prototype.format = function(n, x) {
    const re = '(\\d)(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$1,');
};

export const calculateMonthlyContribution = (payPerMonthAfterRetirement, noOfYearsToRetirement, returnOnPension,
                                             payPensionAfterRetirement) => {
    return async (dispatch) => {

        dispatch({ type: 'CALCULATE_MONTHLY_CONTRIBUTION', payload: null });

        const years = 12;
        const contrmonth = noOfYearsToRetirement * 12;
        const rtt = returnOnPension / 100;
        const ratereturn = rtt / 12;
        // const tpensure = payPensionAfterRetirement * 12;
        const ratereturn1 = 1 + ratereturn;
        const bigC = payPerMonthAfterRetirement * ((1 / ratereturn) - (1 / (ratereturn * Math.pow(ratereturn1, years))));

        const rtt1 = 1 + rtt;
        const fv = bigC * ((1 / rtt) - (1 / (rtt * Math.pow(rtt1, payPensionAfterRetirement))));

        const pmt = fv / ((Math.pow(ratereturn1, contrmonth) - 1) / ratereturn);



        dispatch({ type: 'RSA_REQUIRED', payload: fv.format(2) });
        dispatch({ type: 'AMOUNT_CONTRIBUTE_MONTHLY', payload: pmt.format(2) });

        dispatch({ type: 'CONTRIBUTE_MONTHLY_RESULT', payload: null });
    };
};

export const calculateRetireCollection = (initialAmount, monthlyContribution, yearsToRetirement, pensionReturn,
                                          payAfterRetirement) => {
    return async (dispatch) => {

        dispatch({ type: 'CALCULATE_RETIRE_COLLECTION', payload: null });

        const smallt = 1;
        const N = yearsToRetirement * 12;
        const rtt1 = pensionReturn / 100;
        const rateret2 = rtt1 / 12;
        const rateret2_1 = 1 + rateret2;
        const ans = (1 / rateret2) - (1 / (rateret2 * Math.pow(rateret2_1, smallt)));
        const fv1 = (initialAmount * Math.pow(rateret2_1, N)) + (monthlyContribution * ((Math.pow(rateret2_1, N) - 1) / rateret2));
        const rtt1_1 = 1 + rtt1;
        const C1 = fv1 / ((1 / rtt1) - (1 / (rtt1 * Math.pow(rtt1_1, payAfterRetirement))));
        const tc = C1 / ans;
        const contr = tc / 12;

        const fv = Number(parseFloat(fv1).toFixed(2)).toLocaleString('en');
        const cont = Number(parseFloat(contr).toFixed(2)).toLocaleString('en');

        dispatch({ type: 'RETIRE_CLOSING_RSA', payload: fv1.format(2) });
        dispatch({ type: 'RETIRE_COLLECTION', payload: contr.format(2) });

        dispatch({ type: 'RETIRE_COLLECTION_RESULT', payload: null });
    };
};

export const resetCalcFields = () => {
    return {
        type: 'RESET_CALC',
        payload: null
    };
};

export const showDisclaimerDialog = () => {
    return {
        type: 'SHOW_DISCLAIMER_DIALOG',
        payload: null
    };
};

export const closeDisclaimerDialog = () => {
    return {
        type: 'CLOSE_DISCLAIMER_DIALOG',
        payload: null
    };
};

export const closeRetireCollectionDialog = () => {
    return {
        type: 'CLOSE_RETIRE_COLLECTION_DIALOG',
        payload: null
    };
};

export const closeMonthlyContributionDialog = () => {
    return {
        type: 'CLOSE_MONTHLY_CONTRIBUTION_DIALOG',
        payload: null
    };
};