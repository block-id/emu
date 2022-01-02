import React from 'react';
import { FieldAttributes } from 'formik';
import { TextField, TextFieldProps } from '@mui/material';

const FormikTextField: React.FC<FieldAttributes<{}> & {muiProps: TextFieldProps}> = ({ muiProps }) => (
  <TextField
    margin="normal"
    fullWidth
    variant="outlined"
    {...muiProps}
  />
);

export default FormikTextField;
