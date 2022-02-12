import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Form, Formik, FormikProps, FormikValues,
} from 'formik';
import {
  Avatar, Box, Button, Container, Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { getVpPayload } from 'apps/credentials/utils';
import FormikTextField from 'common/components/formik/FormikTextField';
import ErrorMessage from 'common/components/formik/ErrorMessage';
import VpAlert from 'apps/credentials/components/vp-alert/VpAlert';
import SendVp from 'apps/credentials/components/send-vp/SendVp';
import IdService from 'apps/credentials/services/IdService';

const idService = new IdService();
const AuthenticateCreateVp: React.FC = () => {
  const payload = getVpPayload();
  const { id } = useParams();

  const [showSend, setShowSend] = useState(false);
  const [verifiablePresentation, setVerifiablePresenation] = useState<VerifiablePresentation | null>(null);
  const onSubmit = (password: string) => {
    idService
      .createVp(Number.parseInt(id as string), {
        ...(payload as VpRequestPayload),
        password,
      })
      .then((response) => {
        setVerifiablePresenation(response.data);
        setShowSend(true);
      })
      .catch((err) => {
        console.log(err);
        alert('Handle error!');
      });
  };

  return (
    <>
      {showSend ? (
        <SendVp vp={verifiablePresentation as VerifiablePresentation} sendTo={payload?.sendTo as string} />
      ) : (
        <>
          <VpAlert />
          <Container maxWidth="xs">
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ mb: 2, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon fontSize="medium" />
              </Avatar>
              <Typography variant="h5">Enter your password</Typography>

              <Formik
                initialValues={{ password: '' }}
                validate={(values) => {
                  console.log(values);
                  const errors: { password?: string } = {};

                  if (values.password.trim().length <= 0) {
                    errors.password = 'Password is required';
                  }

                  return errors;
                }}
                onSubmit={async (values) => {
                  try {
                    onSubmit(values.password);
                  } catch (error: any) {
                    // TODO: Replace with toast library
                    alert(`Error: ${error.message}`);
                  }
                }}
              >
                {({ isSubmitting }: FormikProps<FormikValues>) => (
                  <Form style={{ width: '100%' }}>
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
                      Authenticate
                    </Button>
                  </Form>
                )}
              </Formik>
            </Box>
          </Container>
        </>
      )}
    </>
  );
};

export default AuthenticateCreateVp;
