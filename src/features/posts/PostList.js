import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { ReactionButtons } from './ReactionButtons'
import { SelectAllPosts, fetchPosts } from './postSlice'
import { TimeAgo } from './TimeAgo'
import { Spinner } from '../../components/Spinner'

const PostExcerpt = ({ post }) => {
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>

      <ReactionButtons post={post} />
      <Link to={`./posts/${post.id}`} className={'button muted-button'}>
        View Post
      </Link>
    </article>
  )
}

export const PostList = () => {
  const dispatch = useDispatch()
  const posts = useSelector(SelectAllPosts)

  const postStatus = useSelector((state) => state.posts.status)
  const error = useSelector((state) => state.posts.error)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content

  if (postStatus === 'loading') {
    content = <Spinner text="loading" />
  } else if (postStatus === 'succeeded') {
    //sort posts in reverse chronological order by datetime string
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))

    content = orderedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ))
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }

  //   const orderedPosts = posts
  //     .slice()
  //     .sort((a, b) => b.date.localeCompare(a.date))

  //   const renderedPosts = orderedPosts.map((post) => (
  //     <article className="post-excerpt" key={post.id}>
  //       <h3>{post.title}</h3>
  //       <h5>
  //         <PostAuthor userId={post.user} />
  //       </h5>
  //       <p className="post-content">{post.content.substring(0, 100)}</p>
  //       <ReactionButtons post={post} />
  //       <Link to={`posts/${post.id}`} className="button muted-button">
  //         View Post
  //       </Link>
  //     </article>
  //   ))

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
