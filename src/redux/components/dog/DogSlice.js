import { createSlice } from "@reduxjs/toolkit";

const DogSlice = createSlice({
  name: "dog",
  initialState: null,
  reducers: {
    updateUser: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateDog } = DogSlice.actions;
export default DogSlice.reducer;
