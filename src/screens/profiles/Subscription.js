import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import {CONTAINER_STYLE} from '../../shared/Styles';
import {CommonHeader, CustomLoader, SwitchButton, CommonButton} from '../../components';
import {Divider} from 'react-native-paper';
import {fetchSubscriptionList, updateSubscription, updateSubscriptionList} from '../../store/actions';
import {connect} from 'react-redux';

class Subscription extends Component {

    componentDidMount() {
        this.props.fetchSubscriptionList({});
    }

    onButtonPressed(request) {
        this.props.updateSubscriptionList(request, this.props.navigation);
    }

    requestBody() {
        return {
            subscriptionList: this.props.subscriptionList,
        };
    }

    _renderItem(item, index) {
        return (
            <View style={styles.viewStyle}>
                <SwitchButton
                    label={item.title}
                    value={item.data}
                    // onPress={() => this.onButtonPressed(item.title, item.data, item.id)}
                    onValueChange={() => this.switchValueChange(index)}
                />
            </View>
        );
    }

    switchValueChange(index) {
        const _array = this.props.subscriptionList;
        _array[index].data = !_array[index].data;
        this.props.updateSubscription(_array);
    }

    render() {
        const {subscriptionList, loading} = this.props;

        return (
            <View style={CONTAINER_STYLE}>

                <CommonHeader
                    title='Subscription'
                    backAction backActionPress={() => this.props.navigation.goBack()}
                    rightIcon='notifications-none'
                    rightActionPress={() => this.props.navigation.navigate("Message")}
                />

                <FlatList
                    data={subscriptionList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => this._renderItem(item, index)}
                    ItemSeparatorComponent={Divider}
                />

                <CommonButton label='Update' onPress={() => this.onButtonPressed(this.requestBody())}
                              style={{margin: 30}}/>

                <CustomLoader visible={loading}/>
            </View>
        );
    }
}

const styles = {
    viewStyle: {
        padding: 20,

    },
    switchStyle: {
        alignItems: 'flex-end'
    }
};

const mapStateToProps = (state) => {
    return state.subscriptionListData;
};

export default connect(mapStateToProps, {
    fetchSubscriptionList,
    updateSubscription,
    updateSubscriptionList
})(Subscription);
