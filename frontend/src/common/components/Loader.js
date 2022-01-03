import React from 'react';
import { useState } from "react";
import { css } from "@emotion/react";

import ClipLoader from "react-spinners/ClimbingBoxLoader";

const Override = css`
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

const Color = "#FFB49A";
const Loading = true;

const Loader = () => {
  return (
    <div>
      <ClipLoader color={Color} loading = {Loading} css={Override} size={20}  />
    </div>
  );
};

export default Loader;