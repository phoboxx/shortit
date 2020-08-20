import React, { Fragment } from 'react';
import axios from 'axios';

const ShortURL = (props) => {
  console.log(props.api);
  const redirect = async () => {
    const options = {
      method: 'get',
      url: `${props.api}${window.location.pathname}`,
    };
    try {
      const redirection = await axios(options);

      // Redirects to the baseURL
      window.location = redirection.data;
    } catch (error) {
      console.error(error);
    }
  };
  redirect();
  return (
    <Fragment>
      <h1>This is ShortURL</h1>
    </Fragment>
  );
};

export default ShortURL;
