import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './EditAlbum.css';
import { fetchAlbum, editAlbum } from '../../store/albums'
import { useHistory } from "react-router-dom";

//ask for title and description and url for song
function EditForm({ album }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const id = album?.id;
  const [title, setTitle] = useState(album?.title);
  const [url, setUrl] = useState(album?.imageUrl);
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const album = {
      title,
      url,
      id,
      userId: sessionUser.id, //this is the userId of the user who is logged in
    }
    setErrors([]);
    if (title === "" || url === "") {
      setErrors(["Please fill out all required fields"]);
    } else {
      dispatch(editAlbum(album))
      dispatch(fetchAlbum(id))
      setTitle(album.title);
      setUrl(album.imageUrl);
      return history.push(`/albums/${album.id}`);
    }
  };

  return (
    <div className="upload-album-form-container">
      <h1> Upload Album </h1>
      <div className="upload-album-form">
        {errors.length > 0 && (
          <ul className="upload-album-form-errors">
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        )}
        <form onSubmit={handleSubmit}>
          <div className="upload-album-form-title">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="upload-album-form-url">
            <label htmlFor="url">Image URL</label>
            <input
              type="text"
              name="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="upload-album-form-submit">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}


export default EditForm;
