import React from 'react';
import './App.css';

import SideMenu from './components/SideMenu.js';

import Home from './pages/Home.js';
import Minecraft from './pages/Minecraft.js';
import Discord from './pages/Discord.js';
import About from './pages/About.js';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <Route render={({ location, history }) => (
          <div>
            <SideMenu routLocation={location} routHistory={history}/>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/minecraft">
                <Minecraft />
              </Route>
              <Route path="/discord">
                <Discord />
              </Route>
              <Route path="/about">
                <About />
              </Route>
            </Switch>
          </div>
        )}/>
      </Router>
    </div>
  );
}

export default App;
