import React, { Component } from 'react';
import { View , StyleSheet, Dimensions} from 'react-native';
import { CONTAINER_STYLE } from '../../shared/Styles';
import { CommonHeader} from '../../components';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import BarChart from './BarChart';
import LineChart from './LineChart';
import {PRIMARY_COLOR, TERTIARY_COLOR} from "../../shared/Colors";

class Chart extends Component {

    state = {
        index: 0,
        routes: [
            { key: 'line', title: 'Line' },
          { key: 'bar', title: 'Bar' },
        ],
      };

    render() {

        return (
            <View style={CONTAINER_STYLE}>

                <CommonHeader
                    title='Chart'
                    backAction
                    backActionPress={() => this.props.navigation.goBack()}
                />
                <LineChart/>

                {/*<TabView*/}
                {/*    navigationState={this.state}*/}
                {/*    renderScene={SceneMap({*/}
                {/*    line: LineChart,*/}
                {/*    bar: BarChart,*/}
                {/*    })}*/}
                {/*    renderTabBar={props =>*/}
                {/*        <TabBar*/}
                {/*            {...props}*/}
                {/*            indicatorStyle={{ backgroundColor: TERTIARY_COLOR}}*/}
                {/*            style={{ backgroundColor: PRIMARY_COLOR }}*/}
                {/*        />*/}
                {/*    }*/}
                {/*    onIndexChange={index => this.setState({ index })}*/}
                {/*    initialLayout={{ width: Dimensions.get('window').width }}*/}
                {/*/>*/}

            </View>
        );
    }
}

export default Chart;
