import * as types from "../types/general";

const INITIAL_STATE = {
  loader: false,
  lang: localStorage.getItem("lang")
    ? localStorage.getItem("lang") === "en"
      ? "en"
      : "ar"
    : "en",
  snackbar: {
    visible: false,
    message: "",
    color: "",
  },
  historyPath: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_LOADER:
      return {
        ...state,
        loader: action.payload,
      };
    case types.SET_LANG:
      return {
        ...state,
        lang: action.payload,
      };
    case types.SET_SNACKBAR:
      return {
        ...state,
        snackbar: {
          visible: action.payload.visible,
          message: action.payload.message,
          color: action.payload.color,
        },
      };
    case types.SET_HISTORY_PATH:
      return { ...state, historyPath: action.payload };
    default:
      return state;
  }
};
