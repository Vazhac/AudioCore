//Display an individual album
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"
import "./AlbumPage.css"
import { fetchAlbums, deleteAlbum } from '../../store/albums'
import EditAlbumModal from '../EditAlbumModal'

function AlbumPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const albums = useSelector(state => state.albums.album);
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    // dispatch(fetchAlbum(id));
    dispatch(fetchAlbums());
  }, [dispatch, id]);

  const handleDelete = () => {
    dispatch(deleteAlbum(+id));
    history.push("/albums");
  };

  return (
    <div className="album-page">
      <div className="album-page-header">
        <h1>To Do...</h1>
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
