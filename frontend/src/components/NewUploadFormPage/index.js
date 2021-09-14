import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import './NewUploadForm.css';
import LoginForm from "../LoginFormModal/LoginForm";
import { Modal } from "../../context/Modal";

//ask for title and description and url for song
function NewUploadFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [title, setTitle] = useState("");
    const [album, setAlbum] = useState("");
    const [url, setUrl] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.upload({ title, url, album }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    };
    //if a user is not logged in, return error message and login form
    if (!sessionUser) {
        return (
            <Modal>
                Please log in to upload a song
                <LoginForm />
            </Modal>
        );
    } else {
        //if user is logged in, return upload form
        return (
            <form id="new-upload-form" onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <h1>Upload a new song</h1>
                <label>
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <label>
                    URL:
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Album:
                    <input
                        type="text"
                        value={album}
                        onChange={(e) => setAlbum(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Upload</button>
            </form>
        );
    }
}

export default NewUploadFormPage;
