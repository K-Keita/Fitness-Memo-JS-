import React from "react";
import App from "./App";
import createStore from "./reducks/store/store";
import ReactDOM from "react-dom";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import * as History from "history";
import * as serviceWorker from "./serviceWorker";
import "./styles/index.scss";

const history = History.createBrowserHistory();
export const store = createStore(history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
