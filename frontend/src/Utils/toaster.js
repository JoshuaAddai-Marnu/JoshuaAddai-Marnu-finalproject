import { toast } from "react-toastify";

export const toaster = {
  success: (message) =>
    toast(message, {
      type: "success",
    }),
  error: (message) =>
    toast(message, {
      type: "error",
    }),
};
