import AWS from "aws-sdk";
import dotenv from "dotenv";
import fs from "fs"; 

dotenv.config();

const s3 = new AWS.S3({
  endpoint: process.env.SCALEWAY_ENDPOINT,
  region: process.env.SCALEWAY_REGION,
  credentials: {
    accessKeyId: process.env.SCALEWAY_ACCESS_KEY,
    secretAccessKey: process.env.SCALEWAY_SECRET_KEY,
  },
});

const uploadFile = (file) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: process.env.SCALEWAY_BUCKET_NAME,
    Body: fileStream,
    Key: `${process.env.SCALEWAY_FOLDER}/${file.filename}`, // Ensure SCALEWAY_FOLDER is used
    ContentType: file.mimetype,
    ACL: "public-read", //
  };

  return s3.upload(uploadParams).promise();
};

const getFileStream = (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: process.env.SCALEWAY_BUCKET_NAME,
  };

  return s3.getObject(downloadParams).createReadStream();
};

export { uploadFile, getFileStream, s3 };
