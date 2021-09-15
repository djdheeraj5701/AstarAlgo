import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {createStore} from 'redux';
import { Provider } from 'react-redux';
import allReducers from'./reducers';

const store = createStore(
  allReducers, /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// import {createStore} from 'redux';
// // STORE - a globalised state for every component in the app

// // ACTION - operations to be performed on state
// const increment=()=>{
//   return{
//     type:"INCREMENT"
//   }
// }
// const decrement=()=>{
//   return{
//     type:"DECREMENT"
//   }
// };

// // REDUCER - based on action recreates the state
// const counter=(state=0,action)=>{
//   switch(action.type){
//     case 'INCREMENT': return state+1;
//     case 'DECREMENT': return state-1;
//   }
// };

// let store=createStore(counter);

// // display in console
// store.subscribe(()=>console.log(store.getState()));

// // DISPATCH - sends the action to reducer and ....
// store.dispatch(increment());

// store.dispatch(increment());



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
