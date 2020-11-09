import React from 'react';
import { View } from 'react-native';
// import PureChart from 'react-native-pure-chart';

let data = [
    {
    seriesName: 'series1',
    data: [
      {x: '2018-02-01', y: 30},
      {x: '2018-02-02', y: 200},
      {x: '2018-02-03', y: 170},
      {x: '2018-02-04', y: 250},
      {x: '2018-02-05', y: 10}
    ],
    color: '#297AB1'
  }
]

export default () => (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {/*<PureChart style={{height: '100%'}} data={data} type='line' />*/}
    </View>
)