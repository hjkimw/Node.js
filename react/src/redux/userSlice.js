import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    displayName: '',
    uid: '',
    accessToken: ''
  },
  reducers: {
    //firebase로 받은 유저정보를 action객체로 반환하는 함수
    //해당 함수의 인수값으로 유저정보를 넣으면 자동으로 actio객체로 전달
    loginUser: (state, action) => {
      state.displayName = action.payload.displayName;
      state.uid = action.payload.uid;
      state.accessToken = action.payload.accessToken;
    },
    logoutUser: (state) => {
      state.displayName = '';
      state.uid = '';
      state.accessToken = '';
    }
  }
})

//
export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;