import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { config } from "../config";

const s3 = new S3Client({
	region: config.aws.region,
	credentials: {
		accessKeyId: config.aws.accessKeyId,
		secretAccessKey: config.aws.secretAccessKey,
	},
});

export const generatePresignedUrl = async (key: string, contentType: string) => {
	const command = new PutObjectCommand({
		Bucket: config.aws.bucketName,
		Key: key,
		ContentType: contentType,
	});

	const url = await getSignedUrl(s3, command, { expiresIn: 300 }); // expires in 5 minutes

	return url;
};
