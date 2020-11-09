import React, {Component} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {CONTAINER_STYLE} from '../../shared/Styles';
import {CommonHeader, CustomLoader, RegularText} from '../../components';
import {LIGHT_COLOR} from '../../shared/Colors';
import {List} from 'react-native-paper';
import {connect} from 'react-redux';
import {
    detailedAccountData,
    fetchUserProfile,
    selectAccountFundType,
    selectDefaultAccountFundType,
    summaryAccountData
} from '../../store/actions'
import DashboardCarousel from '../../components/DashboardCarousel';
import {LOGGER} from "../../shared/Methods";

class Dashboard extends Component {

    state = {
        fundIDD: '',
    };

    async componentDidMount() {
        await this.props.summaryAccountData(this.props.fundedData[0].FundID);
        await this.props.detailedAccountData(this.props.fundedData[0].FundID, '', '');

        this.setState({fundIDD: this.props.fundedData[0].FundID});

        let selectedFundType;
        if (this.props.fundedData[0].FundID === 4)
            selectedFundType = "Retiree Fund " + this.props.fundedData[0].FundID;
        else
            selectedFundType = "RSA Fund " + this.props.fundedData[0].FundID;

        await this.props.selectAccountFundType(selectedFundType);
        await this.props.selectDefaultAccountFundType(selectedFundType);

        await this.props.fetchUserProfile({});
    }

    async _onScroll(val) {
        try {
            await this.props.summaryAccountData(this.props.fundedData[val].FundID);
            await this.props.detailedAccountData(this.props.fundedData[val].FundID, '', '');

            this.setState({fundIDD: this.props.fundedData[val].FundID});

            let selectedFundType;
            if (this.props.fundedData[val].FundID === 4)
                selectedFundType = "Retiree Fund " + this.props.fundedData[val].FundID;
            else
                selectedFundType = "RSA Fund " + this.props.fundedData[val].FundID;

            await this.props.selectAccountFundType(selectedFundType);
            await this.props.selectDefaultAccountFundType(selectedFundType);
        } catch (e) {
            LOGGER('error', e.toString())
        }
    }

    render() {
        const {
            loading, selectedFund, fundedData,
            totalUnits, unitPriceDate,
            unitPrice, lastCreditedDate,
            totalContribution, contributionValue,
            investmentIncome, avcUnits, avcValue
        } = this.props;

        const selectedFundName = selectedFund.substring(0, selectedFund.indexOf(" ("));

        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={CONTAINER_STYLE}>

                    <CommonHeader title='Accounts'
                                  menuButtonPress={() => this.props.navigation.openDrawer()}
                                  rightIcon='notifications-none'
                                  rightActionPress={() => this.props.navigation.navigate("Message")}
                    />

                    <View style={{flex: 1}}>
                        <View style={{paddingVertical: 20}}>
                            <DashboardCarousel
                                items={fundedData}
                                selectedFund={selectedFundName}
                                selectedFundCategory={"Fund " + this.state.fundIDD}
                                contributionValue={contributionValue}
                                onScroll={(ev) => this._onScroll(ev)}
                                onPress={() => this.props.navigation.navigate('Account')}
                            />
                        </View>

                        <ScrollView style={{flex: 1}}>
                            <List.Item
                                title={<RegularText label='Total Units' size={14}/>}
                                description={totalUnits}
                                descriptionStyle={{fontFamily: 'Lato-Bold'}}
                                style={{backgroundColor: LIGHT_COLOR}}
                            />

                            <List.Item
                                title={<RegularText label='Unit Price Date' size={14}/>}
                                description={unitPriceDate}
                                descriptionStyle={{fontFamily: 'Lato-Bold'}}
                            />

                            <List.Item
                                title={<RegularText label='Unit Price' size={14}/>}
                                description={`₦${unitPrice}`}
                                descriptionStyle={{fontFamily: 'Lato-Bold'}}
                                style={{backgroundColor: LIGHT_COLOR}}
                            />

                            <List.Item
                                title={<RegularText label='Last Credited Date' size={14}/>}
                                description={lastCreditedDate}
                                descriptionStyle={{fontFamily: 'Lato-Bold'}}
                            />

                            <List.Item
                                title={<RegularText label='Total Contribution' size={14}/>}
                                description={`₦${totalContribution}`}
                                descriptionStyle={{fontFamily: 'Lato-Bold'}}
                                style={{backgroundColor: LIGHT_COLOR}}
                            />

                            <List.Item
                                title={<RegularText label='Investment Income' size={14}/>}
                                description={`₦${investmentIncome}`}
                                descriptionStyle={{fontFamily: 'Lato-Bold'}}
                            />

                            <List.Item
                                title={<RegularText label='Total AVC Units' size={14}/>}
                                description={avcUnits}
                                descriptionStyle={{fontFamily: 'Lato-Bold'}}
                                style={{backgroundColor: LIGHT_COLOR}}
                            />

                            <List.Item
                                title={<RegularText label='AVC Value' size={14}/>}
                                description={avcValue}
                                descriptionStyle={{fontFamily: 'Lato-Bold'}}
                            />
                        </ScrollView>

                        {/*<View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>*/}
                        {/*<LinearGradient style={[styles.linearButton, {marginRight: 5}]} start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={GRADIENT_COLOR}>*/}
                        {/*<TouchableOpacity style={styles.selectedButton} onPress={() => this.props.navigation.navigate('Summary')}>*/}
                        {/*<RegularText label='Summary' color='white' size={14} />*/}
                        {/*</TouchableOpacity>*/}
                        {/*</LinearGradient>*/}

                        {/*<LinearGradient style={[styles.linearButton, {marginLeft: 5}]} start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={GRADIENT_COLOR}>*/}
                        {/*<TouchableOpacity style={styles.unselectedButton} onPress={() => this.props.navigation.navigate('Transaction')}>*/}
                        {/*<RegularText label='Statement' color={PRIMARY_COLOR} size={14} />*/}
                        {/*</TouchableOpacity>*/}
                        {/*</LinearGradient>*/}
                        {/*</View>*/}
                    </View>

                    <CustomLoader visible={loading}/>

                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    linearStyle: {
        borderRadius: 5,
        height: 100,
        width: '100%',
        marginBottom: 10
    },
    linearButton: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderRadius: 3
    },
    unselectedButton: {
        height: '90%',
        width: '97%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectedButton: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const mapStateToProps = (state) => {
    return {...state.dashboardData, ...state.accountData};
};

export default connect(mapStateToProps, {
    detailedAccountData,
    summaryAccountData,
    selectAccountFundType,
    selectDefaultAccountFundType,
    fetchUserProfile,
})(Dashboard);
