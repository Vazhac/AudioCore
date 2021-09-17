import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SongsPage from "./components/SongsPage";
import SongPage from "./components/SongPage";
import HomePage from "./components/HomePage";
import AlbumsPage from "./components/AlbumsPage";
import AlbumPage from "./components/AlbumPage";
import { fetchSongs } from "./store/songs"
import { fetchAlbums } from "./store/albums"
import AudioPlayer from "./components/AudioPlayer";
import UploadFormPage from "./components/UploadFormPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(fetchSongs())
    dispatch(fetchAlbums())
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
            <AudioPlayer />
          </Route>
          <Route exact path="/songs">
            <SongsPage />
            <AudioPlayer />
          </Route>
          <Route path="/songs/:id">
            <SongPage />
            <AudioPlayer />
          </Route>
          <Route path="/albums">
            <AlbumsPage />
            <AudioPlayer />
          </Route>
          <Route path="/albums/:id">
            <AlbumPage />
            <AudioPlayer />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
            <AudioPlayer />
          </Route>
          <Route path="/upload">
            <UploadFormPage />
            <AudioPlayer />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
