import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: '1', name: 'Ryan Olsen' },
  { id: '2', name: 'Krista Olsen' },
  { id: '3', name: 'Ellison Key' },
]

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
})

export default userSlice.reducer
