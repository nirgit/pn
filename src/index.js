import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

function registerServiceWorker() {
  if (!'serviceWorker' in navigator) {
    console.warn("No support for service worker :(")
    return
  }
  Notification.requestPermission().then(result => {
    if (result !== 'granted') {
      return;
    }
    navigator.serviceWorker.register('./sw.js').then(registration => {
      console.log("Registered SW successfully")
    }, error => {
      console.error("Failed registering SW", error)
    })
  })
}

registerServiceWorker();
