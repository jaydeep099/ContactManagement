import React from "react";
import { NAVIGATION } from "../components/Navigation";
import { demoTheme } from "../components/Navigation";
import { PageContainer } from "@toolpad/core/PageContainer";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { AppProvider } from '@toolpad/core/AppProvider';

const Hero = () => {
  
  return (
    
      <AppProvider
        navigation={NAVIGATION}
        theme={demoTheme}
      >
        <DashboardLayout>
          <PageContainer>
            
          </PageContainer>
        </DashboardLayout>
      </AppProvider>
  );
};

export default Hero;
