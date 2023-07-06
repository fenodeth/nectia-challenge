import axios from "axios";

export const login = (data, authContext) => {
  return axios
    .post("https://run.mocky.io/v3/2c0c2c6a-c49b-4570-be4d-c13e36eb9440", data)
    .then((response) => {
      authContext.setToken(response.data);
      return response;
    })
    .catch((error) => {
      authContext.logout();
      console.error(error);
    });
};
