// Display all songs in the database
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongs } from "../../store/songs";
import "./SongsPage.css"

function SongsPage() {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs.allSongs);

  useEffect(() => {
    dispatch(getSongs());
  }, []);


  console.log(songs);
  return (
    <div id="all-songs-page-container">
      <h1>Songs Page</h1>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            <a href={song.url}>{song.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SongsPage;
