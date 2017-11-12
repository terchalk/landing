import React, { Component } from 'react';
import { connect } from 'react-redux';

import AppIcons from '../common/AppIcons';
import Header from '../common/Header';
import MainView from './MainView';
import { reset } from '../mastercard_client';
import styles from './index.scss';

class Main extends Component {
  componentDidMount() {
    reset();
  }
  render() {
    return (
      <div className={styles.container}>
        <Header 
          history={this.props.history}
          fromMain
        />
        <MainView 
          history={this.props.history}
        />
      </div>
    )
  }
}

export default Main;
