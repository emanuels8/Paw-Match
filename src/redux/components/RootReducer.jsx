import { combineReducers } from "redux";
import UserSlice from "./user/UserSlice";
import DogSlice from "./dog/DogSlice";

const rootReducer = combineReducers({
  user: UserSlice,
  dog: DogSlice,
});

export default rootReducer;
