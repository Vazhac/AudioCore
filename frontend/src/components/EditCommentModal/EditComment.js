import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './EditComment.css';
import { editComment } from '../../store/comments'
import { useHistory } from "react-router-dom";

//ask for title and description and url for comment
function EditComment({ comment }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const id = comment?.id;
  const [body, setBody] = useState(comment?.body);
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const comment = {
      body,
      id,
      userId: sessionUser.id
    }
    setErrors([]);
    if (body === "") {
      setErrors(["Please fill out all required fields"]);
    } else {
      dispatch(editComment(comment))
      setBody(comment.body);
      return history.push(`/comments/${comment.id}`);
    }
  };

  return (
    <div className="edit-comment-page">
      <h1>Edit your comment</h1>
      <form id="edit-comment-container" onSubmit={handleSubmit}>
        {errors.length > 0 && (
          <div className="edit-comment-page-container-errors">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        <div className="edit-comment-elements">
          <div className="edit-comment-page-container-input">
            <input
              type="text"
              name="body"
              placeholder="Enter your comment"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <div className="edit-comment-page-container-form-submit">
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}



export default EditComment;
