import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import NewUploadFormPage from "./components/NewUploadFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SongsPage from "./components/SongsPage";
import HomePage from "./components/HomePage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/songs">
            <SongsPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/upload">
            <NewUploadFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
