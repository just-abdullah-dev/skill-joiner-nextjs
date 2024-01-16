export const getProjects = ({keyword = '', limit = 4},callback) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(`/api/search/projects/search?keyword=${keyword}&limit=${limit}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result?.success) {
        callback(result?.data);
      }
    })
    .catch((error) => console.log("error", error));
};
