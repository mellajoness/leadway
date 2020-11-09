import React, {Component} from 'react';
import {View, FlatList, Modal, TouchableOpacity, Linking} from 'react-native';
import {CONTAINER_STYLE} from '../shared/Styles';
import {CommonHeader, BoldText, RegularText, CustomLoader} from '../components';
import {List, Divider} from 'react-native-paper';
import {fetchBranchList, closeBranchModal, showBranchModal} from '../store/actions';
import {connect} from 'react-redux';
import {LOGGER} from '../shared/Methods';
import {PRIMARY_COLOR} from "../shared/Colors";

class Branches extends Component {

    componentDidMount() {
        this.props.fetchBranchList({});
    }

    _renderItem(item, index) {
        return <List.Item
            title={<BoldText label={item.Location}/>}
            description={item.OfficeAddress}
            right={props => <List.Icon {...props} icon='more-vert'/>}
            onPress={() => this.props.showBranchModal(item)}
        />
    }

    async _onSendSMS(phoneNo) {
        await Linking.openURL(`sms:${phoneNo}`);
    }

    header(isGetHelp) {
        LOGGER('isGetHelp', isGetHelp);
        return isGetHelp
            ?
            <CommonHeader
                title='Branches'
                backAction backActionPress={() => this.props.navigation.navigate("GetHelp")}
            />
            :
            <CommonHeader
                title='Branches'
                backAction backActionPress={() => this.props.navigation.goBack()}
            />;
    }


    render() {
        const {branchList, loader, showModal, selectedBranch, closeBranchModal, isGetHelp} = this.props;

        LOGGER('loader', loader)
        return (
            <View style={CONTAINER_STYLE}>

                {this.header(isGetHelp)}

                <FlatList
                    data={branchList}
                    renderItem={({item, index}) => this._renderItem(item, index)}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={Divider}
                />

                <Modal
                    visible={showModal}
                    onRequestClose={() => closeBranchModal()}
                    animationType='slide'
                    transparent
                >
                    <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.4)'}}>
                        <TouchableOpacity
                            style={{flex: 1}}
                            onPress={() => closeBranchModal()}
                        />

                        <View style={{backgroundColor: 'white', paddingBottom: 10}}>
                            <List.Item
                                title={<BoldText label={selectedBranch.Location}/>}
                                description={selectedBranch.OfficeAddress}
                                descriptionStyle={{fontSize: 14, color: PRIMARY_COLOR, fontFamily: 'Lato-Regular'}}
                                left={props => <List.Icon {...props} icon='home'/>}
                            />
                            <Divider/>

                            <List.Item
                                title={<RegularText label='Call'/>}
                                description={selectedBranch.PhoneNo}
                                descriptionStyle={{fontSize: 12, color: PRIMARY_COLOR, fontFamily: 'Lato-Regular'}}
                                left={props => <List.Icon {...props} icon='call'/>}
                                onPress={async () => await Linking.openURL(`tel:${selectedBranch.PhoneNo}`)}
                            />

                            <List.Item
                                title={<RegularText label='Text'/>}
                                description={selectedBranch.PhoneNo}
                                descriptionStyle={{fontSize: 12, color: PRIMARY_COLOR, fontFamily: 'Lato-Regular'}}
                                left={props => <List.Icon {...props} icon='textsms'/>}
                                onPress={() => this._onSendSMS(selectedBranch.PhoneNo)}
                            />

                            <List.Item
                                title={<RegularText label='Email'/>}
                                description={selectedBranch.EmailAddress}
                                descriptionStyle={{fontSize: 12, color: PRIMARY_COLOR, fontFamily: 'Lato-Regular'}}
                                left={props => <List.Icon {...props} icon='mail'/>}
                                onPress={async () => await Linking.openURL(`mailto:${selectedBranch.EmailAddress}`)}
                            />

                            <List.Item
                                title={<RegularText label='Locate'/>}
                                description={selectedBranch.Latitude + ', ' + selectedBranch.Logintitude}
                                descriptionStyle={{fontSize: 12, color: PRIMARY_COLOR, fontFamily: 'Lato-Regular'}}
                                left={props => <List.Icon {...props} icon='map'/>}
                                onPress={() => LOGGER('LOCATE BRANCH', selectedBranch.Logintitude + ':' + selectedBranch.Latitude)}
                            />
                        </View>
                    </View>
                </Modal>

                <CustomLoader visible={loader}/>

            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {...state.branchListData, isGetHelp: state.loginData.isGetHelp};
};

export default connect(mapStateToProps, {fetchBranchList, closeBranchModal, showBranchModal})(Branches);
