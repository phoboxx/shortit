import React, { Fragment, useState } from 'react';
import Helmet from 'react-helmet';
import axios from 'axios';
import { Alert } from 'react-bootstrap';

const Home = (props) => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [alert, setAlert] = useState();

  const submitUrl = async () => {
    const options = {
      method: 'post',
      url: props.api,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        baseURL: url,
      },
    };
    try {
      const sendUrl = await axios(options);
      console.log(sendUrl);
      setShortUrl(sendUrl.data);
      setAlert({ variant: 'success', msg: 'Url successfuly created' });
    } catch (error) {
      console.error(error.response.data.errors[0].msg);
      setAlert({ variant: 'danger', msg: error.response.data.errors[0].msg });
    }
  };

  const enterKeyPressed = (e) => {
    if (e.key === 'Enter') {
      submitUrl();
    }
  };

  return (
    <Fragment>
      <Helmet>
        <link href='./css/all.css' rel='stylesheet' />
        <meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta http-equiv='X-UA-Compatible' content='IE=edge' />
        <meta name='author' content='colorlib.com' />
        <link
          href='https://fonts.googleapis.com/css?family=Poppins'
          rel='stylesheet'
        />
        <link href='./css/main.css' rel='stylesheet' />
      </Helmet>

      <div class='s003'>
        <h1 className='title'>Shortit</h1>
        {alert ? (
          <Alert className='alert' variant={alert.variant}>
            {alert.msg}
          </Alert>
        ) : (
          ''
        )}

        <div class='form'>
          <div class='input inner-form '>
            <div class='input-field second-wrap'>
              <input
                id='urlInput'
                name='urlInput'
                type='text'
                value={url}
                placeholder='Enter URL here.'
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={(e) => enterKeyPressed(e)}
              />
            </div>
            <div class='input-field third-wrap'>
              <button
                id='btn-search'
                class='btn-search'
                onClick={submitUrl}
                type='button'
              >
                <i class='fas fa-arrow-right'></i>
              </button>
            </div>
          </div>
        </div>
        <a className='link' href={shortUrl}>
          {shortUrl}
        </a>
      </div>
    </Fragment>
  );
};

export default Home;
