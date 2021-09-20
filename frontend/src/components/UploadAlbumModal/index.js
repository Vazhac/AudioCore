import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UploadAlbumForm from './UploadAlbumForm.js';
import { useSelector } from 'react-redux';
import LoginForm from "../LoginFormModal/LoginForm";
import '../Navigation/Navigation.css'

function UploadAlbumModal() {
  const [showModal, setShowModal] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
      <button id="upload-nav-link" onClick={() => setShowModal(true)}>
        Upload Album
      </button>
      {showModal && (
        <>{
          sessionUser ? (
            <Modal onClose={() => setShowModal(false)}>
              <UploadAlbumForm setShowModal={setShowModal} />
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

export default UploadAlbumModal;
