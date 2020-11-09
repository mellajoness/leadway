import React, {Component} from 'react';
import {
    View,
    FlatList,
    Image,
    ScrollView,
    TouchableOpacity,
    Modal,
    PermissionsAndroid as Permissions
} from 'react-native';
import {CommonHeader, BoldText, RegularText, CommonButton, CustomLoader} from '../../components';
import {
    DARK_COLOR,
    PRIMARY_COLOR
} from '../../shared/Colors'
import {CONTAINER_STYLE} from '../../shared/Styles';
import {
    requiredSectorDocuments,
    selectSectorDocument,
    submitSectorDocuments,
    fetchPrivateSectorList,
    fetchPublicSectorList,
    saveSectorDocuments,
    showImageCaptureModal,
    closeImageCaptureModal,
    selectedDocumentUpload, openRatingDialog, resetSectorDocuments, resetBenefitFields, closeRatingDialog
} from '../../store/actions';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import {LOGGER} from "../../shared/Methods";
import {Divider, List} from "react-native-paper";
import {
    Dialog,
    DialogButton,
    DialogContent,
    DialogFooter,
    DialogTitle,
    ScaleAnimation
} from "react-native-popup-dialog";

class RequiredSectorDocuments extends Component {

    state = {
        image: null,
        documents: [],
    };

    componentDidMount() {

        if (this.props.selectedSector === 1) {
            this.props.fetchPublicSectorList();
        } else if (this.props.selectedSector === 2) {
            this.props.fetchPrivateSectorList();
        }
    }

    documentButton() {
        const sector = this.props.selectedSector;
        if ((sector === 1)) {
            const doc = this.props.publicSectorList;
            let length = 0;
            doc.map((publicSec) => {
                if (publicSec.image) {
                    length++;
                }
            });

            if (length < 15) {
                return (
                    <CommonButton label='Save and continue later'
                                  onPress={() => this.props.saveSectorDocuments(doc, sector)}
                                  style={{marginHorizontal: 10, marginBottom: 10}}/>
                );
            } else {
                return (
                    <CommonButton label='Submit'
                                  onPress={() => this.submitSectorDocuments(this.submitSectorDocumentsRequestBody(sector))}
                                  style={{marginHorizontal: 10, marginBottom: 10}}/>
                );
            }
        } else if (sector === 2) {
            const doc = this.props.privateSectorList;

            let length = 0;
            doc.map((privateSec) => {
                if (privateSec.image) {
                    length++;
                }
            });

            return (
                <CommonButton label='Submit'
                              onPress={() => this.submitSectorDocuments(this.submitSectorDocumentsRequestBody(sector))}
                              style={{marginHorizontal: 20, marginBottom: 20}}/>
            );
        }
    };

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

    onImageClick(item, index) {
        this.props.selectedDocumentUpload({item: item.documentNameField, index: index});
        this.props.showImageCaptureModal();
    }

    submitSectorDocumentsRequestBody(sector) {
        return {
            Sector: sector,
            SectorDocument: this.props.requiredDocumentsData,
        };
    }

    submitSectorDocuments(request) {
        this.props.submitSectorDocuments(request, this.props.navigation);
    }

    pickImageFunction = async (i, selectedDocumentName, isCapture) => {
        const {selectSectorDocument, requiredSectorDocuments, selectedSector, publicSectorList, privateSectorList} = this.props;
        let _array;
        if (selectedSector === 1) {
            _array = publicSectorList;
        } else if (selectedSector === 2) {
            _array = privateSectorList;
        }

        await this.props.closeImageCaptureModal();

        let result;
        if (isCapture) {
            const permissions = Permissions.CAMERA;
            const permissions2 = Permissions.CAMERA_ROLL
            const status = await Permissions.askAsync(permissions);
            const status2 = await Permissions.askAsync(permissions2);

            if (status.status !== 'granted' && status2.status !== 'granted') {
                LOGGER('camera permission', (`[ pickFromCamera ] ${permissions} access: ${status.status}`));
            } else {
                result = await ImagePicker.launchCameraAsync({
                    allowsEditing: false,
                    aspect: [4, 3],
                    base64: true
                });
            }
        } else {
            result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: false,
                aspect: [4, 3],
                base64: true
            });
        }

        if (!result.cancelled) {
            _array[i].image = `data:image/jpeg;base64,${result.base64}`;

            selectSectorDocument(_array);
            requiredSectorDocuments(_array, selectedDocumentName);
        }
    };

    onBackButtonClicked() {
        this.props.closeRatingDialog();
        this.props.resetSectorDocuments();
        this.props.navigation.goBack();
    }

    render() {
        const {
            selectedSector, loading, publicSectorList, privateSectorList, showModalForImageCategory, documentItem,
            documentIndex, closeRatingDialog, showRating, openRatingDialog
        } = this.props;

        let documents;
        let sectorLabel;

        if (selectedSector === 1) {
            sectorLabel = "Public Sector Documents";
            documents = publicSectorList;
        } else if (selectedSector === 2) {
            sectorLabel = "Private Sector Documents";
            documents = privateSectorList;
        }

        return (
            <View style={CONTAINER_STYLE}>
                <CommonHeader
                    title='Required Sector Documents'
                    backAction
                    backActionPress={() => this.props.navigation.goBack()}
                    rightIcon='notifications-none'
                    rightActionPress={() => this.props.navigation.navigate("Message")}
                />

                <ScrollView style={{flex: 1}}>

                    <BoldText label={sectorLabel} color={DARK_COLOR} size={18}
                              style={{textAlign: 'center', marginVertical: 20}}/>

                    <FlatList
                        data={documents}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => this._renderItem(item, index)}
                        numColumns={1}
                        contentContainerStyle={{paddingLeft: 10}}
                    />

                    {this.documentButton()}

                </ScrollView>

                <CustomLoader visible={loading}/>

                <Modal
                    visible={showModalForImageCategory}
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
                            />,
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
        ...state.sectorData,
        // ...state.benefitApplicationData,
        showRating: state.loginData.showRating,
        showModalForImageCategory: state.benefitApplicationData.showModalForImageCategory,
        // closeImageCaptureModal: state.benefitApplicationData.closeImageCaptureModal,
        documentItem: state.benefitApplicationData.documentItem,
        documentIndex: state.benefitApplicationData.documentIndex,
    };
};

export default connect(mapStateToProps, {
    selectSectorDocument,
    requiredSectorDocuments,
    submitSectorDocuments,
    fetchPrivateSectorList,
    fetchPublicSectorList,
    saveSectorDocuments,
    showImageCaptureModal,
    closeImageCaptureModal,
    selectedDocumentUpload,
    openRatingDialog,
    resetSectorDocuments,
    resetBenefitFields,
    closeRatingDialog
})(RequiredSectorDocuments);
