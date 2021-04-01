import actionTypes from "../Action/action.types";

const intialState = {
   favBanks : null
};
const CONFIG = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.SET_FAV_BANKS:
      return { ...state, favBanks: action.payload };
    default:
      return state;
  }
};

export default CONFIG;
