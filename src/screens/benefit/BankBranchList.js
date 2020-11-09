import React, { Component } from 'react';
import { View, FlatList} from 'react-native';
import { CONTAINER_STYLE } from '../../shared/Styles';
import { CommonHeader, BoldText,  CustomLoader } from '../../components/index';
import { List, Divider } from 'react-native-paper';
import {fetchBankBranchList, selectBankBranchName} from '../../store/actions/index';
import { connect } from 'react-redux';
import {selectBankBranchId} from "../../store/actions";

class BankBranchList extends Component {

    componentDidMount() {
        this.props.fetchBankBranchList({}, this.props.selectedBankId);
    }

    _renderItem(item, index) {
        return <List.Item
            title={<BoldText label={item.bankBranchNameField} />}
            onPress={() => this.selectBankButton(item.bankBranchNameField, item.branchIDField)}
        />
    }

    selectBankButton(name, id)
    {
        this.props.selectBankBranchName(name);
        this.props.selectBankBranchId(id);
        this.props.navigation.goBack();
    }

    render() {
        const { bankBranchList, loading } = this.props;

        return (
            <View style={CONTAINER_STYLE}>

                <CommonHeader title='Bank Branch List' backAction backActionPress={() => this.props.navigation.goBack()} />

                <FlatList
                    data={bankBranchList}
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

export default connect(mapStateToProps, {fetchBankBranchList, selectBankBranchName, selectBankBranchId})(BankBranchList);