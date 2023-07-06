import axios from "axios";

export const getTasks = (token) => {
  return axios
    .get("https://run.mocky.io/v3/33700c4b-e87f-4143-bee6-7c455374b2c6", {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const createTask = (data, token) => {
  return axios
    .post(
      "https://run.mocky.io/v3/05a4e281-681b-4bef-872d-5f3753c4c857",
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const updateTask = (data, token) => {
  return axios
    .put("https://run.mocky.io/v3/59a08a62-babd-4896-b7ae-4652760f8e25", data, {
      // the id should be sent as a parameter in the url
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const deleteTask = (data, token) => {
  return axios
    .delete(
      "https://run.mocky.io/v3/f3477377-3685-462e-93bb-86cd8c831bf8", // the id should be sent as a parameter in the url
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
};
