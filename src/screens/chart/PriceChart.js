import React, { Component } from 'react';
import {View, ScrollView, Modal, TouchableOpacity, ImageBackground} from 'react-native';
import { CONTAINER_STYLE } from '../../shared/Styles';
import {CommonHeader, CommonNextButton, DatePickerButton, RegularText, CustomLoader, BoldText} from '../../components';
import { connect } from 'react-redux';
import { TextInput, List, Divider } from 'react-native-paper';
import { updatePriceChartValues, fetchChartData, showFundTypeModal, closeFundTypeModal, showFundCategoryModal, closeFundCategoryModal,
     selectFundType, selectFundCategory, showDurationModal, closeDurationModal, selectDuration, showChartTypeModal, closeChartTypeModal,
     selectChartType } from "../../store/actions";
import {ACCENT_COLOR, DARK_COLOR} from "../../shared/Colors";

class PriceChart extends Component {

    onButtonPressed(request) {
        this.props.fetchChartData(request, this.props.navigation);
    }

    buttonDisability() {
        return !(this.props.selectedFundCategory &&
            this.props.selectedDuration);
    };

    requestBody() {

        return {
            // fundType: this.getFundType(this.props.selectedFundType),
            fundCategory: this.getFundCategory(this.props.selectedFundCategory),
            duration: this.getDuration(this.props.selectedDuration),
            chartType: this.props.selectedChartType
        };
    }

    getDuration(selectedDuration)
    {
        if(selectedDuration === "Last 14 Days")
            return 2;
        else if(selectedDuration === "Last 1 Month")
            return 3;
        else if(selectedDuration === "Last 3 Months")
            return 4;
        else if(selectedDuration === "Last 1 Year")
            return 5;
        else if(selectedDuration === "Last 5 Years")
            return 6;
        else if(selectedDuration === "Last Available Date")
            return 0;
        else if(selectedDuration === "Year to Date")
            return 1;
    }

    getFundCategory(selectedFundCategory)
    {
        if(selectedFundCategory === "Fund 1")
        {
            return {
                fund1: true,
                fund2: false,
                fund3: false,
                fund4: false
            };
        }
        else if(selectedFundCategory === "Fund 2")
        {
            return {
                fund1: false,
                fund2: true,
                fund3: false,
                fund4: false
            };
        }
        else if(selectedFundCategory === "Fund 3")
        {
            return {
                fund1: false,
                fund2: false,
                fund3: true,
                fund4: false
            };
        }
        else if(selectedFundCategory === "Fund 4")
        {
            return {
                fund1: false,
                fund2: false,
                fund3: false,
                fund4: true
            };
        }
    }

    render() {

        const {showModalForFundType, showModalForFundCategory, showModalForDuration, showModalForChartType, selectedFundType,
               selectedFundCategory, selectedDuration, selectedChartType, loading} = this.props;
        return (
            <View style={CONTAINER_STYLE}>

                <CommonHeader
                    title='Price Chart'
                    backAction backActionPress={() => this.props.navigation.navigate('More')}
                    rightIcon='notifications-none'
                    rightActionPress={() => this.props.navigation.navigate("Message")}
                />

                <ImageBackground
                    source={require('../../assets/images/BG2.png')}
                    resizeMode='cover'
                    style={{flex: 1}}>

                    <ScrollView style={{flex: 1, padding: 20}}>
                        <BoldText label='Price Chart' style={{marginBottom: 20}} size={23} color={ACCENT_COLOR}/>

                        <TextInput
                            mode='outlined'
                            label='Fund Category'
                            render={props =>
                                <DatePickerButton
                                    {...props}
                                    icon='arrow-drop-down'
                                    value={selectedFundCategory}
                                    onPress={() => this.props.showFundCategoryModal()}
                                />
                            }
                            style={inputStyle}
                            value={selectedFundCategory}
                            onChangeText={(val) => updatePriceChartValues('selectedFundCategory', val)}
                        />

                        <TextInput
                            mode='outlined'
                            label='Duration'
                            render={props =>
                                <DatePickerButton
                                    {...props}
                                    icon='arrow-drop-down'
                                    value={selectedDuration}
                                    onPress={() => this.props.showDurationModal()}
                                />
                            }
                            style={inputStyle}
                            value={selectedDuration}
                            onChangeText={(val) => updatePriceChartValues('selectedDuration', val)}
                        />

                        {/*<TextInput*/}
                            {/*mode='outlined'*/}
                            {/*label='Chart Type'*/}
                            {/*render={props =>*/}
                                {/*<DatePickerButton*/}
                                    {/*{...props}*/}
                                    {/*icon='arrow-drop-down'*/}
                                    {/*value={selectedChartType}*/}
                                    {/*onPress={() => this.props.showChartTypeModal()}*/}
                                {/*/>*/}
                            {/*}*/}
                            {/*style={inputStyle}*/}
                            {/*value={selectedChartType}*/}
                            {/*onChangeText={(val) => updatePriceChartValues('selectedChartType', val)}*/}
                        {/*/>*/}

                        <CommonNextButton
                            label='Show Chart'
                            onPress={() => this.onButtonPressed(this.requestBody())}
                            style={{marginBottom: 30}}
                            disabled={this.buttonDisability()}
                        />

                    </ScrollView>

                    <CustomLoader visible={loading} />

                </ImageBackground>

                {/* Fund Type */}

                <Modal
                    visible={showModalForFundType}
                    onRequestClose={() => this.props.closeFundTypeModal()}
                    animationType='slide'
                    transparent
                >
                    <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.4)'}}>
                        <TouchableOpacity
                            style={{flex: 1}}
                            onPress={() => this.props.closeFundTypeModal()}
                        />

                        <View style={{backgroundColor: 'white', paddingBottom: 10}}>
                            <List.Item
                                title={<RegularText label='RSA Fund' />}
                                onPress={() => this.props.selectFundType('RSA Fund')}
                            />

                            <Divider />

                            <List.Item
                                title={<RegularText label='Retire Fund' />}
                                onPress={() => this.props.selectFundType('Retire Fund')}
                            />

                        </View>
                    </View>
                </Modal>

                {/* Fund Category */}

                <Modal
                    visible={showModalForFundCategory}
                    onRequestClose={() => this.props.closeFundCategoryModal()}
                    animationType='slide'
                    transparent
                >
                    <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.4)'}}>
                        <TouchableOpacity
                            style={{flex: 1}}
                            onPress={() => this.props.closeFundCategoryModal()}
                        />

                        <View style={{backgroundColor: 'white', paddingBottom: 10}}>
                            <List.Item
                                title={<RegularText label='Fund 1' />}
                                onPress={() => this.props.selectFundCategory('Fund 1')}
                            />

                            <Divider />

                            <List.Item
                                title={<RegularText label='Fund 2' />}
                                onPress={() => this.props.selectFundCategory('Fund 2')}
                            />

                            <Divider />

                            <List.Item
                                title={<RegularText label='Fund 3' />}
                                onPress={() => this.props.selectFundCategory('Fund 3')}
                            />

                            <Divider />

                            <List.Item
                                title={<RegularText label='Fund 4' />}
                                onPress={() => this.props.selectFundCategory('Fund 4')}
                            />

                        </View>
                    </View>
                </Modal>

                {/* Duration */}

                <Modal
                    visible={showModalForDuration}
                    onRequestClose={() => this.props.closeDurationModal()}
                    animationType='slide'
                    transparent
                >
                    <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.4)'}}>
                        <TouchableOpacity
                            style={{flex: 1}}
                            onPress={() => this.props.closeDurationModal()}
                        />

                        <View style={{backgroundColor: 'white', paddingBottom: 10}}>
                            <List.Item
                                title={<RegularText label='Last 14 Days' />}
                                onPress={() => this.props.selectDuration('Last 14 Days')}
                            />

                            <Divider />

                            <List.Item
                                title={<RegularText label='Last 1 Month' />}
                                onPress={() => this.props.selectDuration('Last 1 Month')}
                            />

                            <Divider />

                            <List.Item
                                title={<RegularText label='Last 3 Months' />}
                                onPress={() => this.props.selectDuration('Last 3 Months')}
                            />

                            <Divider />

                            <List.Item
                                title={<RegularText label='Last 1 Year' />}
                                onPress={() => this.props.selectDuration('Last 1 Year')}
                            />

                            <Divider />

                            <List.Item
                                title={<RegularText label='Last 5 Years' />}
                                onPress={() => this.props.selectDuration('Last 5 Years')}
                            />

                            <Divider />

                            <List.Item
                                title={<RegularText label='Last Available Date' />}
                                onPress={() => this.props.selectDuration('Last Available Date')}
                            />

                            <List.Item
                                title={<RegularText label='Year to Date' />}
                                onPress={() => this.props.selectDuration('Year to Date')}
                            />

                        </View>
                    </View>
                </Modal>

                {/* Chart Type */}

                <Modal
                    visible={showModalForChartType}
                    onRequestClose={() => this.props.closeChartTypeModal()}
                    animationType='slide'
                    transparent>

                    <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.4)'}}>
                        <TouchableOpacity
                            style={{flex: 1}}
                            onPress={() => this.props.closeChartTypeModal()}
                        />

                        <View style={{backgroundColor: 'white', paddingBottom: 10}}>
                            <List.Item
                                title={<RegularText label='Line Chart' />}
                                onPress={() => this.props.selectChartType('Line Chart')}
                            />

                            <Divider />

                            {/*<List.Item*/}
                            {/*    title={<RegularText label='Bar Chart' />}*/}
                            {/*    onPress={() => this.props.selectChartType('Bar Chart')}*/}
                            {/*/>*/}

                        </View>
                    </View>
                </Modal>

            </View>
        );
    }
}

const styles = {
    inputStyle: {
        marginBottom: 15,
        fontFamily: 'Lato'
    }
};

const { inputStyle } = styles;

const mapStateToProps = (state) => {
    return state.priceChartData;
};

export default connect(mapStateToProps, { updatePriceChartValues, fetchChartData, showFundTypeModal, closeFundTypeModal,
     showFundCategoryModal, closeFundCategoryModal, selectFundType, selectFundCategory, showDurationModal, closeDurationModal,
     selectDuration, showChartTypeModal, closeChartTypeModal, selectChartType })(PriceChart);
