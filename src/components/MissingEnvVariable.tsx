import React from 'react';

export const MissingEnvVariable = () => {
  return (
    <div style={{ margin: '10px' }}>
      <h1>Missing GitHub Token</h1>
      <p>
        You need to create a .env file in the root of this project with the
        following contents:
      </p>
      <pre>REACT_APP_GITHUB_TOKEN=your_github_token</pre>
    </div>
  );
};
