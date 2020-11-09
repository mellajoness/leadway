import {createDrawerNavigator, createStackNavigator, createAppContainer} from "react-navigation";
import ProductScreen from "./ProductList";
import SWitchFundScreen from "./profiles/SwitchFund";
import DrawerComponent from "./Drawer";
import OtpScreen from "./common/OtpScreen";
import DashboardScreen from "./accounts/Dashboard";
import TransactionScreen from "./accounts/TransactionList";
import SummaryScreen from "./accounts/Summary";
import SearchTransactionScreen from "./accounts/SearchTransaction";
import AccountScreen from "./accounts/Account";
import ApplyScreen from "./benefit/Apply";
import BenefitFormScreen from "./benefit/BenefitForm";
import DocumentUploadScreen from "./benefit/DocumentsUpload";
import BankScreen from "./benefit/BankList";
import BankBranchScreen from "./benefit/BankBranchList";
import SectorScreen from "./sector/Sector";
import RequiredSectorScreen from "./sector/RequiredSectorDocuments";
import MessageScreen from "./message/Message";
import MessageDetailScreen from "./message/MessageDetail";
import ProfileScreen from "./profiles/Profile";
import ProfileSettingScreen from "./profiles/ProfileSetting";
import SubscriptionScreen from "./profiles/Subscription";
import ChangeMobilePinScreen from "./profiles/ChangeMobilePin";
import ChangeEmployerDetailsScreen from "./profiles/ChangeEmployerDetails";
import ChangePersonalDetailsScreen from "./profiles/ChangePersonalDetails";
import SurveyScreen from "./Survey";
import LGScreen from "./profiles/LocalGovenmentList";
import PensionCalculatorScreen from "./calculator/PensionCalculator";
import CalculatorScreen from "./calculator/Calculator";
import MonthlyContributionScreen from "./calculator/MonthlyContribution";
import RetireCollectionScreen from "./calculator/RetireCollection";
import PriceChartScreen from "./chart/PriceChart";
import ChartScreen from "./chart/Chart";
import MoreScreen from "./more/More";
import FaqScreen from "./FAQ";
import BranchesScreen from "./Branches";
import CreatePinScreen from "./common/CreatePin";
import SigScreen from './Sign';


const AccountRoute = createStackNavigator({
    Dashboard: DashboardScreen,
    Transaction: TransactionScreen,
    Summary: SummaryScreen,
    SearchTransaction: SearchTransactionScreen,
    Account: AccountScreen,
}, {
    initialRouteName: 'Dashboard',
    headerMode: 'none'
});

const BenefitRoute = createStackNavigator({
    Apply: ApplyScreen,
    BenefitForm: BenefitFormScreen,
    DocumentUpload: DocumentUploadScreen,
    Bank: BankScreen,
    BankBranch: BankBranchScreen,
    Otp: OtpScreen,
}, {
    initialRouteName: 'Apply',
    headerMode: 'none'
});

const SectorRoute = createStackNavigator({
    Sectr: SectorScreen,
    RequiredSectorDocuments: RequiredSectorScreen
}, {
    initialRouteName: 'Sectr',
    headerMode: 'none'
});

const MessageRoute = createStackNavigator({
    Message: MessageScreen,
    MessageDetail: MessageDetailScreen,
}, {
    initialRouteName: 'Message',
    headerMode: 'none'
});

const SettingsRoute = createStackNavigator({
    Profile: ProfileScreen,
    ProfileSetting: ProfileSettingScreen,
    Subscription: SubscriptionScreen,
    ChangeMobilePin: ChangeMobilePinScreen,
    ChangeEmployerDetails: ChangeEmployerDetailsScreen,
    ChangePersonalDetails: ChangePersonalDetailsScreen,
    LocalGovernment: LGScreen,
    Otp: OtpScreen,
    CreatePin: CreatePinScreen
}, {
    initialRouteName: 'ProfileSetting',
    headerMode: 'none'
});

const PensionCalculatorRoute = createStackNavigator({
    PensionCalculator: PensionCalculatorScreen,
    MonthlyContribution: MonthlyContributionScreen,
    RetireCollection: RetireCollectionScreen,
    Calculator: CalculatorScreen,
}, {
    initialRouteName: 'Calculator',
    headerMode: 'none'
});

const PriceChartRoute = createStackNavigator({
    PriceChartScreen: PriceChartScreen,
    Chart: ChartScreen,
}, {
    initialRouteName: 'PriceChartScreen',
    headerMode: 'none'
});

const MoreRoute = createStackNavigator({
    More: MoreScreen,
    PChart: PriceChartRoute,
    FAQs: FaqScreen,
    Branches: BranchesScreen,
    Sector: SectorRoute,
    Survey: SurveyScreen,
}, {
    initialRouteName: 'More',
    headerMode: 'none'
});

const SwitchFundRoute = createStackNavigator({
    SwitchFund: SWitchFundScreen,
    Sig: SigScreen,
    Otp: OtpScreen,
}, {
    initialRouteName: 'SwitchFund',
    headerMode: 'none'
});

const DrawerRoute = createDrawerNavigator({
    Account:  AccountRoute,
    Benefit: BenefitRoute,
    Products: ProductScreen,
    UserProfile: SettingsRoute,
    PenCalculator: PensionCalculatorRoute,
    Message: MessageRoute,
    More: MoreRoute,
    SwitchFund: SwitchFundRoute
}, {
    initialRouteName: 'Account',
    contentComponent: DrawerComponent,
    navigationOptions: {
        gestureDirection: 'inverted'
    }
});

export default createAppContainer(DrawerRoute);
