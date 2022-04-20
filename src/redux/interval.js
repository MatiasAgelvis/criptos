import { initialIntervalState } from "./initialStates";
//////////////////
// ACTIONS
//////////////////

///////// TYPES
//////////////////

const SET_INTERVAL = "SET_INTERVAL";

///////// CREATORS
//////////////////

export const setInterval = (value) => ({
  type: "SET_INTERVAL",
  payload: value,
});

//////////////////
// MIDDLEWARE
//////////////////

export const dispatchInterval = (interval) => (dispatch) => {
  dispatch(setInterval(interval));
};

//////////////////
// REDUCER
//////////////////
export default function reducer(state = initialIntervalState, action) {
  switch (action.type) {
    case SET_INTERVAL:
      return {
        ...state,
        interval: action.payload,
      };
    default:
      return state;
  }
}
