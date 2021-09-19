import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditForm from './EditForm';
import '../SongPage/SongPage.css'

function EditFormModal({ song }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button class="edit-song-button" onClick={() => setShowModal(true)}>
                Edit Details
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
