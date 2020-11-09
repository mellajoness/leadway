import React, {Component} from 'react';
import {ImageBackground, ScrollView, View} from 'react-native';
import {CONTAINER_STYLE} from "../../shared/Styles";
import {BoldText, CommonHeader, RegularText} from "../../components";
import {PRIMARY_COLOR} from "../../shared/Colors";
import {connect} from "react-redux";

class MessageDetail extends Component {

    render() {
        const {selectedMessageList} = this.props;
        let messageDetail;
        let messageTitle;
        if (selectedMessageList.MessageNotification)
            messageDetail = selectedMessageList.MessageNotification;
        else
            messageDetail = selectedMessageList.PersonalMessageNotification;

        if (selectedMessageList.MessageTitle)
            messageTitle = selectedMessageList.MessageTitle;
        else
            messageTitle = selectedMessageList.PersonalMessageTitle;

        return (
            <View style={CONTAINER_STYLE}>
                <CommonHeader
                    title='Message'
                    backAction
                    backActionPress={() => this.props.navigation.goBack()}
                />

                <ImageBackground
                    source={require('../../assets/images/BG2.png')}
                    resizeMode='cover'
                    style={{flex: 1}}
                >
                    <ScrollView style={{flex: 1, padding: 20}}>

                        <View style={{justifyContent: 'center'}}>
                            <BoldText label={messageTitle} size={18} style={{textAlign: 'center'}}
                                      color={PRIMARY_COLOR}/>

                            <RegularText label={messageDetail} size={15} style={{marginBottom: 5, marginTop: 10}}/>
                        </View>

                    </ScrollView>
                </ImageBackground>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return state.messageData;
};

export default connect(mapStateToProps, {})(MessageDetail);
