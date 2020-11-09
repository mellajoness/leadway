import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { CONTAINER_STYLE } from '../../shared/Styles';
import { CommonHeader, BoldText, RegularText } from '../../components';
import { List } from 'react-native-paper';
import { connect } from 'react-redux';
import { summaryAccountData, detailedAccountData } from '../../store/actions'
import {LIGHT_COLOR, PRIMARY_COLOR} from "../../shared/Colors";

class Summary extends Component {

    render() {
        const {
            totalUnits, unitPriceDate,
            unitPrice, lastCreditedDate,
            totalContribution,
            investmentIncome, avcUnits, avcValue
        } = this.props;

        return (
            <View style={CONTAINER_STYLE}>

                <CommonHeader
                    title='Summary'
                    backAction backActionPress={() => this.props.navigation.goBack()}
                    rightIcon='notifications-none'
                    rightActionPress={() => this.props.navigation.navigate("Message")}
                />

                <View style={{flex: 1}}>

                    <ScrollView style={{flex: 1}}>
                        <List.Item
                            title={<BoldText label={totalUnits} />}
                            description='Total Units'
                            descriptionStyle={{fontSize: 14, fontFamily: 'Lato-Regular'}}
                            style={{backgroundColor: LIGHT_COLOR}}
                        />

                        <List.Item
                            title={<BoldText label={unitPriceDate} />}
                            description='Unit Price Date'
                            descriptionStyle={{fontSize: 14, fontFamily: 'Lato-Regular'}}
                        />

                        <List.Item
                            title={<BoldText label={`₦${unitPrice}`} />}
                            description='Unit Price'
                            descriptionStyle={{fontSize: 14, fontFamily: 'Lato-Regular'}}
                            style={{backgroundColor: LIGHT_COLOR}}
                        />

                        <List.Item
                            title={<BoldText label={lastCreditedDate} />}
                            description='Last Credited Date'
                            descriptionStyle={{fontSize: 14, fontFamily: 'Lato-Regular'}}
                        />

                        <List.Item
                            title={<BoldText label={`₦${totalContribution}`} />}
                            description='Total Contribution'
                            descriptionStyle={{fontSize: 14, fontFamily: 'Lato-Regular'}}
                            style={{backgroundColor: LIGHT_COLOR}}
                        />

                        <List.Item
                            title={<BoldText label={`₦${investmentIncome}`} />}
                            description='Investment Income'
                            descriptionStyle={{fontSize: 14, fontFamily: 'Lato-Regular'}}
                        />

                        <List.Item
                            title={<BoldText label={avcUnits} />}
                            description='Total AVC Units'
                            descriptionStyle={{fontSize: 14, fontFamily: 'Lato-Regular'}}
                            style={{backgroundColor: LIGHT_COLOR}}
                        />

                        <List.Item
                            title={<BoldText label={avcValue} />}
                            description='AVC Value'
                            descriptionStyle={{fontSize: 14, fontFamily: 'Lato-Regular'}}
                        />
                    </ScrollView>

                </View>

            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return { ...state.dashboardData, ...state.accountData };
};

export default connect(mapStateToProps, {summaryAccountData, detailedAccountData})(Summary);