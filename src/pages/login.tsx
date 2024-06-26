import { ANIMATION_VERTICAL_FADE } from '@/styles/animations';
import styled from '@emotion/styled';
import { Box, Container, IconButton, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import type { NextPage } from 'next';
import Head from 'next/head';
import GoogleIcon from '@mui/icons-material/Google';
import React from 'react';
import { useAuthContext } from '@/client/context/AuthSessionContext';

const RootStyle = styled("div")({
  background: "rgb(228 249 239)",
  height: "100vh",
  display: "grid",
  placeItems: "center",
});

const HeadingStyle = styled(Box)({
  textAlign: "center",
});

const ContentStyle = styled("div")({
  maxWidth: 480,
  padding: 25,
  margin: "auto",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  background: "#fff",
});

const Login: NextPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const { signinWithGoogle } = useAuthContext();

  const googleSignIn = async () => {
      setIsLoading(true);
      await signinWithGoogle();
      window.location.href = '/';
  };


  return (
    <RootStyle>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="sm">

        <ContentStyle>

          <HeadingStyle component={motion.div} {...ANIMATION_VERTICAL_FADE}>
            <Typography variant="h5" sx={{ color: "text.secondary", mb: 5 }}>
              Login to Advanzo Wors Web
              <Typography variant="caption" sx={{ color: "text.secondary", ml: 1 }}>
                {process.env.version}
              </Typography>
            </Typography>
          </HeadingStyle>

          <Box component={motion.div} {...ANIMATION_VERTICAL_FADE}>
            <Stack direction="row" spacing={2}>
              <IconButton
                sx={{
                  border: "2px solid #ccc",
                  borderRadius: "5px",
                  padding: "0.5675rem",
                  flex: 1,
                }}
                disabled={isLoading}
                color="primary"
                onClick={googleSignIn}>
                Login with Google
                <GoogleIcon sx={{
                  ml: 1,
                }} />
              </IconButton>
            </Stack >
          </Box>

        </ContentStyle>

      </Container>

    </RootStyle>
  )
}

export default Login