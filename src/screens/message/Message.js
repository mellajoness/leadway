import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import {CONTAINER_STYLE} from "../../shared/Styles";
import {BoldText, CommonHeader, CustomLoader, RegularText} from "../../components/index";
import {List, Divider} from 'react-native-paper';
import {fetchPersonalMessageList, selectMessageList, fetchNewMessageList} from "../../store/actions";
import {connect} from "react-redux";
import Moment from "moment";

class Message extends Component {

    componentDidMount() {
        this.props.fetchNewMessageList({});
    }

    onItemCLick(data) {
        this.props.selectMessageList(data);
        this.props.navigation.navigate('MessageDetail');
    }

    _renderItem(item, index) {
        const formatedDate = Moment(item.DateAdded).format("DD-MM-YYYY");

        if (item.MessageTitle) {
            return <List.Item
                title={<BoldText label={item.MessageTitle}/>}
                description={formatedDate}
                descriptionStyle={{fontSize: 14, fontFamily: 'Lato-Regular'}}
                right={props => <List.Icon {...props} icon='navigate-next'/>}
                onPress={() => this.onItemCLick(item)}
            />
        } else {
            return <List.Item
                title={<BoldText label={item.PersonalMessageTitle}/>}
                description={formatedDate}
                descriptionStyle={{fontSize: 14, fontFamily: 'Lato-Regular'}}
                right={props => <List.Icon {...props} icon='navigate-next'/>}
                onPress={() => this.onItemCLick(item)}
            />
        }
    }

    render() {
        const {messageList, loading} = this.props;
        return (
            <View style={CONTAINER_STYLE}>
                <CommonHeader
                    title='Message'
                    menuButtonPress={() => this.props.navigation.openDrawer()}
                />

                <FlatList
                    data={messageList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => this._renderItem(item, index)}
                    ItemSeparatorComponent={Divider}
                />

                <CustomLoader visible={loading}/>

            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return state.messageData;
};

export default connect(mapStateToProps, {
    fetchPersonalMessageList,
    selectMessageList,
    fetchNewMessageList,
})(Message);
