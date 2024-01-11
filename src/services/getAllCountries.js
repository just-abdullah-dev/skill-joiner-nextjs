export const getAllCountries = (callback) => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch("https://restcountries.com/v3.1/all", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      callback(result);
    })
    .catch((error) => console.log("error", error));
};


