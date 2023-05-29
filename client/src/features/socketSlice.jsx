import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showChat: false,
  message: "",
  msgList: [],
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    chatroom: (state, { payload }) => {
      state.showChat = true;
    },
    setMsgList: (state, { payload }) => {
      state.msgList.push(payload);
    },
  },
});

export const { chatroom, setMsgList } = socketSlice.actions;

export default socketSlice.reducer;
