import React from 'react';
import { Switch, Route } from 'react-router';
import Login from './pages/Login';
import TriviaScreen from './pages/TriviaScreen';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ TriviaScreen } />
      </Switch>
    </div>
  );
}
