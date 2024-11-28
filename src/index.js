// ** React Imports
import { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
// ** Redux Imports
import { Provider } from "react-redux";
import { store } from "./redux/storeConfig/store";

// ** Toast & ThemeColors Context
import { ToastContainer } from "react-toastify";
import { ThemeContext } from "./utility/context/ThemeColors";
import { IntlProviderWrapper } from "./utility/context/Internationalization";

// ** Ripple Button
import "./@core/components/ripple-button";

// ** PrismJS
import "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-jsx.min";

// ** React Perfect Scrollbar
import "react-perfect-scrollbar/dist/css/styles.css";

// ** React Toastify
import "@styles/react/libs/toastify/toastify.scss";

// ** Core styles
import "./@core/assets/fonts/feather/iconfont.css";
import "./@core/scss/core.scss";
import "./assets/scss/style.scss";
import "./assets/scss/style-rtl.scss";

import '../node_modules/font-awesome/css/font-awesome.min.css';

// ** Service Worker
import * as serviceWorker from "./serviceWorker";

import Loader from "./components/Loader/Loader";

// ** Lazy load app
const LazyApp = lazy(() => import("./App"));

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<Loader />}>
      <ThemeContext>
        <IntlProviderWrapper>
          <LazyApp />
          <ToastContainer newestOnTop />
        </IntlProviderWrapper>
      </ThemeContext>
    </Suspense>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
