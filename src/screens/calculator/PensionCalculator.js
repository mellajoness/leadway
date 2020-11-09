import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {CONTAINER_STYLE} from '../../shared/Styles';
import {CommonHeader, RegularText} from '../../components';
import {Divider} from 'react-native-paper';
import {DARK_COLOR, PRIMARY_COLOR, TERTIARY_COLOR} from '../../shared/Colors';
import {
    Dialog,
    DialogButton,
    DialogContent, DialogFooter,
    DialogTitle,
    ScaleAnimation,
} from "react-native-popup-dialog";
import {connect} from 'react-redux';
import {closeDisclaimerDialog, showDisclaimerDialog} from "../../store/actions";

class PensionCalculator extends Component {

    componentDidMount() {
        this.props.showDisclaimerDialog();
    }

    render() {
        const {showDisclaimer, closeDisclaimerDialog} = this.props;

        return (
            <View style={CONTAINER_STYLE}>

                <CommonHeader
                    title='Pension Calculator'
                    backAction backActionPress={() => this.props.navigation.goBack()}
                    rightIcon='notifications-none'
                    rightActionPress={() => this.props.navigation.navigate("Message")}
                />

                <TouchableOpacity style={{padding: 8, margin: 8}}
                                  onPress={() => this.props.navigation.navigate('MonthlyContribution')}>
                    <RegularText label='How much do i need to contribute monthly to get my desired pension?' size={16}
                                 color={DARK_COLOR}/>
                </TouchableOpacity>

                <Divider/>

                <TouchableOpacity style={{padding: 8, margin: 8}}
                                  onPress={() => this.props.navigation.navigate('RetireCollection')}>
                    <RegularText label='Based on my current contributions, how much can i collect when i retire?'
                                 size={16} color={DARK_COLOR}/>
                </TouchableOpacity>

                <Dialog
                    visible={showDisclaimer}
                    // dialogAnimation={new SlideAnimation({
                    //     slideFrom: 'bottom',
                    // })}
                    dialogAnimation={new ScaleAnimation({
                        toValue: 0,
                        useNativeDriver: true,
                    })}
                    dialogTitle={<DialogTitle title="DISCLAIMER"/>}
                    containerStyle={{padding: 20}}
                    footer={
                        <DialogFooter>
                            <DialogButton
                                text="DISAGREE"
                                onPress={() => {
                                    this.props.navigation.navigate('Dashboard')
                                }}
                                textStyle={{color: PRIMARY_COLOR}}
                            />
                            <DialogButton
                                text="AGREE"
                                onPress={() => closeDisclaimerDialog()}
                                textStyle={{color: PRIMARY_COLOR}}
                            />
                        </DialogFooter>
                    }
                >
                    <DialogContent>
                        <View style={{padding: 5}}>
                            <RegularText
                                label="The Calculator on this mobile application is indicating and strictly for information
                                purposes. Leadway Pensure PFA's obligations with respect to its services on this mobile
                                application are governed solely by the agreements under which they are provided and nothing
                                hereof should be construed to the alter such service agreements."
                                size={16}
                                color={TERTIARY_COLOR}
                                style={{marginBottom: 13}}/>
                        </View>
                    </DialogContent>
                </Dialog>

            </View>


        );
    }
}

const mapStateToProps = (state) => {
    return state.pensionCalculatorData;
};

export default connect(mapStateToProps, {closeDisclaimerDialog, showDisclaimerDialog})(PensionCalculator);
