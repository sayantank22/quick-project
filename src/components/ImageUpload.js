import React, { Fragment, useState } from 'react';
import Message from './Message';
import ProgressBar from './ProgressBar';
import axios from 'axios';
import cors from 'cors';

const FileUpload = () => {
  const [filename, setFilename] = useState('Choose File');
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const types = ['image/png', 'image/jpeg'];

  const fileSelectedHandler = (e) => {
    console.log(e.target.files[0].size);
    if (e.target.files[0] && types.includes(e.target.files[0].type)) {
      if (e.target.files[0] && e.target.files[0].size < 10000000) {
        setSelectedFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
        setError('');
      } else {
        setSelectedFile(null);
        setError('Image is too large');
      }
    } else {
      setSelectedFile(null);
      setError('Please select an image file (png or jpg)');
    }
  };

  const fileUploadHandler = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('image', selectedFile, selectedFile.name);
    axios
      .post(
        'https://us-central1-testproject-257115.cloudfunctions.net/api/uploadImage/lwZE0p7IGq1zpm7xAjD2',
        fd,
        {
          onUploadProgress: (progressEvent) => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );

            // Clear percentage
            setTimeout(() => setUploadPercentage(0), 10000);
            setDisabled(true);
          },
        },
        cors
      )
      .then((res) => {
        console.log(res);
        setMessage('Image Uploaded Successfully!');
        setDisabled(false);
      })
      .catch((err) => {
        if (err.response.status === 500) {
          setMessage('There was a problem with the server');
        } else {
          setMessage(err.response.data.msg);
        }
        console.log(err);
      });
  };

  return (
    <Fragment>
      {message ? <Message msg={message} setMessage={setMessage} /> : null}
      <form onSubmit={fileUploadHandler}>
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={fileSelectedHandler}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>

        <ProgressBar percentage={uploadPercentage} />

        <input
          disabled={disabled}
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />
        {error && (
          <div className='error' style={{ color: '#ff4a4a' }}>
            {error}
          </div>
        )}
      </form>
    </Fragment>
  );
};

export default FileUpload;
