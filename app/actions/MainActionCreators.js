import ActionTypes from 'actions';
import { updateData } from '../views/mastercard_client';

const { MAIN } = ActionTypes;

const update = () => (dispatch, getState) => { 
    return updateData().then(data => {
      dispatch({ type: MAIN.GET_DATA, payload: data});
    });
};

export default {
  update
};
