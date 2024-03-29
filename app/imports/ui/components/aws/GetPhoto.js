import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: '',
    secretAccessKey: '',
});

const S3_BUCKET = 'haccamino-main';
const REGION = 'us-west-1';
const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
});

// this component will take a collection and try to take in the key from data.key
// and return a link to the photo to be used in an image tag.
export const GetPhoto = (data) => {
    let imageKey;
    if (data === undefined) {
        imageKey = null;
    } else {
        imageKey = data;
    }

    function isThereAPhoto(key) {
        if (!key) {
            return null;
        }
        const params = {
            Bucket: S3_BUCKET,
            Key: key,
        };
        return myBucket.getSignedUrl('getObject', params);
    }

    return isThereAPhoto(imageKey);
};
