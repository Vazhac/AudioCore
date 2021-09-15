// Display an individual song
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import "./SongPage.css"


//show the song page
function SongPage() {
  let { id } = useParams();
  const songs = useSelector((state) => state.songs.allSongs);
  const song = songs.find((song) => song.id === id);

  return (
    <div className="song-page">
      <div className="song-page__song-info">
        <h1 className="song-page__song-info__title">{song?.title}</h1>
        <h2 className="song-page__song-info__url">{song?.url}</h2>
        <h3 className="song-page__song-info__album">{song?.album}</h3>
      </div>
    </div>
  )
}

export default SongPage;
