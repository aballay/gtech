import React from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import HomeController from './modules/home/homeController';
import Theme from './shared/utilities/material-ui/theme';
import {BrowserRouter} from 'react-router-dom';




function App() {

 

  return (
    <div className="App">
      <BrowserRouter>
        <Theme >
          <HomeController />
      </Theme>
    </BrowserRouter>
    </div>
  );
}

export default App;
