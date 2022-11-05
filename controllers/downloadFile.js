const File = require("../models/file");
const path = require('path')
module.exports = async function downloadFile(req,res){
try {
    const foundFile = await File.findOne({uuid:req.params.uuid})
    if(!foundFile){
      return res.status(404).json({error:"Link expire"})
    }
    const filePath = path.join(__dirname, ".." ,foundFile.path) 
   return res.sendFile(filePath)
} catch (error) {
    res.status(500).json({error})
}
}