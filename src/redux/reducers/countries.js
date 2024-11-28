import * as types from "../types/countries";

const initialState = {
  countries: [],
  countriesOptions: [],
};

const countriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_COUNTRIES:
      const countriesOptions = action.payload?.data.map((country) => ({
        label: country.name,
        value: country.id,
      }));

      return { ...state, countries: action.payload.data, countriesOptions };
    default:
      return state;
  }
};

export default countriesReducer;
