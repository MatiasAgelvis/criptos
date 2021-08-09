import { initialCoinState } from "./initialStates";

//URL
const BASE_URL = "https://api.coincap.io/v2/";

// assets?limit=10

//TYPES
const GET_ALL_COINS = "GET_ALL_COINS";
const GET_NEXT_PAGE_COINS = "GET_NEXT_PAGE_COINS";

//REDUCER
export default function reducer(state = initialCoinState, action) {
  switch (action.type) {
    case GET_ALL_COINS:
      return {
        ...state,
        data: action.payload,
      };
    case GET_NEXT_PAGE_COINS:
      return {
        ...state,
        offset: action.payload.offset,
        data: [...state.data, ...action.payload.data],
      };
    default:
      return state;
  }
}

//ACTIONS
export const getAllCoins = () => async (dispatch, getState) => {
  try {
    const response = await fetch(`${BASE_URL}assets?offset=0&limit=5`);
    const { data } = await response.json();
    dispatch({
      type: GET_ALL_COINS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const nextPageCoins = () => async (dispatch, getState) => {
  const { offset } = getState().coins;
  const paginate = (offset + 5);
  try {
    const response = await fetch(`${BASE_URL}assets?offset=${paginate}&limit=5`);
    const { data } = await response.json();
    dispatch({
      type: GET_NEXT_PAGE_COINS,
      payload: {
        data,
        offset:paginate
      },
    });
  } catch (error) {
    console.log(error);
  }
};


