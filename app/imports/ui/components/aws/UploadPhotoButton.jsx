import React from 'react';
import AWS from 'aws-sdk';
import PropTypes from 'prop-types';
import { Progress, Button } from 'semantic-ui-react';
import { makeID } from './AWSUploadFunctions';

const BUCKET_NAME = 'haccamino-main';
const REGION_NAME = 'us-west-1';
const ACCESS_KEY_ID = '';
const SECRET_ACCESS_KEY = '';

AWS.config.update({ accessKeyId: ACCESS_KEY_ID, secretAccessKey: SECRET_ACCESS_KEY });

const s3 = new AWS.S3({ params: { Bucket: BUCKET_NAME }, region: REGION_NAME });

const UploadPhotoButton = ({ parentCallback2 }) => {
    const fileInput = React.useRef();
    const [progress, setProgress] = React.useState(0);

    // handle file upload
    const uploadFile = (file) => {
        const filetype = file.name.split('.')[1];
        let filename = makeID(30);
        filename = `${filename}.${filetype}`;
        // console.log(filename);

        const params = {
            Bucket: BUCKET_NAME,
            Key: filename,
            Body: file,
            ACL: 'public-read',
        };

        s3.putObject(params).on('httpUploadProgress', (evt) => {
            setProgress(Math.round((evt.loaded / evt.total) * 100));
         }).send((err) => {
            // eslint-disable-next-line no-console
            if (err) console.log(err);
         });
        // eslint-disable-next-line no-console
        // console.log(filename);
      parentCallback2(filename);
    };

    // when the user clicks submit
    const handleClick = (event) => {
        event.preventDefault();
        const newarr = fileInput.current.files;
        for (let i = 0; i < newarr.length; i++) {
            uploadFile(newarr[i]);
        }
    };

    return (
        <>
        <div><input type='file' multiple ref={fileInput} accept={'.jpg, .jpeg, .png'}/>
              <Button type='submit' onClick={handleClick}>Upload</Button>
              <br/>
            </div>
          <br/>
            <Progress percent={progress} indicating />
        </>
    );
};

UploadPhotoButton.propTypes = {
  parentCallback2: PropTypes.func.isRequired,
};

export default UploadPhotoButton;
