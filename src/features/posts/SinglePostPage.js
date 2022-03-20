import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { selectPostByID } from './postSlice'

export const SinglePostPage = ({ match }) => {
  const { postId } = match.params

  const post = useSelector((state) => selectPostByID(state, postId))

  if (!post) {
    return (
      <>
        <h2>Post not Found!</h2>
      </>
    )
  }

  return (
    <>
      <article className="post">
        <h2>{post.title}</h2>
        <p className='"post-content'>{post.content}</p>
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    </>
  )
}
