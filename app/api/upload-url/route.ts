import { S3 } from '@aws-sdk/client-s3'
import { createPresignedPost } from '@aws-sdk/s3-presigned-post'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const file = searchParams.get('file')
  const fileType = searchParams.get('fileType')

  // check if file and fileType are defined
  if (!file || !fileType) {
    throw new Error('file and fileType are undefined')
  }

  const s3Config = {
    bucketName: 'dev-shop-links',
    // dirName: 'pfp',      /* Optional */
    region: 'us-west-2',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    // s3Url: 'https://dev-shop-links.s3.us-west-2.amazonaws.com/'     /* Optional */
  }

  const s3Client = new S3(s3Config)

  const presigned_post = await createPresignedPost(s3Client, {
    Bucket: s3Config.bucketName,
    Key: file,
    // Conditions: [
    //   ['content-length-range', 0, 1048576], // up to 1 MB
    // ],
    // Fields: {
    //   'Content-Type': fileType,
    // },
    // Expires: 60, // seconds
  })

  // handle error
  if (!presigned_post) {
    throw new Error('post is undefined')
  }

  return NextResponse.json(presigned_post)
}
