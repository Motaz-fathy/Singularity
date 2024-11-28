import * as types from "../types/auth";

export const loginReceive = (payload) => ({
  type: types.LOG_IN_RECEIVE,
  payload,
});
