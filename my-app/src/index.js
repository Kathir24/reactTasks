import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import rootSaga from './sagas';
import { Provider } from 'react-redux'
import { reducer } from './reducer';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga);
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
  ,
  document.getElementById('root')
);

