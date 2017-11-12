import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';

import { cardData, appleData } from '../common/MockData';
import CardsContainer from './CardsContainer';
import styles from './mainView.scss';

class MainView extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    //post reset api
  }
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.section}>
          <h2 className={styles.category_title}>Apple Products</h2>
          <CardsContainer data={appleData} history={this.props.history}/>
        </div>
        <div className={styles.section}>
          <h2 className={styles.category_title}>Other Gadgets</h2>
          <CardsContainer data={cardData} history={this.props.history}/>
        </div>
      </div>
    );
  }
}

export default connect()(MainView);