// Display an individual song
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"
import "./SongPage.css"
import { deleteSong } from '../../store/song'
import EditFormModal from '../EditFormModal'

function SongPage() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const history = useHistory();
  const allSongs = useSelector((state) => state.songs.songs);
  const allComments = useSelector((state) => state.comments.comments);
  const allUsers = useSelector((state) => state.users.users);
  console.log(allComments)

  return (
    <div className="song-page">
      <div className="song-page__song-info">
        {allSongs?.map((song) => {
          return (
            ((+id === song.id)) ? (
              <div>
                <h1 className="song-page__song-info__title">{song.title}</h1>
                <h1 className="song-page__song-info__album">{song.album}</h1>
                <h1 className="song-page__song-info__URL">{song.url}</h1>
                {(<EditFormModal song={song} />)}
                <button onClick={() => {
                  dispatch(deleteSong(song))
                  return history.push('/songs');
                }}>Delete Song</button>
              </div>
            ) : <></>
          )
        })}
      </div>
      <div>
        <h1>Comments</h1>
        {allComments?.map((comment) => {
          return (
            ((+id === comment?.songId)) ? (
              <>
                <div className="song-page__comments">
                  <h1 className="song-page__comments__Username">{comment.comment}</h1>
                  {allUsers?.map((user) => {
                    return (
                      ((+comment.userId === user.id)) ? (
                        <>
                          <div className="song-page__comments__Username">{user.username}</div>
                          ) : <></>
                          )
                })}
                          ) : <></>
                        </>
                      )})}
                </div>
              </div>
            );
        }
export default SongPage;
