import React, { Component } from 'react';
import { View, FlatList} from 'react-native';
import { CONTAINER_STYLE } from '../../shared/Styles';
import { CommonHeader, BoldText,  CustomLoader } from '../../components/index';
import { List, Divider } from 'react-native-paper';
import {fetchBankList, selectBankName, selectBankId } from '../../store/actions/index';
import { connect } from 'react-redux';
import {LOGGER} from "../../shared/Methods";

class BankList extends Component {

    componentDidMount() {
        this.props.fetchBankList({});
    }

    _renderItem(item, index) {
        return <List.Item
            title={<BoldText label={item.bankNameField} />}
            onPress={() => this.selectBankButton(item.bankNameField, item.bankIDField)}
        />
    }

    selectBankButton(name, id)
    {
        this.props.selectBankName(name);
        this.props.selectBankId(id);
        this.props.navigation.goBack();
    }

    render() {
        const { bankList, loading } = this.props;
        LOGGER('bankList', bankList);

        return (
            <View style={CONTAINER_STYLE}>

                <CommonHeader title='Bank List' backAction backActionPress={() => this.props.navigation.goBack()} />

                <FlatList
                    data={bankList}
                    renderItem={({item, index}) => this._renderItem(item, index)}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={Divider}
                />

                <CustomLoader visible={loading} />

            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return state.benefitApplicationData;
};

export default connect(mapStateToProps, {fetchBankList, selectBankName, selectBankId})(BankList);