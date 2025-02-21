import { AppState } from "../../../store/store";

export const getSelectedMotorcycle = (state: AppState) =>
  state.home.selectedMotorcycle;
