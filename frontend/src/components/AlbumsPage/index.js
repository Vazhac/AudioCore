// Display all Albums in the database
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./AlbumsPage.css"
import { fetchAlbums } from "../../store/albums";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Navigation from '../Navigation';
import AudioPlayer from '../AudioPlayer'

function AlbumsPage() {
  const albums = useSelector(state => state.albums.albums);
  return (
    <div className="albums-page-container">
      <Navigation />
      <h1>Albums</h1>
      <div className="albums-page">
        {albums?.map(album => (
          <div className="album-card" key={album?.id}>
            <NavLink to={`/albums/${album?.id}`}>
              <img src={album?.imageUrl} alt={album?.title} />
              <h3>{album?.title}</h3>
            </NavLink>
          </div>
        ))}
      </div>
      <AudioPlayer />
    </div>
  );
}

export default AlbumsPage;