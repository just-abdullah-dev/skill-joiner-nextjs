export const getJobsByUserId = (token,callback) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  fetch(`/api/jobpost/getJobsByUserId`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
        callback(result);
    })
    .catch((error) => console.log("error", error));

  };

