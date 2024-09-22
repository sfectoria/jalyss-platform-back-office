import axios from "axios";

export const axiosGetWithHeaders = async (url, queries) => {
  const token = localStorage.getItem("token");
  const response = await axios.get("http://localhost:3000/" + url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response;
};
export const postWithHeaders = (url, body, params) => {};
export const patchWithHeaders = (url, body, params) => {};
export const deleteWithHeaders = (url) => {};
