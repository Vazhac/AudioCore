import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditComment from './EditComment';
import '../Navigation/Navigation.css'

function EditCommentModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id="edit-comment-button" onClick={() => setShowModal(true)}>
        Edit Comment
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditComment />
        </Modal>
      )}
    </>
  );
}

export default EditCommentModal;
