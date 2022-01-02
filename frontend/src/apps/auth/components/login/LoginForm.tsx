import React from 'react';
import {
  Formik, Form, FormikProps, FormikValues,
} from 'formik';
import { Button } from '@mui/material';

import FormikTextField from 'common/components/formik/FormikTextField';
import ErrorMessage from 'common/components/formik/ErrorMessage';

const LoginForm: React.FC = () => (
  <Formik
    initialValues={{ username: '', password: '' }}
    validate={(values) => {
      const errors: {username?: string, password?: string} = {};

      if (values.username.trim().length <= 0) {
        errors.username = 'Username is required';
      }

      if (values.username.trim().length <= 0) {
        errors.password = 'Password is required';
      }

      return errors;
    }}
    onSubmit={() => {}}
  >
    {({ isSubmitting }: FormikProps<FormikValues>) => (
      <Form style={{ width: '100%' }}>
        <FormikTextField
          type="input"
          name="username"
          muiProps={{
            placeholder: 'Username',
            size: 'small',
          }}
        />
        <ErrorMessage name="username" />
        <FormikTextField
          type="password"
          name="password"
          muiProps={{
            placeholder: 'Password',
            size: 'small',
          }}
        />
        <ErrorMessage name="password" />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isSubmitting}
        >
          Sign In
        </Button>
      </Form>
    )}
  </Formik>
);

export default LoginForm;
