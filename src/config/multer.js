const multer = require('multer');
const path = require('path');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudinary } = require('./cloudinary');

const upload = (role) => {
  let folder;

  switch (role) {
    case 'homeowner':
      folder = 'homeownerFile';
      break;
    case 'contractor':
      folder = 'userFile';
      break;
    case 'supplier':
      folder = 'supplierFile';
      break;
    case 'project':
      folder = 'projectFile';
      break;
    case 'product':
      folder = 'productFile';
      break;
    default:
      throw new Error('Invalid role specified');
  }

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: folder,
      resource_type: 'auto',
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + Math.round(Math.random() * 1E9);
      const uniqueFilename = `${role}-${uniqueSuffix}-${file.originalname}`;
      cb(null, uniqueFilename);
    },
  });

  const uploadMiddleware = multer({
    storage: storage,

    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    },
  });

  return uploadMiddleware;
};

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|pdf|mp3|m4b|aac|wav|flac|ogg|wma|epub|mobi|azw|kf8|fb2|cbz|cbr|webm/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('ERROR: Kindly please upload a valid filetype');
  };
};

module.exports =  {
  upload
}