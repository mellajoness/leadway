import React, { Component } from 'react';
import { View, FlatList} from 'react-native';
import { CONTAINER_STYLE } from '../../shared/Styles';
import { CommonHeader, BoldText,  CustomLoader } from '../../components/index';
import { List, Divider } from 'react-native-paper';
import {fetchLGList, selectLocalGovernment } from '../../store/actions/index';
import { connect } from 'react-redux';

class LocalGovenmentList extends Component {

    componentDidMount() {
        this.props.fetchLGList(this.props.stateoforigin);
    }

    _renderItem(item, index) {
        return <List.Item
            title={<BoldText label={item} />}
            onPress={() => this.selectLGButton(item)}
        />
    }

    selectLGButton(name)
    {
        this.props.selectLocalGovernment(name);
        this.props.navigation.goBack();
    }

    render() {
        const { localgovenmentList, loading } = this.props;

        return (
            <View style={CONTAINER_STYLE}>

                <CommonHeader title='Local Govenment List' backAction backActionPress={() => this.props.navigation.goBack()} />

                <FlatList
                    data={localgovenmentList}
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
    return state.profileSettingsData;
};

export default connect(mapStateToProps, { fetchLGList, selectLocalGovernment })(LocalGovenmentList);