require("babel-polyfill");
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Route, applyRouterMiddleware, Switch } from 'react-router';
import { ConnectedRouter, routerMiddleware, routerReducer, push } from 'react-router-redux';
import thunk from 'redux-thunk';

import createHistory from 'history/createHashHistory';
import './styles/main/common.scss';
import Main from './views/main/';
import MyAuctionItems from './views/main/MyAuctionItems';
import ItemInfo from './views/main/ItemInfo';
import reducers from './reducers';

const historyCreated = createHistory();
const routeMiddleware = routerMiddleware(historyCreated);
const store = createStore(
  combineReducers({
      ...reducers,
      routing: routerReducer
  }),
  applyMiddleware(routeMiddleware, thunk)
);

const routes = (
  <Provider store={store}>
      <ConnectedRouter history={historyCreated}>
          <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/myauction" component={MyAuctionItems} />
              <Route exact path="/item" component={ItemInfo} />
              <Route exact path="/item/:id" component={ItemInfo} />
          </Switch>
      </ConnectedRouter>
  </Provider>
);

const render = () => {
    ReactDOM.render(routes, document.getElementById('main-app'));
};

render();
store.subscribe(render);
