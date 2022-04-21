import { initialIntervalState } from "./initialStates";
//////////////////
// ACTIONS
//////////////////

///////// TYPES
//////////////////

const SET_INTERVAL = "SET_INTERVAL";
const SET_DATA_SLICE = "SET_DATA_POINTS";

///////// CREATORS
//////////////////

export const setInterval = (value) => ({
  type: SET_INTERVAL,
  payload: value,
});

export const setDataSlice = (value) => ({
  type: SET_DATA_SLICE,
  payload: value,
});

//////////////////
// MIDDLEWARE
//////////////////

export const dispatchInterval = (interval) => (dispatch) => {
  dispatch(setInterval(interval));
};

export const dispatchDataSlice = (slice) => (dispatch) => {
  dispatch(setDataSlice(slice));
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
     case SET_DATA_SLICE:
      return {
        ...state,
        slice: action.payload,
      };
    default:
      return state;
  }
}
