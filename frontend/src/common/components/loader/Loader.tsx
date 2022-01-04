import React from 'react';

import ClipLoader from 'react-spinners/ClimbingBoxLoader';

const Loader: React.FC = () => {
  const override = `
    display: block;
    margin: 0 auto;
    vertical-align:center;
    border-color: red;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  `;

  return (
    <ClipLoader
      color="#FFB49A"
      loading
      css={override}
      size={20}
    />
  );
};

export default Loader;
