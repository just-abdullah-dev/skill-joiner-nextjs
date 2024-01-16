export const getBidsByJobId= (id,callback) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(`/api/jobbid/getBidsByJobId?id=${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
        callback(result);
      
    })
    .catch((error) => console.log("error", error));
};

