import  File from '../model/file.model.js';

export const downloadCtrl = async (req,res) => {
    try {
      const file = await File.findOne({ filename: req.params.filename });
  
      if (!file) {
        return res.status(404).json({ message: 'File not found' });
      }
      console.log(file)
      res.set('Content-Type', file.contentType);
      res.send(file.data);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving file', error });
    }
  }

  

  export const uploadCtrl = async (req,res,) => {
    const { originalname, mimetype, buffer } = req.file;
  
    const newFile = new File({
      filename: originalname,
      contentType: mimetype,
      data: buffer,
    });
  
    try {
      await newFile.save();
      res.status(201).json({ message: 'File uploaded successfully', file: req.file.originalname });
    } catch (error) {
      res.status(500).json({ message: 'Error uploading file', error });
    }
    return;
  }