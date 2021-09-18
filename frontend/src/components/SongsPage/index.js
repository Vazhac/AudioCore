// Display all songs in the database
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./SongsPage.css"
import { fetchSongs } from "../../store/songs";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function SongsPage() {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs.songs);

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch])

  // Display all songs in the database
  return (
    <div id="all-songs-page-container">
      <div id="all-songs-page-content">
        <h1>All Songs</h1>
        <ul>
          {songs?.map((song) => (
            <li key={song.id}>
              <NavLink to={`/songs/${song.id}`}>
                Track Title: {song.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SongsPage;
