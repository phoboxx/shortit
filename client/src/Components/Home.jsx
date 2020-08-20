import React, { Fragment, useState, Link } from 'react';
import axios from 'axios';
const Home = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const submitUrl = async () => {
    const options = {
      method: 'post',
      url: 'http://127.0.0.1:3000/api/shortit',
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <input
        type='text'
        value={url}
        name='urlInput'
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={submitUrl}>Submit</button>
      <a href={shortUrl}>{shortUrl}</a>
    </Fragment>
  );
};

export default Home;
