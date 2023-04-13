import { ANIMATION_VERTICAL_FADE } from '@/styles/animations';
import styled from '@emotion/styled';
import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import type { NextPage } from 'next';
import Head from 'next/head';

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

const Home: NextPage = () => {
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
              Welcome to Advanzo Wors Web
              <Typography variant="caption" sx={{ color: "text.secondary", ml: 1 }}>
                0.0.0-alpha.1
              </Typography>
            </Typography>
          </HeadingStyle>

        </ContentStyle>

      </Container>

    </RootStyle>
  )
}

export default Home