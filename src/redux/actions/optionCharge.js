import apiAxios from "../../utils/apiAxios";

export const getOptions = async (setOtipns) => {
  try {
    const { data } = await apiAxios.get("mob/charge/options");
    setOtipns(data.data);
  } catch (error) {}
};
