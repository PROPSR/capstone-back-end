const { v2 } = require("cloudinary");
require("dotenv").config();

v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadFile = (file) => {
    return new Promise((resolve, reject) => {
        const upload = v2.uploader.upload_stream((error, result) => {
            if (error) return reject(error);
            resolve(result);
        });

        toStream(file.buffer).pipe(upload);
    })
}

module.exports = {
    cloudinary: {
        uploadFile
    }
};
