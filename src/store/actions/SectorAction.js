import {BENEFIT_REQUIRED_DOCUMENT_API, SECTOR_REQUIRED_DOCUMENT_API, SERVER_REQUEST} from "../../shared/Backend";
import {Alert, InteractionManager} from "react-native";
import {
    GET_PENCOMPIN,
    GET_PRIVATE_SECTOR,
    GET_PUBLIC_SECTOR,
    GET_STORED_BRANCH, SAVE_PRIVATE_SECTOR,
    SAVE_PUBLIC_SECTOR
} from "../../shared/Storage";
import {LOGGER} from "../../shared/Methods";

export const privateSector = [
    {documentNameField: '1 recent coloured Passport sized (4” x 4”) photograph', image: ''},
    {documentNameField: 'Letter of First Appointment (in the case of Public Sector employees)', image: ''},
    {documentNameField: 'Letter of Employment or Letter of Appointment', image: ''},
    {documentNameField: 'Birth Certificate or Declaration of Age ', image: ''},
    {documentNameField: 'Certificate of RSA Registration', image: ''},
    {documentNameField: 'National Identity Card or Enrolment Slip', image: ''},
    {documentNameField: 'Authenticated Bank Verification Number (BVN)', image: ''},
    {documentNameField: 'Other additional documentation as may be deemed necessary by the PFA', image: ''},
    {documentNameField: 'Staff Identity Card or National Driver’s License, Permanent Voter’s Card, International Passport', image: ''},

];

export const publicSector = [
    {documentNameField: '1 recent coloured Passport sized (4” x 4”) photograph', image: '' },
    {documentNameField: 'Letter of First Appointment or Attestation Letter', image: ''},
    {documentNameField: 'Transfer and Acceptance of Service', image: ''},
    {documentNameField: 'Promotion Letter and Pay Slip indicating Grade Level and Step as at 30 June 2004', image: ''},
    {documentNameField: 'Promotion Letter and Pay Slip indicating Grade Level and Step as at January 2007', image: ''},
    {documentNameField: 'Promotion Letter and Pay Slip indicating Grade Level and Step as at July 2010', image: ''},
    {documentNameField: 'Promotion Letter and Pay Slip indicating current Grade Level and Step', image: ''},
    {documentNameField: 'Promotion Letter and Pay Slip indicating Grade Level and Step as at December 2013', image: ''},
    {documentNameField: 'Promotion Letter and Pay Slip indicating Grade Level and Step as at December 2016', image: ''},
    {documentNameField: 'National Identity Card or Enrolment Slip', image: ''},
    {documentNameField: 'Employer’s Staff Identity Card', image: ''},
    {documentNameField: 'Birth Certificate or Declaration of Age', image: ''},
    {documentNameField: 'Certificate of RSA Registration', image: ''},
    {documentNameField: 'Authenticated Bank Verification Number (BVN)', image: ''},
    {documentNameField: 'Other additional documentation as may be deemed necessary by the PFA', image: ''},
];


export const submitSectorDocuments = (body, navigation) => {
    return async (dispatch) => {
        dispatch({ type: 'SUBMIT_SECTOR_DOCUMENT', payload: null });

        body['RSAPIN'] = await GET_PENCOMPIN();
        const sector = body['Sector'];

        try {
            const response = await SERVER_REQUEST(body, SECTOR_REQUIRED_DOCUMENT_API, 'POST');
            if (response.StatusCode === '00') {
                LOGGER('sector', sector);

                if(sector === 1)
                {
                    SAVE_PUBLIC_SECTOR('');
                }
                else if(sector === 2)
                {
                    SAVE_PRIVATE_SECTOR('');
                }
                InteractionManager.runAfterInteractions(() => {
                    setTimeout(() => {
                        Alert.alert('Success', response.Message);
                    });
                });

                navigation.navigate('Sectr');
            } else {
                InteractionManager.runAfterInteractions(() => {
                    setTimeout(() => {
                        Alert.alert('Sector Documents Error', response.Message);
                    });
                });
            }

            dispatch({ type: 'SUBMIT_SECTOR_DOCUMENT_DONE', payload: null });
        }
        catch (error) {
            dispatch({ type: 'SUBMIT_SECTOR_DOCUMENT_DONE', payload: error.message });
        }
    };
};

export const saveSectorDocuments = (body, sector) => {
    return async (dispatch) => {
        if(sector === 1)
        {

            body.map((doc) => {

                const image = doc.DocumentImage;
                const name = doc.DocumentTypeName;

                publicSector.map((publicSec) => {

                    if(publicSec.documentNameField === name)
                    {
                        publicSec.image = image;
                    }
                });
            });

            SAVE_PUBLIC_SECTOR(publicSector);
        }
        else if(sector === 2)
        {
            body.map((doc) => {
                const image = doc.DocumentImage;
                const name = doc.DocumentTypeName;

                privateSector.map((privateSec) => {

                    if(privateSec.documentNameField === name)
                    {
                        privateSec.image = image;
                    }
                });
            });

            SAVE_PRIVATE_SECTOR(privateSector);
        }

        InteractionManager.runAfterInteractions(() => {
            setTimeout(() => {
                Alert.alert('Success', 'Documents were successfully saved. You can continue from where you have stopped.');
            });
        });
    };
};

export const selectSector = (selectedSector) => {
    return {
        type: 'SELECT_SECTOR',
        payload: selectedSector
    };
};

export const selectSectorDocument = (selectedDocument) => {
    return {
        type: 'SELECT_SECTOR_DOCUMENT',
        payload: selectedDocument
    };
};

export const sectorDocumentData = [];
export const requiredSectorDocuments = (document, selectedDocumentName) => {

    const doc = document.find(x => x.documentNameField === selectedDocumentName);
    const data = {
        'DocumentImage': doc.image,
        'DocumentType': '',
        'DocumentTypeName': doc.documentNameField,
    };

    const res = (sectorDocumentData.findIndex(x => x.DocumentTypeName === selectedDocumentName));
    if(res >= 0)
    {
        const existingData = sectorDocumentData.find(x => x.DocumentTypeName === selectedDocumentName);
        existingData.DocumentImage = data.DocumentImage;
    }
    else
    {
        sectorDocumentData.push(data);
    }

    return {
        type: 'SECTOR_REQUIRED_DOCUMENT_DATA',
        payload: sectorDocumentData
    };
};

export const fetchPublicSectorList = () => {
    return async (dispatch) => {
        dispatch({ type: 'FETCH_SECTORS', payload: null });

        const publicSectorList = await GET_PUBLIC_SECTOR();
        if(publicSectorList.length > 0)
        {
            dispatch({ type: 'FETCH_PUBLIC_SECTOR_LIST', payload: publicSectorList });
        }
        else
        {
            dispatch({ type: 'FETCH_PUBLIC_SECTOR_LIST', payload: publicSector });
        }
    };
};

export const fetchPrivateSectorList = () => {
    return async (dispatch) => {

        dispatch({ type: 'FETCH_SECTORS', payload: null });

        const privateSectorList = await GET_PRIVATE_SECTOR();

        if(privateSectorList.length > 0)
        {
            dispatch({ type: 'FETCH_PRIVATE_SECTOR_LIST', payload: privateSectorList });
        }
        else
        {
            dispatch({ type: 'FETCH_PRIVATE_SECTOR_LIST', payload: privateSector });
        }
    };
};

export const resetSectorDocuments = () => {
    return {
        type: 'RESET_DOCUMENTS',
        payload: null
    };
};