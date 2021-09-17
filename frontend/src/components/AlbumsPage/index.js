// Display all Albums in the database
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./AlbumsPage.css"

function AlbumsPage() {
  const albums = useSelector(state => state.albums);
  return (
    <div className="albums-page-container">
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
    </div>
  );
}

export default AlbumsPage;
