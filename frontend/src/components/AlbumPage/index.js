//Display an individual album
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"
import "./AlbumPage.css"
import { fetchAlbum, deleteAlbum } from '../../store/albums'
import EditAlbumModal from '../EditAlbumModal'

function AlbumPage() {
  const dispatch = useDispatch();
  const [album, setAlbum] = useState("");
  const history = useHistory();
  const { id } = useParams();
  const albums = useSelector(state => state.albums.album);
  const comments = useSelector(state => state.comments.comments);
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(fetchAlbum(id));
  }, [dispatch, id]);

  const handleDelete = () => {
    dispatch(deleteAlbum(+id));
    history.push("/albums");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAlbum = {
      userId: user.id,
      id: +id,
      imageUrl: album.imageUrl
    }
  };

  return (
    <div className="album-page">
      <div className="album-page-header">
        <div className="album-page-header-left">
          {albums?.map(album => {
            if (album.id === +id) {
              return (
                <div className="album-page-header-left-album-name" key={album.id}>
                  <h1>{album?.title}</h1>
                  <h2>By: {album?.User?.username}</h2>
                  <div className="album-page-container">
                    <div className="album-page-container-left">
                      <button onClick={() => history.push("/albums")}>Back to Albums</button>
                      {(user?.id === album.User?.id) ? (
                        <div className="album-page-container-right-edit">
                          {user?.id === album?.userId &&
                            <EditAlbumModal album={album} />}
                          <div className="album-page-container-right-delete">
                            <button onClick={handleDelete}>Delete</button>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              )
            }
          })}
        </div>
      </div>
    </div >
  );
}

export default AlbumPage;
