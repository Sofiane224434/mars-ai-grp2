import { S3, ListObjectsCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import 'dotenv/config';

const client = new S3({
    region: process.env.SCALEWAY_REGION,
    endpoint: process.env.SCALEWAY_ENDPOINT,
    credentials: {
        accessKeyId: process.env.SCALEWAY_ACCESS_KEY,
        secretAccessKey: process.env.SCALEWAY_SECRET_KEY
    },
});

const bucketConfig = { bucket: "grp-2" }

export async function bucketS3() {
    // async/await.
    try {
        const command = new ListObjectsCommand({
            Bucket: process.env.SCALEWAY_BUCKET_NAME,
            // Key: process.env.SCALEWAY_FOLDER
        });
        const contents = await client.send(command);

        //get only grp2 objects
        let mygroup = contents.Contents.filter((obj, index) => {
            if (obj.Key.startsWith(process.env.SCALEWAY_FOLDER)) {
                return (contents.Contents[index])
            }
        })

        let url = process.env.SCALEWAY_ENDPOINT + "/" + process.env.SCALEWAY_BUCKET_NAME +
            "/grp2/afee8e9278955cdcec747e836476cc8e";

        console.log(mygroup);
        const data = await client.listBuckets();
        //console.log("my data: ", data);
        // process data.
    } catch (error) {
        // error handling.
        console.log(error);
    }
}

// import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
// import { env } from "../config/env.js";

// // Service pour trimmer les slashs au début et à la fin d'une chaîne
// function trimSlashes(value) {
//     return String(value || "")
//         .trim()
//         .replace(/^\/+/, "")
//         .replace(/\/+$/, "");
// }

// // Service pour construire l'URL publique d'un objet stocké dans l'object storage
// function buildPublicUrl({ endpoint, bucket, key }) {
//     const cleanEndpoint = String(endpoint || "").replace(/\/+$/, "");
//     const encodedKey = key
//         .split("/")
//         .map((part) => encodeURIComponent(part))
//         .join("/");
//     return ${ cleanEndpoint } /${encodeURIComponent(bucket)}/${ encodedKey };
// }

// // Service pour vérifier si la configuration de l'object storage est complète
// export function isObjectStorageConfigured() {
//     return Boolean(
//         env.scalewayAccessKey &&
//         env.scalewaySecretKey &&
//         env.scalewayEndpoint &&
//         env.scalewayBucketName &&
//         env.scalewayRegion
//     );
// }

// let s3Client = null;

// // Service pour créer une instance de client S3 pour l'object storage
// function getS3Client() {
//     if (!s3Client) {
//         s3Client = new S3Client({
//             region: env.scalewayRegion,
//             endpoint: env.scalewayEndpoint,
//             credentials: {
//                 accessKeyId: env.scalewayAccessKey,
//                 secretAccessKey: env.scalewaySecretKey,
//             },
//             forcePathStyle: true,
//             requestChecksumCalculation: "WHEN_REQUIRED",
//         });
//     }
//     return s3Client;
// }

// // Service pour uploader un fichier de soumission dans l'object storage
// export async function uploadSubmissionFile({
//     submissionId,
//     targetName,
//     body,
//     contentType,
//     contentLength,
// }) {
//     if (!isObjectStorageConfigured()) {
//         const err = new Error("Object storage configuration is incomplete");
//         err.status = 500;
//         throw err;
//     }

//     const prefix = trimSlashes(env.scalewayFolder || "");
//     const key = prefix
//         ? ${ prefix }/${submissionId}/${ targetName }
//     : ${ submissionId }/${targetName};

//     const client = getS3Client();
//     const normalizedContentLength =
//         typeof contentLength === "number" && Number.isFinite(contentLength)
//             ? Math.max(0, Math.floor(contentLength))
//             : null;
//     await client.send(
//         new PutObjectCommand({
//             Bucket: env.scalewayBucketName,
//             Key: key,
//             Body: body,
//             ContentType: contentType || "application/octet-stream",
//             ...(normalizedContentLength !== null
//                 ? { ContentLength: normalizedContentLength }
//                 : {}),
//         })
//     );

//     return {
//         key,
//         url: buildPublicUrl({
//             endpoint: env.scalewayEndpoint,
//             bucket: env.scalewayBucketName,
//             key,
//         }),
//     };
// }

// // Service pour récupérer un flux de lecture d'un fichier stocké dans l'object storage
// export async function getSubmissionFileStreamFromStorage({ key }) {
//     if (!isObjectStorageConfigured()) {
//         const err = new Error("Object storage configuration is incomplete");
//         err.status = 500;
//         throw err;
//     }
//     if (!key || typeof key !== "string") {
//         const err = new Error("Invalid object key");
//         err.status = 400;
//         throw err;
//     }
//     const client = getS3Client();
//     const output = await client.send(
//         new GetObjectCommand({
//             Bucket: env.scalewayBucketName,
//             Key: key,
//         }),
//     );
//     if (!output?.Body) {
//         const err = new Error("Unable to read object storage stream");
//         err.status = 500;
//         throw err;
//     }
//     return {
//         stream: output.Body,
//         contentLength: Number(output.ContentLength || 0),
//         contentType: String(output.ContentType || "application/octet-stream"),
//     };
// }