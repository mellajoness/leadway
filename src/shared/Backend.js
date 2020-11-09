import {LOGGER} from "./Methods";

// TEST BASE URL
// const baseUrl = 'https://mapps.leadway-pensure.com/LeadwayMobileApplicationNewUATMultiFund/PensureMobile/';

// LIVE BASE URL
const baseUrl = 'https://mapps.leadway-pensure.com/LeadwayMobileApplicationWebAPI/PensureMobile/';

export const REGISTER_USER_API = 'RegisterUser';
export const LOGIN_USER_API = 'LoginUser';
export const VALIDATE_USER_API = 'ValidateUser';
export const VALIDATE_OTP_API = 'ValidateOTP'
export const CHART_API = 'Chart';
export const QUICK_CLIENT_INFO_API = 'QuickClientInfo';
export const PREFERENCE_SETUP_API = 'PreferenceSetup';
export const FULL_CLIENT_DETAILS_API = 'FullClientDetails';
export const BIOMETRICS_API = 'Biometrics';
export const DETAILED_ACCOUNT_STATEMENT_API = 'DetailedAccountStatement';
export const SUMMARY_ACCOUNT_STATEMENT_API = 'SummaryAccountStatement';
export const FAQ_API = 'FAQQuestionsAndAnswer';
export const FEEDBACK_API = 'Feedback';
export const PRODUCT_LIST_API = 'ProductList';
export const GET_SURVEY_QUESTIONS_API = 'GetSurveyQuestions';
export const MAIL_ACCOUNT_DETAILS_API = 'MailAccountDetails';
export const MAIL_ACCOUNT_SUMMARY_API = 'MailAccountSummary';
export const CHANGE_PERSONAL_DETAILS_API = 'ChangePersonalDetails';
export const CHANGE_EMPLOYER_DETAILS_API = 'ChangeEmployer';
export const SURVEY_QUESTIONS_API = 'SurveyQuestions';
export const SUBMIT_SURVEY_API = 'submitSurvey';
export const LIST_BRANCH_DETAILS_API = 'ListOfBranchDetails';
export const UPDATE_PREFERENCE_API = 'updatePrefrence';
export const FETCH_PREFERENCE_API = 'PreferenceSetup';
export const NEW_NOTIFICATION_API = 'GetNewNotification';
export const PERSONAL_NOTIFICATION_API = 'GetPersonalNotification';
export const GET_DEVICE_API = 'GetDevice';
export const VALIDATE_REGISTER_USER_API = 'ValidateRegisteredUser';
export const CHANGE_PASSWORD_API = 'ChangePassword';
export const FORGOT_MOBILE_PIN_API = 'ForgotMobilePin';
export const BENEFIT_APPLICATION_TYPE_API = 'BenefitApplicationType';
export const GET_BANKS_API = 'GetBanks';
export const GET_BANK_BRANCHES_API = 'GetBankBranches?bankId=';
export const SUBMIT_BENEFIT_APPLICATION_API = 'SubmitBenefitApplication';
export const SUBMIT_NEW_BENEFIT_APPLICATION_API = 'SubmitNewBenefitApplication';
export const GET_EXIT_REASONS_API = 'GetExitReasons';
export const BENEFIT_REQUIRED_DOCUMENT_API = 'BenfitRequiredDocument';
export const SECTOR_REQUIRED_DOCUMENT_API = 'SectorDocumentUpdate';
export const FUND_SWITCH_API = 'FundSwitch';
export const SATISFACTION_RATING_API = 'SatisfactionRating';

const base64 = require('base-64');

export const SERVER_REQUEST = async (body, endpoint, reqType) => {
    let response;
    const _headers = await GET_HEADER();
    const url = `${baseUrl}${endpoint}`;

    const FETCH_TIMEOUT = 120000;
    let didTimeOut = false;

    return new Promise(async (resolve, reject) => {
        const timeout = setTimeout(function() {
            didTimeOut = true;
            reject(new Error('Request timed out'));
        }, FETCH_TIMEOUT);

        if (reqType.toLowerCase() === 'get') {
            response = await fetch(url, {
                method: reqType.toUpperCase(),
                headers: _headers
            });
        } else {
            LOGGER('JSON Stringify', JSON.stringify(body))
            response = await fetch(url, {
                method: reqType.toUpperCase(),
                headers: _headers,
                body: JSON.stringify(body)
            });
        }

        clearTimeout(timeout);
        if(!didTimeOut) {
            console.log(response);
            const res = await response.json();

            resolve(res);
        }
    });
    // return res;
}

const GET_HEADER = async () => {
    return new Headers({
        'Content-Type': 'application/json',
        AppKey: appKeyHeader(),
        AppVersion: '3.1.0'
    });
};

const appKeyHeader = () => {
    let date = new Date();
    var month = (date.getMonth() < 9) ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString();
    var day = (date.getDate() < 10) ? '0' + date.getDate().toString() : date.getDate().toString();
    var minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes().toString() : date.getMinutes().toString();
    var seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds().toString() : date.getSeconds().toString();

    let currentDate = day + '-' + month + '-' + date.getFullYear().toString();
    let currentTime = date.getHours().toString() + ':' + minutes + ':' + seconds;
    console.log(`c457864y95tcy458tu98tcrtcer9mth9|${currentDate}${currentTime}`);
    // console.log(`12345|${currentDate}${currentTime}`);

    // return base64.encode(`12345|${currentDate}${currentTime}`);
    return base64.encode(`c457864y95tcy458tu98tcrtcer9mth9|${currentDate}${currentTime}`);
}
