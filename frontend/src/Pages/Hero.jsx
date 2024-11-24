import React from "react";
import { Navigation } from "../components/Navigation";
import { demoTheme } from "../components/Navigation";
import { PageContainer } from "@toolpad/core/PageContainer";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { AppProvider } from "@toolpad/core/AppProvider";
import { Routes, Route} from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import  { AuthContextProvider } from "../context/AuthContext";
import Home from "./Home";

const App = () => {

  return (
    <AppProvider navigation={Navigation} theme={demoTheme}>
      <DashboardLayout>
        <PageContainer>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={ <SignUp />} />
           </Routes>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
};

const Hero = () => {
  return (
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  );
};

export default Hero;
