const fs = require('fs')
const path = require('path')

const fileRemover = (filename)=>{
    fs.unlink(path.join("./public/media/", filename), function (err){
        if(err && err.code == "ENOENT"){
            //File doesnot exist
            console.log(`File ${filename} doesn't exist.`);
        }else if(err){
            console.log(err.message);
            console.log(`Error occured while trying to remove file ${filename}`);
        }else {
            console.log(`Removed: ${filename}`);
        }
    });
}

module.exports = fileRemover;