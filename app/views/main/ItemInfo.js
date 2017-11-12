import React, { Component } from 'react';
import { connect } from 'react-redux';

import actions from 'actions/MainActionCreators';
import { bid, getWinningBid, updateData, verifyItemListing } from '../mastercard_client';
import Header from '../common/Header';
import PriceChart from '../common/PriceChart';
import { globalData } from '../common/MockData';
import styles from './itemInfo.scss'
import { Button, Image, Modal, Segment, Grid, Loader, Dimmer, Label, Popup, Header as SemanticHeader, Divider } from 'semantic-ui-react'
import ReactJson from 'react-json-view'
import {verifyBid} from '../mastercard_client'

class ItemInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      secondsRemaining: 5,
      priceNow: 0,
      showTimer: true,
      listing: null,
      winningBid: null,
      verifyItemListing: null,
    }

    this.priceFloor = 259;
    this.timeInterval = 0;
  }
  componentWillMount() {
    this.props.dispatch(actions.update());
  }
  componentDidMount() {
    /// const user = globalData[this.props.match.params.id];

    // this.setState({priceNow: user.price, secondsRemaining: user.time_interval});
    // this.timeInterval = user.time_interval;
    // this.priceFloor = user.price_floor;

    this.interval = setInterval(this.tick.bind(this), 1000);
    this.tick();
  }
  updatePriceNow(data) {
    for (const listing of data.itemListings) {
      if (listing.webId == parseInt(this.props.match.params.id, 10)) {
        if (!this.state.verifyItemListing) {
          verifyItemListing(listing.id)
            .then(verifyItemListing => {
              this.setState({ verifyItemListing });
            });
        }

        const timeDiff = Date.now() - parseInt(listing.startTimestamp, 10);
        const fallCounts = Math.floor(timeDiff / listing.fallTimeInterval);
        const amountReduced = fallCounts * listing.fallAmount;
        let priceNow = listing.maxPrice - amountReduced;

        let showTimer = true;
        if (priceNow < listing.minPrice) {
          priceNow = listing.minPrice;
          showTimer = false;
        }

        const winningBid = getWinningBid(listing);
        if (winningBid) {
          console.log('There was a winning bid of', winningBid);
          showTimer = false;
        }

        if (!showTimer) {
          clearInterval(this.interval);
        }

        this.setState({
          priceNow,
          showTimer,
          listing,
          winningBid,
          secondsRemaining: Math.ceil(((1 + fallCounts) * listing.fallTimeInterval - timeDiff) / 1000)
        });
      }
    }
  }
  componentWillUpdate(nextProps, nextState) {
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  isStillBuyable() {
    let modifier = '';

    if (!this.state.showTimer) {
      modifier = '--greyed';
    }

    return modifier;
  }

  bid() {
    if (this.state.listing && this.state.listing.id)
    bid(this.state.listing.id, this.state.priceNow);
  }

  tick() {
    // const user = globalData[this.props.match.params.id];
    this.props.dispatch(actions.update());

    // this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    // if (this.state.secondsRemaining <= 0) {
    //   this.setState({secondsRemaining: this.timeInterval});

    //   if (this.state.priceNow - 10 <= this.priceFloor) {
    //     this.setState({priceNow: this.priceFloor, showTimer: false});
    //     clearInterval(this.interval);
    //   } else {
    //     this.setState({priceNow: this.state.priceNow - 10});
    //   }
    // }

    updateData().then(data => {
      this.updatePriceNow(data);
    });
  }
  renderFeed() {
    return feedData.map((data, index) => {
      return (
        <div key={index}>
          <img src={data.image}/>
          <h4>
            {data.username}{data.updateType}
            <span>{data.amount}</span>
          </h4>
        </div>
      );
    });
  }
  renderTitleAndLiveFeed() {
    const user = globalData[this.props.match.params.id];

    return (
      <div className={styles.feed_container}>
        <section className={styles.item_section}>
          <h1 className={styles.item_title}>{user.full_title}</h1>
          <h4 className={styles.item_desc}>{user.desc}</h4>
        </section>
        <section className={styles.buy_now_section}>
          <div className={styles.price_now_container}>
            <h4 className={styles.price_title}>Current Price</h4>
            <h1 className={`${styles.price_value}${this.isStillBuyable()}`}>{`$${this.state.priceNow}`}</h1>
          </div>
          <div className={styles.purchase_now} onClick={() => this.state.showTimer ? this.bid() : null}>
            {this.state.showTimer ? null: <WinningModal winningBid={this.state.winningBid}/>}
            <div className={`${styles.purchase_now_btn}${this.isStillBuyable()}`}>
              <a className={styles.purchase_atag}>
                {this.state.showTimer ? `Buy Now` : `Auction Ended`}
              </a>
            </div>
            <h4 className={`${styles.next_price}${this.isStillBuyable()}`}>
              {this.state.showTimer ? `Price change in ${this.state.secondsRemaining} seconds` : 'Item is sold!'}
            </h4>
          </div>
        </section>
        <section className={styles.purchase_section}>
          <div className={styles.bid_container}>
            <h4 className={styles.bid}>Max Bid</h4>
            <input className={styles.input} placeholder={`$${this.state.priceNow}`}/>
            <h4 className={styles.price_greyed}>${this.state.priceNow} or less</h4>
          </div>
          <div className={styles.purchase_container}>
            <div className={`${styles.purchase_btn}${this.isStillBuyable()}`}>
              <a className={styles.purchase_atag}>
                {this.state.showTimer ? `Place Bid` : `Auction Ended`}
              </a>
            </div>
            <h4 className={styles.price_greyed}>4 users tracking</h4>
          </div>
        </section>
        <section className={styles.graph_section}>
          <h1 className={styles.item_title}>Trends</h1>
          <PriceChart
            data={user.price_history}
            rrp={user.price}
          />
        </section>
      </div>
    );
  }
  renderImageAndInfo() {
    const user = globalData[this.props.match.params.id];

    return (
      <div className={styles.info_container}>
        <img className={styles.image} src={user.image}/>
        <Popup
          trigger={<Button className={styles.pop_up} color='green' content='Verify item listing' />}
          content={
            <div className={styles.header_info}>
              {
                this.state.listing &&
                <SemanticHeader className={styles.header_break} size='large'>Item hash: {this.state.listing.id}</SemanticHeader>
              }
              <Divider />
              {
                this.state.verifyItemListing &&
                <ReactJson src={this.state.verifyItemListing.payload} />
              }
            </div>
          }
          position='bottom left'
          on="click">
        </Popup>
        {/* <div className={styles.info_desc}>
          <div className={styles.verify_container}>
            <h4 className={styles.verify_head}>Test</h4>
            <h4 className={styles.verify_head}>Test</h4>
          </div>
          <div className={styles.verify_container}>
            <h4 className={styles.verify_head}>Test</h4>
            <h4 className={styles.verify_head}>Test</h4>
          </div>
        </div> */}
      </div>
    );
  }
  render() {
    return (
      <div className={styles.view}>
        <Header
          history={this.props.history}
        />
        <div className={styles.container}>
          {this.renderTitleAndLiveFeed()}
          {this.renderImageAndInfo()}
        </div>
      </div>
    );
  }
}

class WinningModal extends Component {
  constructor() {
    super()
    this.state = {
      fetchingFromBlock: false,
      showData: false,
      src: {}
    }
  }
  handleClick = () => {
    this.setState({
      fetchingFromBlock: true
    })
    verifyBid(this.props.winningBid && this.props.winningBid.id).then(data => {
      this.setState({
        fetchingFromBlock: false,
        showData: true,
        src: data
      });
    });
  }

  handleClose = () => {
    this.setState({
      fetchingFromBlock: false,
      showData: false
    })
  }

  renderLoader() {
    return (
      <div className={styles.loader_container}>
        <Dimmer active={this.state.fetchingFromBlock} inverted>
          <Loader
            disabled={!this.state.fetchingFromBlock}
            inverted
            inline
            content='Fetching data from blockchain...' />
        </Dimmer>
      </div>
    )
  }
  render() {
    const { winningBid } = this.props
    return (
      <Modal
        size="small"
        onClose={this.handleClose}
        trigger={
        <Button
          className={styles.winning_bid_modal}
          primary>
          Show winning bid
        </Button>
      }>
        <Modal.Header>Winning hash: {winningBid && winningBid.id}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            {!this.state.showData &&
              <Grid centered><Button primary onClick={this.handleClick}>Verify fields</Button></Grid>}
            {this.renderLoader()}
            {this.state.showData && <ReactJson src={this.state.src.payload} />}
            {
              this.state.showData &&
              <Segment>
                <span>verify(bidderId, bidderSignature, data) </span><Label color={'green'}>True</Label>
              </Segment>
            }
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
    listings: state.Main.listings
});

export default connect(mapStateToProps)(ItemInfo);
