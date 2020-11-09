import React from 'react';
import {View, Dimensions, TouchableOpacity, Image} from 'react-native';
import {RegularText} from './RegularText';
import {BoldText} from './BoldText';
import {GRADIENT_COLOR} from '../shared/Colors';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import {LOGGER} from "../shared/Methods";

class DashboardCarousel extends React.Component {
    onRenderItem = ({item, index}) => {
        LOGGER('fund check', this.props.selectedFundCategory)
        return (
            <View style={{height: 150}}>
                <LinearGradient style={styles.linearStyle} start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                colors={GRADIENT_COLOR}>
                    <TouchableOpacity onPress={this.props.onPress}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

                            <Image source={require('../assets/images/wallet.png')} style={{top: 60, marginStart: 5}}/>

                            <View style={{
                                flexDirection: 'column',
                                marginStart: 20,
                                marginEnd: 5,
                                height: '100%',
                                justifyContent: 'space-evenly',
                                alignItems: 'flex-end'
                            }}>
                                <RegularText label={this.props.selectedFund + ' (NGN)'} size={14} color='white'/>
                                {/*<BoldText label='101,458,575.00' size={30} color='white' />*/}
                                <BoldText label={`${this.props.contributionValue}`} size={30} color='white'/>
                                <RegularText label={this.props.selectedFundCategory} size={15} color='white'/>
                            </View>
                        </View>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        );
    }

    render() {
        const items = this.props.items || [];

        return (
            <Carousel
                ref={ref => this.snap = ref}
                data={items}
                renderItem={this.onRenderItem}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={300}
                onSnapToItem={(slideIndex) => this.props.onScroll(this.snap.currentIndex)}
                // onScroll={(ev) => this.props.onScroll(this.snap.currentIndex)}
            />
        );
    }
}

const styles = {
    linearStyle: {
        borderRadius: 5,
        height: '100%',
        width: '100%',
    }
};

export default DashboardCarousel;
