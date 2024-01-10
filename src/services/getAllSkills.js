
export const getAllSkills = (callback)=>{
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };

  fetch("/api/superAdmin/skills/getAll", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result?.success) {
                callback(result?.data);
            }
          })
          .catch((error) => console.log("error", error));
      
}
