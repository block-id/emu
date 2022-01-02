import React from 'react';
import {
  Formik, Form, FormikProps, FormikValues,
} from 'formik';
import { Button, Link } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

import FormikTextField from 'common/components/formik/FormikTextField';
import ErrorMessage from 'common/components/formik/ErrorMessage';
import AuthService from 'apps/auth/services/AuthService';

const authService = new AuthService();
const RegisterForm: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ username: '', password: '', password2: '' }}
      validate={(values) => {
        const errors: {
          username?: string;
          password?: string;
          password2?: string;
        } = {};

        if (values.username.trim().length <= 0) {
          errors.username = 'Username is required';
        }

        if (values.username.trim().length <= 0) {
          errors.password = 'Password is required';
        }

        if (values.password.trim() !== values.password2.trim()) {
          errors.password2 = 'Passwords do not match';
        }

        return errors;
      }}
      onSubmit={async (values) => {
        try {
          await authService.register(values.username, values.password, values.password2);
          navigate('/auth');
        } catch (error: any) {
          // TODO: Replace with toast library
          alert(`Error: ${error.message}`);
        }
      }}
    >
      {({ isSubmitting }: FormikProps<FormikValues>) => (
        <Form style={{ width: '100%' }}>
          <FormikTextField
            type="input"
            name="username"
            placeholder="Username"
            size="small"
          />
          <ErrorMessage name="username" />
          <FormikTextField
            type="password"
            name="password"
            placeholder="Password"
            size="small"
          />
          <ErrorMessage name="password" />
          <FormikTextField
            type="password"
            name="password2"
            placeholder="Confirm Password"
            size="small"
          />
          <ErrorMessage name="password2" />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isSubmitting}
          >
            Register
          </Button>
          <Link component={RouterLink} to="/auth" underline="none">Login instead?</Link>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
