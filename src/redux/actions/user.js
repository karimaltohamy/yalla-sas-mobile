import apiAxios from "../../utils/apoAxios";
import {
  setUserError,
  setUserStart,
  setUserSuccess,
} from "../reducers/userReducer";

export const getUser = async (dispatch) => {
  dispatch(setUserStart());
  try {
    const { data } = await apiAxios.get("");
    dispatch(setUserSuccess(data));
  } catch (error) {
    dispatch(setUserError());
  }
};
