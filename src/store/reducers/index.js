import { combineReducers } from 'redux';
import loginReducer from './LoginReducer';
import userAuthReducer from './UserAuthReducer';
import productListReducer from './ProductListReducer';
import faqListReducer from './FaqReducer';
import branchListReducer from './BranchListReducer';
import benefitApplicationTypeReducer from './BenefitApplicationTypeReducer';
import benefitApplicationReducer from './BenefitApplicationReducer';
import documentsUploadReducer from './DocumentsUploadReducer';
import createPinReducer from './CreatePinReducer';
import otpScreenReducer from './OtpScreenReducer';
import accountReducer from './AccountReducer';
import transactionListReducer from './TransactionListReducer';
import dashboardReducer from './DashboardReducer';
import subscriptionReducer from './SubscriptionReducer';
import profileSettingsReducer from './ProfileSettingsReducer';
import pensionCalculatorReducer from './PensionCalculatorReducer';
import priceChartReducer from './PriceChartReducer';
import sectorReducer from './SectorReducer';
import messageReducer from './MessageReducer';

export default combineReducers({
    loginData: loginReducer,
    userAuthData: userAuthReducer,
    productListData: productListReducer,
    faqListData: faqListReducer,
    branchListData: branchListReducer,
    benefitApplicationTypeData: benefitApplicationTypeReducer,
    benefitApplicationData: benefitApplicationReducer,
    DocumentsUploadData: documentsUploadReducer,
    createPinData: createPinReducer,
    otpScreenData: otpScreenReducer,
    accountData: accountReducer,
    transactionListData: transactionListReducer,
    dashboardData: dashboardReducer,
    subscriptionListData: subscriptionReducer,
    profileSettingsData: profileSettingsReducer,
    pensionCalculatorData: pensionCalculatorReducer,
    priceChartData: priceChartReducer,
    sectorData: sectorReducer,
    messageData: messageReducer
});