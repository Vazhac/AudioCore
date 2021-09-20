import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditAlbumForm from './EditAlbumForm';
import './EditAlbum.css';

function EditAlbumModal({ album }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="edit-album-button" onClick={() => setShowModal(true)}>
        Edit Details
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditAlbumForm album={album} />
        </Modal>
      )}
    </>
  );
}

export default EditAlbumModal;
