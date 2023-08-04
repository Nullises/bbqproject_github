import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './services/Firebase';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './styles/mainTheme'

ReactDOM.render(

  <CssBaseline>
    <MuiThemeProvider theme={theme}>
      <FirebaseContext.Provider value={new Firebase()}>
         <App />
      </FirebaseContext.Provider>
    </MuiThemeProvider>
  </CssBaseline>,
  document.getElementById('root'),
);  

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
