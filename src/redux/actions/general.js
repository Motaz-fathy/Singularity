import * as types from "../types/general";

export const setLoader = (payload) => ({
  type: types.SET_LOADER,
  payload,
});
export const setLang = (payload) => ({
  type: types.SET_LANG,
  payload,
});
export const setSnackbar = (payload) => ({
  type: types.SET_SNACKBAR,
  payload,
});
export const setHistoryPath = (payload) => ({
  type: types.SET_HISTORY_PATH,
  payload,
});
