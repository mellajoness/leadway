import React, {Component} from 'react';
import {View, FlatList, Image, ScrollView, TouchableOpacity, Modal, Alert} from 'react-native';
import {CommonHeader, BoldText, RegularText, CommonNextButton, CustomLoader} from '../../components';
import {DARK_COLOR, PRIMARY_COLOR} from '../../shared/Colors';
import {CONTAINER_STYLE} from '../../shared/Styles';
import {
    fetchRequiredDocuments,
    selectDocument,
    requiredApplicationDocuments,
    submitBenefitApplication,
    validateUser,
    changeValues,
    documentUploadRequest,
    showImageCaptureModal,
    closeImageCaptureModal,
    selectedDocumentUpload,
    openRatingDialog,
    resetBenefitDocuments,
    resetBenefitFields,
    closeRatingDialog
} from '../../store/actions';
import {connect} from 'react-redux';
// import {ImagePicker, Permissions} from 'expo';
// import {PermissionsAndroid as Permissions} from 'react-native';
import Permissions from 'react-native-permissions'
import ImagePicker from 'react-native-image-picker';
import {Divider, List} from "react-native-paper";
import {LOGGER} from "../../shared/Methods";
import {
    Dialog,
    DialogButton,
    DialogContent,
    DialogFooter,
    DialogTitle,
    ScaleAnimation
} from "react-native-popup-dialog";

class DocumentsUpload extends Component {

    state = {
        image: null,
        disableButton: true,
        photoPermission: '',
        cameraPermission: '',
    };

    componentDidMount() {
        this.props.fetchRequiredDocuments(this.requestBody(this.props.selectedBenefitType));

        // CHECK FOR PERMISSION
        Permissions.checkMultiple(['camera', 'photo']).then(response => {
            //response is an object mapping type to permission
            this.setState({
                cameraPermission: response.camera,
                photoPermission: response.photo,
            })
        })
    }

    _renderItem(item, index) {
        return (
            <TouchableOpacity style={styles.backgroundLight} onPress={() => this.onImageClick(item, index)}>
                <View style={{width: '45%', height: 100}}>
                    <Image
                        source={item.image ? {uri: item.image} : require('../../assets/images/upload.png')}
                        style={{height: '80%', width: '100%'}}
                        resizeMode='contain'/>
                </View>
                <RegularText label={item.documentNameField} size={14}
                             style={{width: '55%', marginStart: 20, alignContent: 'flex-end'}} color={DARK_COLOR}/>
            </TouchableOpacity>
        )
    }

    buttonDisability() {
        return this.props.requiredDocumentsData.length < this.props.requiredDocuments.length;
    };

    requestBody(appType) {
        return {
            AppType: appType,
            Sector: 0
        };
    }

    onImageClick(item, index) {
        if(this.state.photoPermission !== "authorized")
            this._requestPermission('photo');
        if(this.state.cameraPermission !== "authorized")
            this._requestPermission('camera');
        this.props.selectedDocumentUpload({item: item.documentNameField, index: index});

        this.pickImageFunction(index, item.documentNameField)
        // this.props.showImageCaptureModal();
    }

    submitApplicationRequestBody() {
        return {
            aVCApplicationAmount: this.props.withdrawalAmount,
            accountName: this.props.bankAccountName,
            accountNumber: this.props.bankAccountNumber,
            customerBankID: this.props.selectedBankId,
            customerBankBranchID: this.props.selectedBankBranchId,
            applicationDocuments: this.props.requiredDocumentsData,
            reason: this.props.reason,
            tIN: this.props.taxNum,
            pIN: this.props.pencom,
            appTypeId: this.props.selectedBenefitType,
            applicationTypeName: this.props.selectedBenefitTypeName,
            createdBy: "",
            department: this.props.department,
            designation: this.props.designation
        };
    }

    submitApplication(request) {
        // this.props.resetBenefitDocuments();
        // this.props.resetBenefitFields();
        this.props.documentUploadRequest(request);
        this.props.changeValues('userType', 'benefitDocument');
        this.props.validateUser({OTPType: 3}, this.props.navigation)
    }

    _requestPermission = (category) => {
        Permissions.request(category).then(response => {
            // Returns once the user has chosen to 'allow' or to 'not allow' access
            // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
            if(category === "photo")
                this.setState({ photoPermission: response });
            else
                this.setState({ cameraPermission: response });
        })
    }

    pickImageFunction = async (i, selectedDocumentName) => {
        const {requiredDocuments} = this.props;
        const _array = requiredDocuments;

        await this.props.closeImageCaptureModal();

        const options = {
            title: 'Image upload',
            allowsEditing: false,
            quality: 0.4,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (!response.didCancel) {
                _array[i].image = `data:image/jpeg;base64,${response.data}`;
                this.props.selectDocument(_array);
                this.props.requiredApplicationDocuments(_array, selectedDocumentName);
            }
        });

        LOGGER('disable button', this.buttonDisability())
        this.setState({disableButton: this.buttonDisability()});
    };

    onBackButtonClicked() {
        this.props.closeRatingDialog();
        this.props.resetBenefitDocuments();
        this.props.navigation.goBack();
    }

    render() {
        const {
            requiredDocuments, loading, showModalForImageCategory, documentItem, documentIndex, closeRatingDialog,
            showRating, openRatingDialog
        } = this.props;

        LOGGER('requiredDocuments', requiredDocuments)
        LOGGER('requiredDocumentsData', this.props.requiredDocumentsData)

        return (
            <View style={CONTAINER_STYLE}>
                <CommonHeader
                    title='Benefit Application'
                    backAction
                    backActionPress={() => this.props.navigation.goBack()}
                    rightIcon='notifications-none'
                    rightActionPress={() => this.props.navigation.navigate("Message")}
                />

                <ScrollView style={{flex: 1}}>
                    <BoldText label='Upload Documents' color={DARK_COLOR} size={18}
                              style={{textAlign: 'center', marginVertical: 20}}/>

                    <FlatList
                        data={requiredDocuments}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => this._renderItem(item, index)}
                        contentContainerStyle={{paddingLeft: 10}}
                    />

                    <View style={{marginHorizontal: 20, marginBottom: 20}}>
                        <CommonNextButton
                            label='Next'
                            onPress={() => this.submitApplication(this.submitApplicationRequestBody())}
                            disabled={!this.state.disableButton}
                            // disabled={false}
                        />
                    </View>

                </ScrollView>

                <CustomLoader visible={loading}/>

                <Modal
                    visible={false}
                    onRequestClose={() => this.props.closeImageCaptureModal()}
                    animationType='slide'
                    transparent
                >
                    <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.4)'}}>
                        <TouchableOpacity
                            style={{flex: 1}}
                            onPress={() => this.props.closeImageCaptureModal()}
                        />

                        <View style={{backgroundColor: 'white', paddingBottom: 10}}>
                            <List.Item
                                title={<RegularText label='Capture'/>}
                                onPress={() => this.pickImageFunction(documentIndex, documentItem, true)}
                            />

                            <Divider/>

                            <List.Item
                                title={<RegularText label='Upload'/>}
                                onPress={() => this.pickImageFunction(documentIndex, documentItem, false)}
                            />

                        </View>
                    </View>
                </Modal>

                <Dialog
                    visible={showRating}
                    dialogAnimation={new ScaleAnimation({
                        toValue: 0,
                        useNativeDriver: true,
                    })}
                    dialogTitle={<DialogTitle title='Warning!!!'/>}
                    containerStyle={{padding: 20}}
                    footer={
                        <DialogFooter>
                            <DialogButton
                                text="No"
                                onPress={() => closeRatingDialog()}
                                textStyle={{color: PRIMARY_COLOR}}
                            />
                            <DialogButton
                                text="Yes"
                                onPress={() => this.onBackButtonClicked()}
                                textStyle={{color: PRIMARY_COLOR}}
                            />
                        </DialogFooter>
                    }
                >

                    <DialogContent style={{padding: 0, height: 60, width: 300}}>
                        <View><RegularText label='Going back means you want to erase your changes. Are you sure you
                        want to go back?'/></View>
                    </DialogContent>
                </Dialog>

            </View>
        );
    }
}

const styles = {
    backgroundLight: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 0,
        justifyContent: 'space-evenly',
    }
};

const mapStateToProps = (state) => {
    return {
        ...state.benefitApplicationData,
        loading: state.userAuthData.loading,
        showRating: state.loginData.showRating,
        pencom: state.loginData.pencom
    };
};

export default connect(mapStateToProps, {
    fetchRequiredDocuments, selectDocument, requiredApplicationDocuments,
    submitBenefitApplication, validateUser, changeValues, documentUploadRequest, showImageCaptureModal,
    closeImageCaptureModal, selectedDocumentUpload, openRatingDialog, resetBenefitDocuments, resetBenefitFields,
    closeRatingDialog
})(DocumentsUpload);
