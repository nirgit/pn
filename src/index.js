import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const VAPID_PUBLIC_KEY = 'BNjlC0ub2WVA5hGekdsX7bRJGQ_LpoVAujoJYA1cwDouBriHZBxQW_4Q_sLE7vSaoLQcbWqZNOhBQ9YBXQoR3YY';

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
  return new Promise((res, rej) => {
    if (!'serviceWorker' in navigator) {
      console.warn("No support for service worker :(")
      rej("No support for service worker :(")
      return;
    }
    // ask for permissions from the user
    Notification.requestPermission().then(result => {
      if (result !== 'granted') {
        rej("no permissions granted")
        return; // we didn't get any permissions :(
      }
      navigator.serviceWorker.register('./sw.js').then(registration => {
        console.log("Registered SW successfully")
        res(registration)
      }, error => {
        console.error("Failed registering SW", error)
        rej(error)
      })
    })
  })
}

function urlBase64ToUint8Array(base64Str) {
  const padding = '='.repeat((4 - base64Str.length % 4) % 4);
  base64Str = (base64Str + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const strAsBin = atob(base64Str)
  const ui8array = new Uint8Array(strAsBin.length)

  for (let i=0; i < strAsBin.length; i++) {
    let chai = strAsBin.charCodeAt(i)
    ui8array[i] = chai
  }

  return ui8array;
}

function subscribeToPushNotifs(swRegistration) {
  if (swRegistration === null) return
  const subscriptionOptions = {
    userVisibleOnly: true, // this means NOT a silent push, user will be shown the notif. every time a push happens. MUST be true
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
  }
  return swRegistration.pushManager.subscribe(subscriptionOptions)
}

function handleSubscription(pushSubscription) {
  // this is the stuff we need to send to the server to use later to send the user a PN
  console.log("Received Push Subscription and sending to server", JSON.stringify(pushSubscription, null, 4))
  return fetch('/api/save-push-sub', {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({data: pushSubscription})
  }).then(res => {
    if (!res.ok) {
      throw new Error('Bad status code from server.');
    }

    return res.json();
  })
  .then(function(responseData) {
    if (!(responseData.status && responseData.status === 'OK')) {
      throw new Error('Bad response from server.');
    }
  })
}

registerServiceWorker()
  .then(subscribeToPushNotifs)
  .then(handleSubscription)
