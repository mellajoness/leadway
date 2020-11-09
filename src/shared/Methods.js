import { DatePickerAndroid, Alert } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const monthStrings = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
];

export const ANDROID_DATE_PICKER = async (selectedDate) => {
    try {
        const { action, year, month, day } = await DatePickerAndroid.open({
            date: selectedDate
        });

        if (action !== DatePickerAndroid.dismissedAction) {
            // return `${day}/${monthStrings[month]}/${year}`;
            const mont = month + 1;
            return `${year}-${mont}-${day}`;
        }

        return '';
    } catch ({code, message}) {
        Alert.alert(code, message);
        return '';
    }
};

export const DEVICE_ID = () => {
    LOGGER('device id', DeviceInfo.getUniqueID());
    return DeviceInfo.getUniqueID();
}

export const LOGGER = (key, whatToLog) => {
    console.log(key.toUpperCase(), whatToLog);
};
