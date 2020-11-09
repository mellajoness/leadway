import React, { Component } from 'react';
import { View, FlatList, Modal, TouchableOpacity } from 'react-native';
import {GRADIENT_COLOR, PRIMARY_COLOR, DARK_COLOR, ACCENT_COLOR, LIGHTER_COLOR, LIGHT_COLOR} from '../../shared/Colors';
import {CONTAINER_STYLE, FAB_STYLE} from '../../shared/Styles';
import { CommonHeader, RegularText, BoldText } from '../../components';
import {List, Divider, IconButton, FAB} from 'react-native-paper';
import {detailedAccountData, showTransactionModal, closeTransactionModal} from '../../store/actions'
import {connect} from "react-redux";
import {LOGGER} from "../../shared/Methods";

class TransactionList extends Component {

    componentDidMount() {
        const { detailedAccountData } = this.props;

        let selectedFundType = this.props.defaultSelectedTransaction;

        LOGGER('selectedFundType', selectedFundType)
        selectedFundType = selectedFundType[selectedFundType.length - 1];
        if(!selectedFundType)
        {
            selectedFundType = this.props.selectFundType;
        }

        detailedAccountData(selectedFundType, '', '');
    }

    // _renderItem(item, index) {
    //     return (
    //         <TouchableOpacity style={styles.historyCard} onPress={() => this.props.showTransactionModal(item)}>
    //             <RegularText label={item.dateField} size={14} />
    //             <BoldText label={item.netcontributionField} size={18} color={PRIMARY_COLOR} />
    //             <RegularText label={item.descriptionField} size={14} />
    //         </TouchableOpacity>
    //     )
    // }

    _renderItem(item, index) {
        return (
            <TouchableOpacity style={styles.summaryStyle} onPress={() => this.props.showTransactionModal(item)}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 25, margin: 20}}>
                    <View style={{flexDirection: 'column', justifyContent: 'space-between', width: '70%'}}>
                        <BoldText label={`N${item.netcontributionField}`} color={PRIMARY_COLOR} size={25}/>
                        <RegularText label={item.descriptionField} size={14}/>
                    </View>
                    <View style={{width: '30%'}}>
                        <RegularText label={item.dateField}/>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const { showModal, closeTransactionModal, selectedTransaction, transactionList } = this.props;

        let transactionListSort = [];
        const keys = Object.keys( transactionList );
        keys.sort( function ( a, b ) { return b - a; } );

        for ( let i = 0; i < keys.length; i++ ) {
            transactionListSort.push(transactionList[ keys[i] ])
        }

        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>

                <CommonHeader
                    title='Statement'
                    backAction
                    backActionPress={() => this.props.navigation.goBack()}
                    rightIcon='notifications-none'
                    rightActionPress={() => this.props.navigation.navigate("Message")}
                />

                <View style={{flex: 1, paddingTop: 20, paddingBottom: 20}}>

                    <FlatList
                        data={transactionListSort}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => this._renderItem(item, index)}
                    />

                    <FAB
                        style={FAB_STYLE}
                        icon="search"
                        color='white'
                        onPress={() => this.props.navigation.navigate('SearchTransaction')}
                    />

                </View>

                <Modal
                    visible={showModal}
                    onRequestClose={() => closeTransactionModal()}
                    transparent
                    animationType='fade'
                >
                    <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.4)'}}>
                        <TouchableOpacity style={{flex: 1}} onPress={() => closeTransactionModal()} />

                        <View style={{backgroundColor: 'white', paddingVertical: 10}}>
                            <List.Item
                                title={<BoldText label={selectedTransaction.netcontributionField} />}
                                description={selectedTransaction.dateField}
                                descriptionStyle={{fontSize: 14, fontFamily: 'Lato-Regular'}}
                                left={props => <List.Icon {...props} icon="account-balance-wallet" color={DARK_COLOR} />}
                                right={props => <IconButton {...props} icon='cancel' color={PRIMARY_COLOR} onPress={() => closeTransactionModal()} />}
                            />
                            <Divider />

                            <List.Item
                                title={<BoldText label={selectedTransaction.descriptionField} />}
                                description='Narration'
                                descriptionStyle={{fontSize: 14, fontFamily: 'Lato-Regular'}}
                            />
                            <List.Item
                                title={<BoldText label={selectedTransaction.unitpriceField} />}
                                description='Unit Price'
                                descriptionStyle={{fontSize: 14, fontFamily: 'Lato-Regular'}}
                            />
                            <List.Item
                                title={<BoldText label={selectedTransaction.unitsField} />}
                                description='Units'
                                descriptionStyle={{fontSize: 14, fontFamily: 'Lato-Regular'}}
                            />
                            <List.Item
                                title={<BoldText label={selectedTransaction.avcField} />}
                                description='AVC'
                                descriptionStyle={{fontSize: 14, fontFamily: 'Lato-Regular'}}
                            />
                            <List.Item
                                title={<BoldText label={selectedTransaction.erconsField} />}
                                description='Employer Contribution'
                                descriptionStyle={{fontSize: 14, fontFamily: 'Lato-Regular'}}
                            />
                            <List.Item
                                title={<BoldText label={selectedTransaction.eeconsField} />}
                                description='Employee Contribution'
                                descriptionStyle={{fontSize: 14, fontFamily: 'Lato-Regular'}}
                            />
                        </View>
                    </View>
                </Modal>
                
            </View>
        );
    }
}

// adminfeesandvatField: "-105.00"
// avcField: "0.00"
// closingbalanceField: false
// dateField: "03-Sep-2018"
// descriptionField: "Jul '18 Contr. From PR0000883679"
// eeconsField: "5,914.12"
// erconsField: "7,392.65"
// netcontributionField: "13,201.77"
// openingbalanceField: false
// totalField: "13,201.77"
// unitpriceField: "3.0224"
// unitsField: "4,367.9758"

const styles = {
    historyCard: {
        backgroundColor: 'white',
        height: 100,
        borderRadius: 10,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 10
    },
    summaryStyle: {
        backgroundColor: LIGHT_COLOR,
        marginBottom: 10,
    }
}

const mapStateToProps = (state) => {
    return { ...state.accountData };
};

export default connect(mapStateToProps, {detailedAccountData, showTransactionModal, closeTransactionModal})(TransactionList);