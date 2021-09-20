
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditComment from './EditComment';

function EditCommentModal({ comment }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id="edit-comment-button" onClick={() => setShowModal(true)}>
        Edit Comment
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditComment comment={comment} />
        </Modal>
      )}
    </>
  );
}

export default EditCommentModal;
