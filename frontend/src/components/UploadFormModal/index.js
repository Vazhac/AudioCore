import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UploadForm from './UploadForm';
import { useSelector } from 'react-redux';
import LoginForm from "../LoginFormModal/LoginForm";
import '../Navigation/Navigation.css'

function UploadFormModal() {
    const [showModal, setShowModal] = useState(false);
    const sessionUser = useSelector((state) => state.session.user);

    return (
        <>
            <button id="upload-nav-link" onClick={() => setShowModal(true)}>
                Upload Song
            </button>
            {showModal && (
                <>{
                    sessionUser ? (
                        <Modal onClose={() => setShowModal(false)}>
                            <UploadForm setShowModal={setShowModal} />
                        </Modal>
                    ) : (
                        <Modal onClose={() => setShowModal(false)}>
                            <LoginForm />
                        </Modal>)
                }</>
            )}
        </>
    );
}

export default UploadFormModal;
