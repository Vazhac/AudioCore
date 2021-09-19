// Display an individual song

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"
import "./SongPage.css"
import { fetchSongs, deleteSong } from '../../store/songs'
import EditFormModal from '../EditFormModal'
import EditCommentModal from '../EditCommentModal'
import { createComment, getComments, deleteComment } from '../../store/comments'

function SongPage() {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  const history = useHistory()
  const { id } = useParams()
  const songs = useSelector(state => state.songs.songs)
  const comments = useSelector(state => state.comments.comments)
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(fetchSongs())
    dispatch(getComments(+id))
  }, [dispatch])


  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment(commentId))
  }

  const handleDelete = () => {
    if (id) {
      dispatch(deleteSong(+id))
      history.push('/')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newComment = {
      id: +id,
      body: comment,
      userId: user.id
    }
    dispatch(createComment(newComment))
  }

  const allComments = [];

  for (let key in comments) {
    allComments.push(comments[key])
  }


  return (
    <div className="SongPage">
      <div className="song-page">
        <div className="song-page-header">
          <div className="song-page-header-left">
            {songs?.map(song => {
              {
                if (song.id === +id) {
                  return (
                    <div className="song-page-header-left-song-name">
                      <h1>{song?.title}</h1>
                      <h2>{song?.User?.username}</h2>
                      <h2>{song?.url}</h2>
                      <div className="song-page-container">
                        <div className="song-page-container-left">
                          <button onClick={() => history.push("/songs")}>Back to Songs</button>
                          <div className="song-page-container-right-edit">
                            {user?.id === song.userId &&
                              <EditFormModal song={song} />}
                            <div className="song-page-container-right-delete">
                              <button onClick={handleDelete}>Delete</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
              }
            })}
          </div>
          <div className="song-page-body">
            <div className="song-page-body-left">
              <div className="song-page-body-left-lyrics">
                <h3>Comments</h3>
                {/* write a comment form */}
                <form onSubmit={handleSubmit} >
                  <input
                    type="text"
                    placeholder="Write a comment"
                    name="comment"
                    value={comment}
                    onChange={(e) => { setComment(e.target.value) }}
                  />
                  <div className="comment-submit-button">
                    <button type="submit">Submit</button>
                  </div>
                </form>
                < div className="song-page-body-left-lyrics-comments" >
                  {comments && allComments?.map(comment => (
                    <div className="song-page-body-left-lyrics-comments-comment" key={comment.id}>
                      <div className="song-page-body-left-lyrics-comments-comment-user">
                        <h4>{comment?.User?.username}</h4>
                        <EditCommentModal comment={comment} />
                        <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                      </div>
                      <div className="song-page-body-left-lyrics-comments-comment-body">
                        <h4>{comment?.body}</h4>
                      </div>
                    </div>
                  ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div>
  );
}

export default SongPage;
