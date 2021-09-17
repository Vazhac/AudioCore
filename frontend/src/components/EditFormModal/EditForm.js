import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './EditForm.css';
import { editSong } from '../../store/song'
import { useHistory } from "react-router-dom";

//ask for title and description and url for song
function EditForm({ song }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const id = song?.id;
    const [title, setTitle] = useState(song?.title);
    const [album, setAlbum] = useState(song?.album);
    const [url, setUrl] = useState(song?.url);
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const song = {
            title,
            album: album === "" ? null : album,
            url,
            id,
            userId: sessionUser.id
        }
        setErrors([]);
        if (title === "" || url === "") {
            setErrors(["Please fill out all required fields"]);
        } else {
            dispatch(editSong(song))
            setTitle(song.title);
            setAlbum(song.albumId);
            setUrl(song.url);
            return history.push(`/songs/${song.id}`);
        }
    };

    return (
        <div className="edit-form-page">
            <h1>Edit your song</h1>
            <form id="edit-form-container" onSubmit={handleSubmit}>
                {errors.length > 0 && (
                    <div className="edit-form-page-container-errors">
                        {errors.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
                <div className="edit-form-elements">
                    <div className="edit-form-page-container-form-title">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="edit-form-page-container-form-album">
                        <label htmlFor="album">Album</label>
                        <input
                            type="text"
                            name="album"
                            placeholder="Optional"
                            value={album}
                            onChange={(e) => setAlbum(e.target.value)}
                        />
                    </div>
                    <div className="edit-form-page-container-form-url">
                        <label htmlFor="url">URL</label>
                        <input
                            type="text"
                            name="url"
                            placeholder="URL"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>
                    <div className="edit-form-page-container-form-submit">
                        <button type="submit">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
}



export default EditForm;
