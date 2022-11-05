const File = require("../models/file");
module.exports = async function getFile(req,res){
try {
    const foundFile = await File.findOne({uuid:req.params.uuid})
    if(!foundFile){
      return res.status(404).json({error:"Link expire"})
    }
     console.log(foundFile);
   return res.status(200).json({foundFile})
} catch (error) {
    res.status(500).json({error})
}
}