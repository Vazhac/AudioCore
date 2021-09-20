import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './UploadAlbumForm.css';
import { createAlbum, fetchAlbums } from '../../store/albums'
import { useHistory } from "react-router-dom";

//ask for title and description and url for song
function UploadAlbumForm({ setShowModal }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const album = {
      title,
      imageUrl: url,
      userId: sessionUser.id, //this is the userId of the user who is logged in
    }
    setErrors([]);
    if (title === "" || url === "") {
      setErrors(["Please fill out all required fields"]);
    } else {
      dispatch(createAlbum(album))
      setShowModal(false);
      dispatch(fetchAlbums())
      setTitle("");
      setUrl("");
      return history.push(`/albums`);
    }
  };

  return (
    <div className="upload-album-form-container">
      <h1> Upload Album </h1>
      <form lassName="upload-album-form" onSubmit={handleSubmit}>
        {errors.length > 0 && (
          <div className="upload-album-form-page-container-errors">
            {errors.map((error, i) => (
              <p key={i}>{error}</p>
            ))}
          </div>
        )
        }
        <div className="upload-album-elements">
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
        </div>
      </form>
    </div>
  );
}


export default UploadAlbumForm;
