import React from 'react';
import { Switch, Route } from 'react-router';
import Login from './pages/Login';
import TriviaScreen from './pages/TriviaScreen';
import './App.css';
import Settings from './pages/Settings';
import FeedBack from './pages/FeedBack';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ TriviaScreen } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/feedback" component={ FeedBack } />
      </Switch>
    </div>
  );
}
