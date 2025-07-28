
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface OnboardingContextType {
  hasCompletedOnboarding: boolean;
  loading: boolean;
  completeOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  // Always treat onboarding as completed to bypass the flow.
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(true);
  const [loading, setLoading] = useState(false);

  const completeOnboarding = () => {
    setHasCompletedOnboarding(true);
  };

  return (
    <OnboardingContext.Provider value={{ hasCompletedOnboarding, loading, completeOnboarding }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
