import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';

function Ap() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    listS3Files();
  }, []);

  const listS3Files = async () => {
    const s3 = new AWS.S3();
    const params = {
      Bucket: 'fileudr2203', // Replace with your bucket name
    };

    try {
      const data = await s3.listObjectsV2(params).promise();
      setFiles(data.Contents);
    } catch (error) {
      console.error('Error listing files:', error);
    }
  };

  return (
    <div>
      <h1>List of Files in S3 Bucket</h1>
      <ul>
        {files.map((file, index) => (
          <li key={index}>{file.Key}</li>
        ))}
      </ul>
    </div>
  );
}

export default Listfiles;
