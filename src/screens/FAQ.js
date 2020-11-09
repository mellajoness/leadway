import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { CONTAINER_STYLE } from '../shared/Styles';
import { CommonHeader, RegularText, BoldText, CustomLoader } from '../components';
import { List, Divider, IconButton } from 'react-native-paper';
import {TERTIARY_COLOR, DARK_COLOR} from '../shared/Colors';
import { fetchFaqList, FAQListFeedback } from '../store/actions';
import { connect } from 'react-redux';
import {LOGGER} from "../shared/Methods";

class FAQ extends Component {

    componentDidMount() {
        this.props.fetchFaqList({});
    }

    requestBody (status, title) {
        return {
            FeedbackType: 'FAQ',
            Title: title,
            FeedbackStatus: status
        };
    };

    header(isGetHelp)
    {
        LOGGER('isGetHelp', isGetHelp);
        return isGetHelp
            ?
            <CommonHeader
                title='FAQs'
                backAction backActionPress={() => this.props.navigation.navigate("GetHelp")}
            />
            :
            <CommonHeader
                title='FAQs'
                backAction backActionPress={() => this.props.navigation.goBack()}
            />;
    }

    _renderItem(item, index) {
        return (
            <List.Accordion
                title={<RegularText label={item.Questions} />}
            >
                <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
                    <BoldText label={item.Questions} color={DARK_COLOR} style={{marginBottom: 10}} />
                    <BoldText label={item.Answer} color={TERTIARY_COLOR} size={14} />

                    <View style={{marginTop: 20, alignItems: 'center'}}>
                        <RegularText label='Was this helpful?' size={14} />

                        <View style={{flexDirection: 'row'}}>
                            <IconButton
                                icon='thumb-down'
                                color='rgba(0,0,0,0.4)'
                                onPress={() => this.props.FAQListFeedback(this.requestBody(0, item.Questions))}
                            />

                            <IconButton
                                icon='thumb-up'
                                color='rgba(0,0,0,0.4)'
                                onPress={() => this.props.FAQListFeedback(this.requestBody(1, item.Questions))}
                            />
                        </View>
                    </View>
                </View>
            </List.Accordion>
        )
    }

    render() {
        const { faqList, loading, isGetHelp } = this.props;
        return (
            <View style={CONTAINER_STYLE}>

                {this.header(isGetHelp)}

                <FlatList
                    data={faqList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => this._renderItem(item, index)}
                    ItemSeparatorComponent={Divider}
                />
                
                <CustomLoader visible={loading} />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {...state.faqListData, isGetHelp: state.loginData.isGetHelp};
};

export default connect(mapStateToProps, {fetchFaqList, FAQListFeedback})(FAQ);
