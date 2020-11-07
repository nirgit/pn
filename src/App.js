import logo from './logo.svg';
import './App.css';

const triggerPushNotif = () => {
  fetch('/api/trigger-push', {method: 'GET'})
  .then(res => {
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
      <button onClick={triggerPushNotif}>send notif</button>
    </div>
  );
}

export default App;
