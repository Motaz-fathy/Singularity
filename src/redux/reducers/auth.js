import * as types from "../types/auth";

const INITIAL_STATE = {
  userData: localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : {},
  token: localStorage.getItem("token") || "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LOG_IN_RECEIVE:
      return {
        ...state,
        userData: { ...action.payload.user },
        token: action.payload.token,
      };
    case "LOGOUT":
      return { ...state, userData: {}, token: "" };
    default:
      return state;
  }
};
