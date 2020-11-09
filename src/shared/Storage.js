import { AsyncStorage } from 'react-native';

export const SAVE_PENCOMPIN = (pin) => {
    AsyncStorage.setItem('pencomPin', pin);
};

export const GET_PENCOMPIN = async () => {
    const value = await AsyncStorage.getItem('pencomPin');
    return value || '';
};

export const SAVE_TOKEN = (value) => {
    AsyncStorage.setItem('token', value);
};

export const GET_TOKEN = async () => {
    const value = await AsyncStorage.getItem('token');
    return value || '';
}

export const SAVE_EMAIL = (value) => {
    AsyncStorage.setItem('email', value);
};

export const GET_EMAIL = async () => {
    const value = await AsyncStorage.getItem('email');
    return value || '';
}

export const SAVE_PROFILE_PICTURE = (value) => {
    AsyncStorage.setItem('profile', value);
};

export const GET_PROFILE_PICTURE = async () => {
    const value = await AsyncStorage.getItem('profile');
    return value || '';
}

export const SAVE_FULLNAME = (value) => {
    AsyncStorage.setItem('fullname', value);
};

export const GET_FULLNAME = async () => {
    const value = await AsyncStorage.getItem('fullname');
    return value || '';
};

export const SAVE_MOBILE_NUMBER = (value) => {
    AsyncStorage.setItem('mobile_number', value);
};

export const GET_MOBILE_NUMBER = async () => {
    const value = await AsyncStorage.getItem('mobile_number');
    return value || '';
};

export const SAVE_FAQ = (value) => {
    AsyncStorage.setItem('faq', JSON.stringify(value));
};

export const GET_STORED_FAQ = async () => {
    const val = await AsyncStorage.getItem('faq');

    return val ? JSON.parse(val) : [];
};

export const SAVE_PUBLIC_SECTOR = (value) => {
    AsyncStorage.setItem('public_sector', JSON.stringify(value));
};

export const GET_PUBLIC_SECTOR = async () => {
    const val = await AsyncStorage.getItem('public_sector');

    return val ? JSON.parse(val) : [];
};

export const SAVE_PRIVATE_SECTOR = (value) => {
    AsyncStorage.setItem('private_sector', JSON.stringify(value));
};

export const GET_PRIVATE_SECTOR = async () => {
    const val = await AsyncStorage.getItem('private_sector');

    return val ? JSON.parse(val) : [];
};

export const SAVE_SUBSCRIPTION = (value) => {
    AsyncStorage.setItem('faq', JSON.stringify(value));
};

export const GET_STORED_SUBSCRIPTION = async () => {
    const val = await AsyncStorage.getItem('subscription');

    return val ? JSON.parse(val) : [];
};

export const SAVE_PRODUCT = (value) => {
    AsyncStorage.setItem('product', JSON.stringify(value));
};

export const GET_STORED_PRODUCT = async () => {
    const value = await AsyncStorage.getItem('product');

    return value ? JSON.parse(value) : [];
};

export const SAVE_BRANCH = (value) => {
    AsyncStorage.setItem('branch', JSON.stringify(value));
};

export const GET_STORED_BRANCH = async () => {
    const value = await AsyncStorage.getItem('branch');

    return value ? JSON.parse(value) : [];
};

export const STORE_BANK = (value) => {
    AsyncStorage.setItem('bank', JSON.stringify(value));
};

export const GET_STORED_BANK = async () => {
    const value = await AsyncStorage.getItem('bank');

    return value ? JSON.parse(value) : [];
};

export const STORE_PAYMENT_TYPE = (value) => {
    AsyncStorage.setItem('payment_type', JSON.stringify(value));
};

export const GET_STORED_PAYMENT_TYPE = async () => {
    const value = await AsyncStorage.getItem('payment_type');

    return value ? JSON.parse(value) : [];
};

export const STORE_ACTIVE_FUND_TYPES = (value) => {
    AsyncStorage.setItem('active_fund_types', JSON.stringify(value));
};

export const GET_ACTIVE_FUND_TYPES = async () => {
    const value = await AsyncStorage.getItem('active_fund_types');

    return value ? JSON.parse(value) : [];
};

export const SAVE_FEEDBACK = (value) => {
    AsyncStorage.setItem('feedback', value);
};

export const CHECK_FEEDBACK = async (compareValue) => {
    const value = await AsyncStorage.getItem('feedback');
    return value === compareValue;
};