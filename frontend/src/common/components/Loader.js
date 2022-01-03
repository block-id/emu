import React from 'react';
import { useState } from "react";
import { css } from "@emotion/react";

import ClipLoader from "react-spinners/ClimbingBoxLoader";

const override = css`
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


const Loader = () => {
  let [color, setColor] = useState("#FFB49A");
  let [loading, setLoading] = useState(true);

  return (
    <div>
      <ClipLoader color={color} loading = {loading} css={override} size={20}  />
    </div>
  );
};

export default Loader;