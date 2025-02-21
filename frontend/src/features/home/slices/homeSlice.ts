import { createSlice } from "@reduxjs/toolkit";

export interface HomeState {
  selectedMotorcycle: any;
}
const initialState: HomeState = {
  selectedMotorcycle: null,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setSelectedMotorcycle(state, action) {
      state.selectedMotorcycle = action.payload;
    },
  },
});

export const { setSelectedMotorcycle } = homeSlice.actions;
export default homeSlice.reducer;
