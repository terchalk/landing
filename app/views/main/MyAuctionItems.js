import React, { Component } from 'react';
import { connect } from 'react-redux';

import { myData } from '../common/MockData';
import Header from '../common/Header';
import styles from './myAuctionItems.scss';
import CardsContainer from './CardsContainer';

class MyAuctionItems extends Component {
  renderMyItems() {
    return (
      <CardsContainer data={myData} history={this.props.history}/>
    );
  }
  render() {
    return (
      <div className={styles.container}>
        <Header 
          history={this.props.history}
        />
        <div className={styles.items_list_first}>
          <h1 className={styles.title}>On Auction</h1>
          <div className={styles.cards}>
            {this.renderMyItems()}
          </div>
        </div>
          <div className={styles.items_list}>
          <h1 className={styles.title}>Recently Sold</h1>
          <div className={styles.cards}>
            {this.renderMyItems()}
          </div>
        </div>
      </div>
    );
  }
}

export default MyAuctionItems;
