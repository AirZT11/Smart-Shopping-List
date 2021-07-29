import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import firebase from 'firebase/app';
import { useCollection } from 'react-firebase-hooks/firestore';
import 'firebase/firestore';
import getToken from './lib/tokens';
import Home from './components/containers/Home';
import GroceryContainer from './components/containers/GroceryContainer';
import AddItem from './components/AddItem';
import BottomNav from './components/BottomNav';
import { fb } from './lib/firebase';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      return setLoggedIn(true);
    }
  });

  const handleClick = () => {
    const token = getToken();
    localStorage.setItem('token', token);
    setLoggedIn(true);

    if (localStorage) {
      const ref = fb
        .firestore()
        .collection('groceries')
        .doc(localStorage.getItem('token'))
        .set({
          userToken: localStorage.getItem('token'),
        });
    } else {
    }
  };

  return (
    <div className="App">
      <Home setLoggedIn={setLoggedIn} />
      <button onClick={handleClick}>Create List...</button>
      <BottomNav />
      <Switch>
        <Route exact path="/">
          {loggedIn && <Redirect to="/list" />}
        </Route>
        <Route exact path="/list" component={GroceryContainer}>
          {!loggedIn && <Redirect to="/" />}
        </Route>
        <Route exact path="/add-an-item" component={AddItem}></Route>
      </Switch>
    </div>
  );
}

export default App;
