// react
import React, { useState, useRef } from "react";
// MUI
import { Box, Container, Grid, Typography } from "@mui/material";

// components
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ShopCard from "../components/ShopCard";
import Footer from "../components/Footer";
import MyAlert from "../components/MyAlert";
import ScrollToTop from "../components/ScrollToTop";
// data
import data from "../data";
// img
import bgImage from "../assets/img/hero2.jpg";

function ShopScreen() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const shopRef = useRef(null);

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Hero bgUrl={bgImage} text="It's not too late" buttonText="Act Now" />
      <Box ref={shopRef} sx={{ backgroundColor: "neutral.main", py: 8 }}>
        <Container>
          {/* alert */}
          {isAlertOpen && (
            <Box mb={5}>
              <MyAlert severity="error">
                <Typography variant="body1" width="fit-content">
                  You need to sign in to add items to your cart
                </Typography>
              </MyAlert>
            </Box>
          )}
          {/* cards */}
          <Grid container>
            {data.map((treeData) => (
              <Grid key={treeData.id} item xs={12} sm={4} p={2}>
                <ShopCard
                  shopRef={shopRef}
                  treeData={treeData}
                  setIsAlertOpen={setIsAlertOpen}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

export default ShopScreen;
