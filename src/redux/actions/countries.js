import * as types from "../types/countries";

export const receiveCountries = (payload) => ({
  type: types.RECEIVE_COUNTRIES,
  payload,
});
