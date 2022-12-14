// react
import React from "react";
// MUI
import {
  Box,
  Container,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/material";
// icons
import { FaDiscord, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <Box sx={{ backgroundColor: "neutral.main", py: 2 }}>
      <Container>
        <Stack>
          <Stack direction="row" justifyContent="center" pb={2} pt={3}>
            <Link
              color="text.secondary"
              sx={{
                mx: 3,
                transition: "transform .2s ease",
                "&:hover": {
                  color: "primary.main",
                  transform: "scale(1.2)",
                },
              }}
              href="https://www.linkedin.com/in/ali-sher-khan-1331a8205/"
              target="_blank"
            >
              <FaLinkedin size="20px" />
            </Link>
            <Link
              color="text.secondary"
              sx={{
                mx: 3,
                transition: "transform .2s ease",
                "&:hover": {
                  color: "primary.main",
                  transform: "scale(1.2)",
                },
              }}
              href="https://discordapp.com/users/Metaxa#5113"
              target="_blank"
            >
              <FaDiscord size="20px" />
            </Link>
            <Link
              sx={{
                mx: 3,
                transition: "transform .2s ease",
                "&:hover": {
                  color: "primary.main",
                  transform: "scale(1.2)",
                },
              }}
              color="text.secondary"
              href="https://github.com/alisherkhan98"
              target="_blank"
            >
              <FaGithub size="20px" />
            </Link>
            <Link
              sx={{
                mx: 3,
                transition: "transform .2s ease",
                "&:hover": {
                  color: "primary.main",
                  transform: "scale(1.2)",
                },
              }}
              color="text.secondary"
              href="https://twitter.com/AliSher03212351"
              target="_blank"
            >
              <FaTwitter size="20px" />
            </Link>
          </Stack>
          <Divider sx={{ color: "neutral.main" }} />
          <Typography color="text.secondary" textAlign="center" p={2}>
            ?? 2022 - Ali Sher Khan
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;
