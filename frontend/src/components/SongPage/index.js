// Display an individual song
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"
import "./SongPage.css"
import { deleteSong } from '../../store/songs'

function SongPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  let { id } = useParams();
  const songs = useSelector((state) => state.songs.allSongs);
  let currentSong;

  songs.forEach((song) => {
    if (song.id === +id) {
      currentSong = song;
    }
  });

  //delete song from database when delete button is clicked
  const onDelete = () => {
    dispatch(deleteSong(currentSong))
    return history.push('/songs');
  };


  return (
    <div className="song-page">
      <div className="song-page__song-info">
        <h1 className="song-page__song-info__title">{currentSong?.title}</h1>
        <h2 className="song-page__song-info__url">{currentSong?.url}</h2>
        {/* <audio controls>
          <source src={currentSong.url} type="audio/mpeg" />
        </audio> */}
        <h3 className="song-page__song-info__album">{currentSong?.album}</h3>
        {/* button to delete the song */}
        <button>Edit Song Details</button>
        <button onClick={onDelete}>Delete Song</button>
      </div>
    </div>
  )
}

export default SongPage;
