import React, { Fragment } from 'react';
import Helmet from 'react-helmet';

const Test = () => {
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
        <h1>Shortit</h1>
        <form>
          <div class='inner-form'>
            <div class='input-field second-wrap'>
              <input id='search' type='text' placeholder='Enter URL here.' />
            </div>
            <div class='input-field third-wrap'>
              <button class='btn-search' type='button'>
                <i class='fas fa-arrow-right'></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Test;
