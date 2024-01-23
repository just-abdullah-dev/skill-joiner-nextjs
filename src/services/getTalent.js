export const getUsers = ({keyword='',limit=4},callback) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(`/api/search/freelancers/search?keyword=${keyword}&limit=${limit}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
        callback(result);
    })
    .catch((error) => console.log("error", error));
};

