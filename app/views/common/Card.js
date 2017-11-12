import React, { Component } from 'react';

import AppIcons from '../common/AppIcons';
import styles from './card.scss';

class Card extends Component {
  seeMoreInfo(id) {
    this.props.expandItem && this.props.expandItem(id);
  }
  render() {
    const info = this.props.cardInfo;
    return (
      <a className={styles.card} onClick={this.seeMoreInfo.bind(this, info.id)}>
        <img className={styles.item_image} src={info.image}/>
        <div className={styles.payment}>
          <div className={styles.payment_info}>
            <h4 className={styles.price_amt}>{`$${info.price}`}</h4>
            <h4 className={styles.item_title}>{info.title}</h4>
          </div>
          <div className={styles.payment_profile}>
            <div className={styles.card_icon}>
              {AppIcons.profileIcon}
            </div>
            <h4 className={styles.auction_num_peeps}>{`${info.numPeeps} bids currently`}</h4>
          </div>
        </div>
      </a>
    );
  }
}

export default Card;
