import React, { Component } from 'react';
import { LineChart, ReferenceLine, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import styles from './priceChart.scss';

// Recommended data input
const product = {
  data: [
    {date: '15 Oct 2017', price: 250},
    {date: '16 Oct 2017', price: 238},
    {date: '17 Oct 2017', price: 230},
    {date: '18 Oct 2017', price: 235},
    {date: '19 Oct 2017', price: 238},
    {date: '20 Oct 2017', price: 245},
    {date: '21 Oct 2017', price: 242},
  ],
  rrp: 299
};

class PriceChart extends Component { 
  getYDomain() {
    const {data, rrp} = this.props;
    var min = rrp;
    var max = rrp;
    for (var point in data) {
      if (point.price < min) {
        min = point.price;
      }
      if (point.price > max) {
        max = point.price;
      }
    }
    return [Math.floor(min/100)*100, Math.ceil(max/100)*100];
  }

  render() {
    const {data, rrp} = this.props;

    return (
      <div className={styles.container}>
        <ResponsiveContainer width='100%' aspect={4.0/2.0}>
          <LineChart width={600} height={300} data={data}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey="date"/>
            <YAxis domain={this.getYDomain(product)}/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Line type="monotone" dataKey="price" stroke="#fd5c63" activeDot={{r: 8}}/>
            <ReferenceLine y={rrp} label="RRP" stroke="#fc2a33" strokeDasharray="10 10"/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default PriceChart;
