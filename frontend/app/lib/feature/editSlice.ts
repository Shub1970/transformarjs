import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EditState {
  textContent: string;
  htmlContent: string;
}

const initialState: EditState = {
  textContent: "",
  htmlContent: "",
};

const editSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    textUpdate(state, action: PayloadAction<string>) {
      state.textContent = action.payload;
    },
    htmlUpdate(state, action: PayloadAction<string>) {
      state.htmlContent = action.payload;
    },
  },
});

export const { textUpdate, htmlUpdate } = editSlice.actions;
export default editSlice.reducer;
