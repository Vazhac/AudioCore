//Display all songs in an album
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"
import "./AlbumPage.css"
import { deleteAlbum } from '../../store/albums'
import EditFormModal from '../EditFormModal'

function AlbumPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const parsedId = parseInt(id)
  const album = useSelector(state => state.albums.find(album => album.id === parsedId));

  const handleDelete = () => {
    dispatch(deleteAlbum(album.id));
    history.push("/");
  };

  return (
    <div className="album-page">
      <div className="album-page-header">
        <h1>{album.title}</h1>
        <EditFormModal album={album} />
        <button onClick={handleDelete}>Delete</button>
      </div>
      <div className="album-page-songs">
      </div>
    </div>
  );
}

export default AlbumPage;
