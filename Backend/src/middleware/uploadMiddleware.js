import { S3Client ,DeleteObjectCommand} from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import dotenv from 'dotenv';

dotenv.config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// Log configuration (do not log in production)
console.log('AWS Configuration:');
console.log('Region:', process.env.AWS_REGION);
console.log('Access Key ID:', process.env.AWS_ACCESS_KEY_ID ? 'Set' : 'Not set');
console.log('Secret Access Key:', process.env.AWS_SECRET_ACCESS_KEY ? 'Set' : 'Not set');
console.log('Bucket Name:', process.env.S3_BUCKET_NAME);


const  storage = multerS3({
    s3: s3Client,
    bucket: process.env.S3_BUCKET_NAME,
   
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      // cb(null, Date.now().toString() + '-' + file.originalname);
      cb(null,  file.originalname);
    }
  })

  export async function deleteS3Object(key) {
    const deleteParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
    };
  
    try {
      await s3Client.send(new DeleteObjectCommand(deleteParams));
      console.log(`Successfully deleted object with key: ${key}`);
    } catch (err) {
      console.error(`Error deleting object with key ${key}:`, err);
      throw err; // Re-throw the error so it can be handled by the caller
    }
  }


const upload = multer({storage})
export default upload;