import React, {Component} from 'react';
import {View, WebView, Platform, Button} from 'react-native';
import {CONTAINER_STYLE} from '../../shared/Styles';
import {LOGGER} from "../../shared/Methods";
import {connect} from 'react-redux';

import Chart from 'react-native-chartjs';

class BarChart extends Component {

    render() {
        LOGGER('price chart X', this.props.priceChartXData);
        LOGGER('price chart Y', this.props.priceChartYData);

        const chartConfiguration = {
            type: 'bar',
            data: {
                labels: this.props.priceChartXData,
                datasets: [{
                    label: '# Price Chart',
                    data: this.props.priceChartYData,
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                maintainAspectRatio : false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        };

        return (
            <View style = {{ flex : 1 }}>
                <Chart chartConfiguration = {
                    chartConfiguration
                }
                       defaultFontSize={20}/>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return state.priceChartData;
};

export default connect(mapStateToProps, {})(BarChart);
