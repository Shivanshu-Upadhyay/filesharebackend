const File = require("../models/file");
const sendEmail = require("../services/emailService");
module.exports = async function sendFileEmail(req, res) {
  try {
    const {url,sendTo, sendFrom,uuid } = req.body;
    if (!sendTo || !sendFrom || !uuid || !url) {
      return res.status(422).json({ message: "ALl field Required" });
    } 
    const foundFile = await File.findOne({uuid:uuid})
    if(!foundFile){
      return res.status(404).json({message:"Link Expire"})
    }
    
    // Send Email
    sendEmail({
      from: sendFrom,
      to: sendTo,
      text: `File send ${sendFrom}`,
      html: require("../email/emailTemp")({
        emailFrom:sendFrom,
        downloadLink:url,
        size: parseInt(foundFile.size / 1000) + " KB",
        expires: "24 hours",
      }),
      subject: "Download Your File😎",
    });
    return res.status(200).json({ message: "Email Sent Successfully" });
  } catch (error) {
    res.status(500).json({error,message:"Somthing Went wrong"});
  }
};
