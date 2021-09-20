import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './UploadForm.css';
import { createSong, fetchSongs } from '../../store/songs'
import { useHistory } from "react-router-dom";

//ask for title and description and url for song
function UploadForm({ setShowModal }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [title, setTitle] = useState("");
    const [album, setAlbum] = useState("");
    const [url, setUrl] = useState("");
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const song = {
            title,
            album: album === "" ? null : album,
            url,
            userId: sessionUser.id
        }
        setErrors([]);
        if (title === "" || url === "") {
            setErrors(["Please fill out all required fields"]);
        } else {
            dispatch(createSong(song))
            setShowModal(false);
            dispatch(fetchSongs());
            setTitle("");
            setAlbum("");
            setUrl("");
            return history.push("/songs");
        }
    };

    return (
        <div className="new-upload-form-container">
            <h1>Upload a new song</h1>
            <form className="new-upload-form" onSubmit={handleSubmit}>
                {errors.length > 0 && (
                    <div className="new-upload-form-page-container-errors">
                        {errors.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
                <div className="new-upload-form-elements">
                    <div className="new-upload-form-title">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="new-upload-form-url">
                        <label htmlFor="url">URL</label>
                        <input
                            type="text"
                            name="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>
                    <div className="new-upload-form-submit">
                        <button type="submit">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
}



export default UploadForm;
