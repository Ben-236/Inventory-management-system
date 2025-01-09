import multer from 'multer';

const multerUpload = field => async (request, response, next) => {
  const basePath = 'files/items';
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, basePath);
    },
    filename(req, file, cb) {
      cb(null, new Date().getTime() + file.originalname);
    },
  });  

  const upload = multer({ storage }).single(field);
  upload(request, response, (err) => {
    if (err) {
      request.body[field] = 'invalid';
    } else {
      const filePath = request.file && request.file.filename
        ? `${basePath}/${request.file.filename}` : 'invalid';
      request.body[field] = filePath;

    }
    return next();
  });
};

export default multerUpload;
