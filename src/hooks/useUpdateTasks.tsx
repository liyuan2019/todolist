import { loginId } from "../component/Header";
import { baseURL } from "../data/initial-data";
import { Board } from "../type";
import axios from "axios";
import { toast } from "react-toastify";

export const useUpdateTasks = () => {
  const notify = () => {
    toast.error("Failed to save data to DB!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const updateTasks = (state: Board) => {
    if (loginId === "") {
      return;
    }
    const data = JSON.stringify({
      _id: loginId,
      data: state,
    });

    const config = {
      method: "post",
      url: `${baseURL}/update_tasks`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then((response) => {
        if (
          response.data.matchedCount === 0 ||
          response.data.modifiedCount === 0
        ) {
          notify();
        }
      })
      .catch((error) => {
        console.log(error);
        notify();
      });
  };

  return { updateTasks };
};
