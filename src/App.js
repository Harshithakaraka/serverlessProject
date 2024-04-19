import React, { useState, useEffect } from 'react';
import styles from './App.module.css'; // Import CSS module
// Import AWS and S3
import AWS from 'aws-sdk/global';
import S3 from 'aws-sdk/clients/s3';
function App() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  const [downloading, setDownloading] = useState(false);
  const [filesList, setFilesList] = useState([]);
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'application/pdf',
    'video/mp4',
    'video/quicktime',
    'audio/mpeg',
    'audio/wav',
    'text/plain',
  ];
   // Function to list files in the S3 bucket
   const listFiles = async () => {
    const S3_BUCKET = "output27031"; // Replace with your bucket name
    const REGION = "us-east-1"; // Replace with your region

    AWS.config.update({
      accessKeyId: "AKIAVWXT5M3RDHWJ5ZAW",
      secretAccessKey: "SKN6KK6ltrmPnFO6n1C5qTDPfm1uf8Ramkx0knpF",
      region: REGION
    });

    const s3 = new S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    try {
      const data = await s3.listObjectsV2({ Bucket: S3_BUCKET }).promise();
      setFilesList(data.Contents);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    listFiles();
  }, []); // Call the listFiles function when the component mounts

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
    } else {
      alert('Invalid file type. Only images and PDFs are allowed.');
    }
  };

  const uploadFile = async () => {
    setUploading(true);
    const S3_BUCKET = "fileudr2203"; // Replace with your bucket name
    const REGION = "us-east-1"; // Replace with your region

    AWS.config.update({
      accessKeyId: "AKIAVWXT5M3RDHWJ5ZAW",
      secretAccessKey: "SKN6KK6ltrmPnFO6n1C5qTDPfm1uf8Ramkx0knpF",
      region: 'us-east-1'
    });

    const s3 = new S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    const params = {
      Bucket: S3_BUCKET,
      Key: file.name,
      Body: file,
    };

    try {
      await s3.putObject(params).promise();
      setUploading(false);
      alert("File uploaded successfully.");

    } catch (error) {
      console.error(error);
      setUploading(false);
      alert("Error uploading file: " + error.message); // Inform user about the error
    }
  };
  const deleteFile = async (fileName) => {
    const S3_BUCKET = "fileudr2203"; // Replace with your bucket name
    const REGION = "us-east-1"; // Replace with your region

    AWS.config.update({
      accessKeyId: "AKIAVWXT5M3RDHWJ5ZAW",
      secretAccessKey: "SKN6KK6ltrmPnFO6n1C5qTDPfm1uf8Ramkx0knpF",
      region: REGION
    });

    const s3 = new S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    const params = {
      Bucket: S3_BUCKET,
      Key: fileName,
    };

    try {
      await s3.deleteObject(params).promise();
      alert("File deleted successfully.");
      listFiles(); // Refresh the list of files after delete
    } catch (error) {
      console.error(error);
      alert("Error deleting file: " + error.message); // Inform user about the error
    }
  };
  const downloadFile = async (fileName) => {
    const S3_BUCKET = "output27031"; // Replace with your bucket name
    const REGION = "us-east-1"; // Replace with your region

    AWS.config.update({
      accessKeyId: "AKIAVWXT5M3RDHWJ5ZAW",
      secretAccessKey: "SKN6KK6ltrmPnFO6n1C5qTDPfm1uf8Ramkx0knpF",
      region: REGION
    });

    const s3 = new S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    const params = {
      Bucket: S3_BUCKET,
      Key: fileName,
    };

    try {
      const response = await s3.getObject(params).promise();
      // Create a URL for the file
      const url = window.URL.createObjectURL(new Blob([response.Body]));
      // Create an anchor element
      const link = document.createElement('a');
      link.href = url;
      // Set the file name for the download
      link.setAttribute('download', fileName);
      // Append the anchor element to the body
      document.body.appendChild(link);
      // Click the anchor element to trigger the download
      link.click();
    } catch (error) {
      console.error(error);
      alert("Error downloading file: " + error.message);
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Add a Text File Of Any Language to Translate To English</h1>
        <input type="file" required onChange={handleFileChange} />
        <button className={styles.uploadButton} onClick={uploadFile}>
          {uploading ? 'Uploading...' : 'Upload File'}
        </button>
      </div>
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      <div className={styles.filesContainer}>
        <h2 className={styles.heading}>List Of Files Translated To English</h2>
        <table className={styles.fileTable}>
          <thead>
            <tr>
              <th>File Name</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filesList.map((fileItem, index) => (
              <tr key={index}>
                <td>{fileItem.Key}</td>
                <td>
                <button className={styles.uploadButton} onClick={() => downloadFile(fileItem.Key)}>Download</button>
                </td>
                <td>
                  <button className={styles.uploadButton} onClick={() => deleteFile(fileItem.Key)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

