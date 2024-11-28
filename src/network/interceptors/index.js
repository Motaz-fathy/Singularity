import { store } from "../../redux/storeConfig/store";
import { setLoader } from "../../redux/actions/general";
import { dispatchSnackbarError } from "../../utility/Utils";
import auth from "../../utility/auth";
import { loginReceive } from "../../redux/actions/auth";
import { setHistoryPath } from "../../redux/actions/general";
import messagesAr from "../../assets/data/locales/ar.json";
import messagesEn from "../../assets/data/locales/en.json";

export const isHandlerEnabled = (config = {}) => {
  return config.hasOwnProperty("handlerEnabled") && !config.handlerEnabled
    ? false
    : true;
};

export const requestHandler = (request) => {
  if (isHandlerEnabled(request)) {
    document.body.classList.add("loader_bg");
    store.dispatch(setLoader(true));

    const lang = localStorage.getItem("lang") || "en";
    request.headers["Locale"] = lang;

    const token = localStorage.getItem("token");
    if (token) {
      request.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return request;
};

export const successHandler = (response) => {
  if (isHandlerEnabled(response)) {
    document.body.classList.remove("loader_bg");
    store.dispatch(setLoader(false));
  }
  return response;
};

export const errorHandler = (error) => {
  if (isHandlerEnabled(error.config)) {
    document.body.classList.remove("loader_bg");
    store.dispatch(setLoader(false));
    const lang = store.getState().general.lang;
    const messages = lang === "en" ? messagesEn : messagesAr;
    if (error.response) {
      if (error.response.status === 403 || error.response.status === 401) {
        const lang = store.getState().general.lang;
        dispatchSnackbarError(error.response.data.message);
        auth.logout();
        store.dispatch(loginReceive({ token: "", user: {} }));
        store.dispatch(setHistoryPath(`/${lang}/login`));
      }
    } else if (error.message === "Network Error") {
      dispatchSnackbarError(messages.ERRORS.SOMETHING_WENT_WRONG_ERR_MSG);
    } else {
      dispatchSnackbarError(messages.ERRORS.SOMETHING_WENT_WRONG_ERR_MSG);
    }
  }
  return Promise.reject({ ...error });
};
