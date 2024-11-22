import React from "react";
import { NAVIGATION } from "../components/Navigation";
import { demoTheme } from "../components/Navigation";
import { PageContainer } from "@toolpad/core/PageContainer";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { AppProvider } from '@toolpad/core/AppProvider';
import { Routes as Switch , Route} from "react-router-dom";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const Hero = () => {
  
  return (
    
      <AppProvider
        navigation={NAVIGATION}
        theme={demoTheme}
      >
  
        <DashboardLayout>
          <PageContainer>
            <Switch>
              <Route path="/" element={Hero}/>
              <Route path="/signup" element={<SignUp/>}/>
              <Route path="/signin" element={<SignIn/>}/>
            </Switch>
          </PageContainer>
        </DashboardLayout>
      </AppProvider>
  );
};

export default Hero;
