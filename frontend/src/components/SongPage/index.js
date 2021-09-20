import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"
import "./SongPage.css"
import { fetchSongs, deleteSong } from '../../store/songs'
import EditFormModal from '../EditFormModal'
import EditCommentModal from '../EditCommentModal'
import { createComment, getComments, deleteComment } from '../../store/comments'
import ReactPlayer from 'react-player'

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
    dispatch(getComments(id))
  }, [dispatch, id])

  const handleDelete = () => {
    dispatch(deleteSong(+id))
    history.push('/')
  }

  const handleDeleteComment = (comment) => {
    dispatch(deleteComment(comment?.id))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newComment = {
      id: +id,
      body: comment,
      userId: user?.id
    }
    dispatch(createComment(newComment))
  }

  const allComments = [];

  for (let key in comments) {
    allComments.push(comments[key])
  }


  return (
    <div className="song-page">
      <div className="song-page-header">
        <div className="song-page-header-left">
          {songs?.map(song => {
            {
              if (song.id === +id) {
                return (
                  <div className="song-page-header-left-song-name">
                    <h1>{song?.title}</h1>
                    <ReactPlayer className="react-player" url={song?.url} controls={true} />
                    <h2>By: {song?.User?.username}</h2>
                    <div className="song-page-container">
                      <div className="song-page-container-left">
                        <button onClick={() => history.push("/songs")}>Back to Songs</button>
                        {(user?.id === song.User?.id) ? (
                          <div className="song-page-container-right-edit">
                            {user?.id === song?.userId &&
                              <EditFormModal song={song} />}
                            <div className="song-page-container-right-delete">
                              <button onClick={handleDelete}>Delete</button>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="song-page-comments-container">
                      <div className="song-page-comments-left">
                        <div className="song-page-comments-left-header">
                          <h1>Comments</h1>
                        </div>
                        <div className="song-page-comments-left-comments">
                          <form className="enter-comment-form" onSubmit={handleSubmit} >
                            <input
                              type="text"
                              placeholder="Write a comment"
                              name="comment"
                              value={comment}
                              onChange={(e) => { setComment(e.target.value) }}
                            />
                          </form>
                          <div className="text-box">
                            <a href="#" onClick={handleSubmit} className="btn btn-white btn-animate">Post a comment</a>
                          </div>
                          < div className="song-page-body-left-lyrics-comments" >
                            {comments && allComments?.map(comment => (
                              <div className="song-page-body-left-lyrics-comments-comment" key={comment.id}>
                                <div className="song-page-body-left-lyrics-comments-comment-user">
                                  <h4>{comment?.User?.username}:</h4>
                                  <div className="song-page-body-left-lyrics-comments-comment-body">
                                    <h4>{comment?.body}</h4>
                                    {/* <h4>{comment?.updateddAt}</h4> */}
                                  </div>
                                  {(user?.id === comment?.User?.id) ? (
                                    <div className="song-page-body-left-lyrics-comments-comment-user-edit">
                                      <EditCommentModal comment={comment} />
                                      <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            ))
                            }
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
      </div>
    </div>
  );
}
export default SongPage;
