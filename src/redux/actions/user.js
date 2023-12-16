import apiAxios from "../../utils/apiAxios";
import {
  setUserError,
  setUserStart,
  setUserSuccess,
} from "../reducers/userReducer";

export const getUser = async (dispatch) => {
  dispatch(setUserStart());
  try {
    const { data } = await apiAxios.get("mob/refresh");
    apiAxios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${data.access_token}`;
    dispatch(setUserSuccess(data.data));
    sessionStorage.setItem("access_token", data.access_token);
    return data;
  } catch (error) {
    dispatch(setUserError());
  }
};
