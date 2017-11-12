import ActionTypes from 'actions';

const { MAIN } = ActionTypes;

const defaultState = { 

};

const main = (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
      case MAIN.GET_DATA:
            return { ...state,  listings: payload.itemListings};
      default:
          return state;
    }
};

export default main;
