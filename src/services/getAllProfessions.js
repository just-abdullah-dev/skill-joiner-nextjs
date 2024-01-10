
export const getAllProfessions = (callback)=>{
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };

  fetch("/api/superAdmin/profession/getAll", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result?.success) {
                callback(result?.data);
            }
          })
          .catch((error) => console.log("error", error));
      
}
