// Display all songs in the database
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./SongsPage.css"

function SongsPage() {
  const songs = useSelector((state) => state.songs.songs);

  // Display all songs in the database
  return (
    <div id="all-songs-page-container">
      <div id="all-songs-page-content">
        <h1>All Songs</h1>
        <ul>
          {songs?.map((song) => (
            <li key={song.id}>
              <NavLink to={`/songs/${song.id}`}>
                {song.title}
                {song.album}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SongsPage;
