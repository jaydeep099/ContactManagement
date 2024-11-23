import React from "react";
import { Navigation } from "../components/Navigation";
import { demoTheme } from "../components/Navigation";
import { PageContainer } from "@toolpad/core/PageContainer";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { AppProvider } from "@toolpad/core/AppProvider";
import { Routes, Route } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { AuthContextProvider } from "../context/AuthContext";

const Hero = () => {
  return (
    <AppProvider navigation={Navigation} theme={demoTheme}>
      <AuthContextProvider>
        <DashboardLayout>
          <PageContainer>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
            </Routes>
          </PageContainer>
        </DashboardLayout>
      </AuthContextProvider>
    </AppProvider>
  );
};

export default Hero;