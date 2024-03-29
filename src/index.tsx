import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './app/App';
import {Provider} from 'react-redux';
import {store} from './app/store';
import AppWithReducers from './trash/AppWithReducers';
import {HashRouter} from 'react-router-dom';
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";


ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <DevSupport ComponentPreviews={ComponentPreviews}
                  useInitialHook={useInitial}
      >
        <App/>
      </DevSupport>
    </HashRouter>
  </Provider>
  ,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
