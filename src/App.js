import logo from './logo.svg';
import './App.css';

const sendNotification = () => {
  navigator.serviceWorker.ready.then(registration => {
      registration.showNotification("Hello from your service worker", {
        "actions": [
          { "action": "yes", "title": "Yes", "icon": "images/yes.png" },
          { "action": "no", "title": "No", "icon": "images/no.png" }
        ]
      })
  })
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <button onClick={sendNotification}>send notif</button>
    </div>
  );
}

export default App;
