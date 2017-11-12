import React, { Component } from 'react';

import AppIcons from './AppIcons';
import styles from './header.scss';

class Header extends Component {
constructor(props) {
    super(props);

    this.state = {
      selected: 0
    }
  }
  changeSelected(selected) {
    this.setState({ selected });
  }
  statusModifier(tab) {
    let modifier = "";

    if (this.state.selected === tab) {
      modifier = "--selected";
    }

    return modifier;
  }
  goToMyAuctions = () => {
    this.props.history.push('/')
  }
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.appbar}>
          <a style={{display: 'flex'}} onClick={this.goToMyAuctions}>
            <div className={styles.logo}>
              {AppIcons.mainLogo}
            </div>
            <h3 className={styles.appbar_text}>Leylong</h3>
          </a>
          { !this.props.fromMain &&
            <div className={styles.icon} onClick={this.goToMyAuctions}>
              {AppIcons.mobileIcon}
              <a className={styles.icon_text}>
                View other items
              </a>
            </div>
          }
        </div>
        <div>
        { this.props.fromMain && 
          <div className={styles.selector}>
            <div className={`${styles.item}${this.statusModifier(0)}`}>
              <a className={`${styles.item_text}${this.statusModifier(0)}`} onClick={this.changeSelected.bind(this, 0)}>
                Latest
              </a>
            </div>
            <div className={`${styles.item}${this.statusModifier(1)}`}>
              <a className={`${styles.item_text}${this.statusModifier(1)}`} onClick={this.changeSelected.bind(this, 1)}>
                Recommended
              </a>
            </div>
            <div className={`${styles.item}${this.statusModifier(2)}`}>
              <a className={`${styles.item_text}${this.statusModifier(2)}`} onClick={this.changeSelected.bind(this, 2)}>
                Trending
              </a>
            </div>
           </div>
        }
        </div>
      </div>
    );
  }
}

export default Header;
