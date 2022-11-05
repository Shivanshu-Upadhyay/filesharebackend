const multer = require("multer");
const path = require("path");
const File = require("../models/file");
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination: (req, file, cd) => cd(null, "uploads/"),
  filename: (req, file, cd) => {
    const unqFileName = `${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cd(null, unqFileName);
  },
});

const upload = multer({
  storage,
  limits: { fieldSize: 1000000 * 100 },
}).single("myFile");

module.exports = async function fileUpaload(req, res) {
  try {
      upload(req, res, async (err) => {
        if (!req.file) {
            return res.status(404).json({ message: "Kindly Provide File" });
          }else if (err) {
          return res.status(500).json({ error: err.message });
        }
        // store in database
        const file = new File({
          fileName: req.file.filename,
          path: req.file.path,
          uuid: uuidv4(),
          size: req.file.size,
        });

        const response = await file.save();
        return res.status(200).json({file:response.uuid})
      });
    
  } catch (error) {
    res.status(500).json({ message: "Somthing Went Wrong", error });
  }
};
