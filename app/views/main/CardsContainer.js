import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';

import actions from 'actions/MainActionCreators';
import AppIcons from '../common/AppIcons';
import Card from '../common/Card';
import styles from './cardsContainer.scss';

class CardsContainer extends Component {
  constructor(props) {
    super(props);

    this.onPrev = this.onPrev.bind(this);
    this.onNext = this.onNext.bind(this);
    this.goToItem = this.goToItem.bind(this);
  }
  onPrev() {
    this.slider.slickPrev()
  }
  onNext() {
    this.slider.slickNext()
  }
  goToItem(id) {
    this.props.history.push(`item/${id}`)
  }
  renderPrevArrow() {
    return (
      <a className={styles.arrow_back} onClick={this.onPrev}>
        {AppIcons.backButton}
      </a>
    );
  }
  renderNextArrow() {
    return (
      <a className={styles.arrow} onClick={this.onNext}>
        {AppIcons.forwardButton}
      </a>
    );
  }
  render() {
    const settings = {
      infinite: true,
      speed: 500,
      arrows: false,
      slidesToScroll: 1,
      responsive: [ 
        { breakpoint: 472, settings: { slidesToShow: 1 } }, 
        { breakpoint: 640, settings: { slidesToShow: 2 } }, 
        { breakpoint: 900, settings: { slidesToShow: 3 } }, 
        { breakpoint: 1200, settings: { slidesToShow: 4 } }, 
        { breakpoint: 100000, settings: { slidesToShow: 4 } } 
      ],
      swipe: true,
      swipeToSlide: true,
      pauseOnHover: true,
      autoplay: true,
      autoplaySpeed: 2000,
      centerPadding: 0
    }

    return (
      <div className={styles.cards}>
        {this.renderPrevArrow()}
          <Slider ref={c => this.slider = c } {...settings}>
            { this.props.data.map((info, index) => {
              return (
                <div className={styles.container} key={index}>
                  <Card cardInfo={info} expandItem={this.goToItem} />
                </div>
              );
            })}
          </Slider>
        {this.renderNextArrow()}
      </div>
    );
  }
}

export default connect()(CardsContainer);
