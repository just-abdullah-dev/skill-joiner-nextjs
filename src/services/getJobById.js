export const getJobById= (id,callback) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(`/api/jobpost/getJobById?id=${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
        callback(result);
      
    })
    .catch((error) => console.log("error", error));
};

