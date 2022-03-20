import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'
// import { sub } from 'date-fns'

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')

  return response.data
})

//   {
//     id: '1',
//     title: 'FirstPost!',
//     content: 'H-E-L-L-O',
//     date: sub(new Date(), { minutes: 10 }).toISOString(),
//     user: '1',
//     reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
//   },
// ]

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  //The payload creator receives the partial '{title, content, user} object
  async (initialPost) => {
    //we send the initial data to the fake API server
    const response = await client.post('/fakeApi/posts', initialPost)
    //the response includes the complete post object, including unique ID
    return response.data
  }
)

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // postAdded: {
    //   reducer(state, action) {
    //     state.posts.push(action.payload)
    //   },
    //   prepare(title, content, userId) {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         date: new Date().toISOString(),
    //         title,
    //         content,
    //         user: userId,
    //         reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
    //       },
    //     }
    //   },
    // },

    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.posts.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },

    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.posts.find((posts) => posts.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        //Add any fetched posts to array
        state.posts = state.posts.concat(action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        //We can directly add the new post object to our posts array
        state.posts.push(action.payload)
      })
  },
})

export const { postAdded, postUpdated, reactionAdded } = postSlice.actions

export default postSlice.reducer

export const SelectAllPosts = (state) => state.posts.posts

export const selectPostByID = (state, postID) =>
  state.posts.posts.find((post) => post.id === postID)
