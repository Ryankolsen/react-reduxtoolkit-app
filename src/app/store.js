import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../features/posts/postSlice'
import userReducer from '../features/users/userSlice'

export default configureStore({
  reducer: { posts: postsReducer, users: userReducer },
})
