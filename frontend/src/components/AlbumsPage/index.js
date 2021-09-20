// Display all Albums in the database
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./AlbumsPage.css"
import { fetchAlbums } from "../../store/albums";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

//allow user to click on album and go to the album page and create a new album


const AlbumsPage = () => {
  const dispatch = useDispatch();
  const albums = useSelector(state => state.albums.albums);

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  return (
    <div className="albums-page-container">
      <h1>Albums</h1>
      <div className="albums-page-content">
        <div className="albums-page-albums">
          {albums?.length === 0 ? (
            <h2>No albums to display</h2>
          ) : (
            albums?.map(album => (
              <div className="album-container" key={album.id}>
                <NavLink to={`/albums/${album.id}`}>
                  <img src={album.imageUrl} alt={album.title} />
                  <h3>{album.title}</h3>
                </NavLink>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}


export default AlbumsPage;
