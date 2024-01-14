export const getServiceById= (id,callback) => {
  var requestOptions = {
    method: "GET"
  };

  fetch(`/api/users/services/getService?id=${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
        callback(result);
    })
    .catch((error) => console.log("error", error));
};

