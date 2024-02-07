import apiAxios from "../../utils/apiAxios";
import {
  setRefrechDataStart,
  setRefrechDataSuccessError,
  setRefrechDataSuccessfull,
} from "../reducers/refrechDataReducer";

export const getRefrechData = async (dispatch) => {
  dispatch(setRefrechDataStart());
  try {
    const { data } = await apiAxios.get("mob/refresh/data");
    dispatch(setRefrechDataSuccessfull(data.success && data.data));
  } catch (error) {
    dispatch(setRefrechDataSuccessError());
  }
};
