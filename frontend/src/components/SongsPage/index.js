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
    <div className="all-songs-page-container">
      <h1>All Songs</h1>
      <div className="all-songs-page-content">
        <div className="all-songs-page-songs">
          {songs?.map((song) => (
            <div key={song.id}>
              <NavLink to={`/songs/${song.id}`}>
                <div className="track-info">
                  <div className="post-username">Post by: {song.User.username}</div>
                  <div className="post-title">Title: {song.title}</div>
                  <div className="post-date">Created on: {song.createdAt}</div>
                </div>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SongsPage;
