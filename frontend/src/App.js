import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import HomePage from "./components/HomePage";
import AudioPlayer from "./components/AudioPlayer";
import Navigation from "./components/Navigation";
import SongPage from "./components/SongPage";
import SongsPage from "./components/SongsPage";
import AlbumPage from "./components/AlbumPage";
import AlbumsPage from "./components/AlbumsPage";
import UploadFormPage from "./components/UploadFormPage";
import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>

      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/songs">
            <SongsPage />
          </Route>
          <Route exact path="/songs/:id">
            <SongPage />
          </Route>
          <Route exact path="/albums">
            <AlbumsPage />
          </Route>
          <Route exact path="/albums/:id">
            <AlbumPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/upload">
            <UploadFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
