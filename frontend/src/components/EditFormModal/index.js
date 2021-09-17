import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditForm from './EditForm';
import '../Navigation/Navigation.css'

function EditFormModal({ song }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button id="upload-nav-link" onClick={() => setShowModal(true)}>
                Edit
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditForm song={song} />
                </Modal>
            )}
        </>
    );
}

export default EditFormModal;
