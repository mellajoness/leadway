import React, {Component} from 'react';
import {View, FlatList, Modal, ScrollView, TouchableOpacity, Image, ImageBackground, SafeAreaView} from 'react-native';
import {CONTAINER_STYLE} from '../shared/Styles';
import {CommonHeader, BoldText, RegularText, CustomLoader} from '../components';
import {Divider, IconButton} from 'react-native-paper';
import {ACCENT_COLOR, DARK_COLOR, LIGHT_COLOR, PRIMARY_COLOR, TERTIARY_COLOR} from '../shared/Colors';
import {fetchProductList, setProductDetails, closeDetailModal, productListFeedback} from '../store/actions';
import {connect} from 'react-redux';
import {CHECK_FEEDBACK} from '../shared/Storage';
import {LOGGER} from '../shared/Methods';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

class ProductList extends Component {

    componentDidMount() {
        this.props.fetchProductList({});
    }

    _renderItem(item, index) {
        return (
            <View>
                <TouchableOpacity style={styles.backgroundLight} onPress={() => this.props.setProductDetails(item)}>
                    <View style={{flexDirection: 'row'}}>
                        {/*<Image source={this._icon(item.approvalIDField)}/>*/}
                        <Image
                            source={require('../assets/images/products.png')}
                            resizeMode='cover'
                        />
                        <Image source={require('../assets/images/line.png')} style={{marginStart: 10}}/>

                    </View>
                    <BoldText label={item.ProductHeader} size={18} style={{width: '65%', marginStart: 20}}
                              color={DARK_COLOR}/>
                    <Icon name={'navigate-next'} size={30} color={ACCENT_COLOR}/>
                </TouchableOpacity>

                <View style={{marginTop: 20}}/>
            </View>
        );


        {/*<List.Item*/
        }
        {/*title={<BoldText label={item.ProductHeader} />}*/
        }
        {/*description={<RegularText label={item.productDetails} size={14} />}*/
        }
        {/*onPress={() => this.props.setProductDetails(item)}*/
        }
        {/*/>*/
        }
    }

    requestBody(status, title) {
        return {
            FeedbackType: 'Product',
            Title: title,
            FeedbackStatus: status
        };
    }

    async checkProductFeedback(header) {
        const pencom = await CHECK_FEEDBACK(header);
        LOGGER('check feedback', pencom)
    }

    render() {

        const {loading, productList, showModal, closeDetailModal, selectedProduct} = this.props;
        return (
            <View style={CONTAINER_STYLE}>

                <CommonHeader
                    title='Products'
                    menuButtonPress={() => this.props.navigation.openDrawer()}
                />

                <View style={CONTAINER_STYLE}>
                    <FlatList
                        data={productList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => this._renderItem(item, index)}
                        ItemSeparatorComponent={Divider}
                    />
                </View>

                <Modal
                    visible={showModal}
                    animationType='fade'
                    onRequestClose={() => closeDetailModal()}
                >
                    <SafeAreaView style={{flex: 1}}>
                        <CommonHeader title='Product Details' backAction backActionPress={() => closeDetailModal()}/>

                        <ImageBackground
                            source={require('../assets/images/BG2.png')}
                            resizeMode='cover'
                            style={{flex: 1}}
                        >
                            <View style={{padding: 20}}>
                                <BoldText label={selectedProduct.ProductHeader} color={PRIMARY_COLOR} size={16}/>

                                <ScrollView style={{marginTop: 20}}>
                                    <RegularText label={selectedProduct.productDetails} size={14}
                                                 color={TERTIARY_COLOR}/>

                                    <View style={{marginTop: 30, alignItems: 'center'}}>
                                        <RegularText label='Was this helpful?' size={14}/>

                                        <View style={{flexDirection: 'row'}}>
                                            <IconButton
                                                icon='thumb-down'
                                                color='rgba(0,0,0,0.4)'
                                                onPress={() => this.props.productListFeedback(this.requestBody(0, selectedProduct.ProductHeader))}
                                                // onPress={() => this.checkProductFeedback(selectedProduct.ProductHeader)}
                                            />

                                            <IconButton
                                                icon='thumb-up'
                                                color='rgba(0,0,0,0.4)'
                                                onPress={() => this.props.productListFeedback(this.requestBody(1, selectedProduct.ProductHeader))}
                                            />
                                        </View>
                                    </View>
                                </ScrollView>
                            </View>
                        </ImageBackground>
                    </SafeAreaView>

                </Modal>

                <CustomLoader visible={loading}/>

            </View>
        );
    }
}

const styles = {
    backgroundLight: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
        justifyContent: 'space-between',
        backgroundColor: LIGHT_COLOR
    }
};

const mapStateToProps = (state) => {
    return state.productListData;
};

export default connect(mapStateToProps, {
    fetchProductList,
    setProductDetails,
    closeDetailModal,
    productListFeedback
})(ProductList);
