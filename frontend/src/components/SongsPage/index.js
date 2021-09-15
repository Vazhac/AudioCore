// Display all songs in the database
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./SongsPage.css"

function SongsPage() {
  const songs = useSelector((state) => state.songs.allSongs);

  return (
    <div id="all-songs-page-container">
      <h1>Songs Page</h1>
      <ul>
        {songs?.map((song) => (
          <li key={song.id}>
            <NavLink to={`/songs/${song.id}`}>
              {song.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SongsPage;
