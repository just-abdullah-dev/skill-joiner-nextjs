export const getServiceById= (id,callback) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(`/api/users/services/getService?id=${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result?.success) {
        callback(result?.data);
      }
    })
    .catch((error) => console.log("error", error));
};

