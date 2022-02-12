import React from 'react';
import {
  Formik, Form, FormikProps, FormikValues,
} from 'formik';
import { Button, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import FormikTextField from 'common/components/formik/FormikTextField';
import ErrorMessage from 'common/components/formik/ErrorMessage';
import { useUser } from 'common/providers/user-provider/UserProvider';
import AuthService from 'apps/auth/services/AuthService';

const authService = new AuthService();
const LoginForm: React.FC = () => {
  const [dummy, setUser] = useUser();

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validate={(values) => {
        console.log(values);
        const errors: { username?: string; password?: string; } = {};

        if (values.username.trim().length <= 0) {
          errors.username = 'Username is required';
        }

        if (values.password.trim().length <= 0) {
          errors.password = 'Password is required';
        }

        return errors;
      }}
      onSubmit={async (values) => {
        console.log(`submit: ${values}`);
        try {
          const user = await authService.login(values.username, values.password);
          setUser(user);
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isSubmitting}
          >
            Sign In
          </Button>
          <Link component={RouterLink} to="register" underline="none">Register instead?</Link>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
