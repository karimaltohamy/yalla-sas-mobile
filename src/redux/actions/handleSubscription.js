import { toast } from "react-toastify";
import apiAxios from "../../utils/apiAxios";

export const handleSubscription = async (
  id,
  setLoading,
  setUrlCharge,
  setOpenIframe
) => {
  setLoading(true);
  try {
    const { data } = await apiAxios.post("mob/addon/subscribe", {
      addon_id: id,
    });
    setLoading(false);
    setUrlCharge(data.data?.url && data.data.url);
    setOpenIframe(data.data?.url && true);
    toast.success(data.message);
  } catch (error) {
    toast.error(error.response.data.message);
    setLoading(false);
  }
};
