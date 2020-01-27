import React from 'react';

import s from './NotFound.module.scss';

class NotFound extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <h1 className={s.title}>404</h1>
        <p>Sorry, the page you were trying to view does not exist.</p>
      </div>
    );
  }
}

export default NotFound