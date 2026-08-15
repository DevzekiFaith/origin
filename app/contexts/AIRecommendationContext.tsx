"use client";

import React, { createContext, useContext, ReactNode } from 'react';

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  courses: string[];
  estimatedDuration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  completionRate: number;
  recommendedFor: string[];
}

export interface PersonalizedRecommendation {
  courseId: string;
  courseName: string;
  reason: string;
  confidence: number;
  priority: 'high' | 'medium' | 'low';
}

interface AIRecommendationContextType {
  learningPaths: LearningPath[];
  personalizedRecommendations: PersonalizedRecommendation[];
  loading: boolean;
  generateRecommendations: () => Promise<void>;
  getLearningPath: (pathId: string) => LearningPath | undefined;
  refreshData: () => Promise<void>;
}

const defaultContext: AIRecommendationContextType = {
  learningPaths: [],
  personalizedRecommendations: [],
  loading: false,
  generateRecommendations: async () => {},
  getLearningPath: () => undefined,
  refreshData: async () => {},
};

const AIRecommendationContext = createContext<AIRecommendationContextType>(defaultContext);

export function AIRecommendationProvider({ children }: { children: ReactNode }) {
  return (
    <AIRecommendationContext.Provider value={defaultContext}>
      {children}
    </AIRecommendationContext.Provider>
  );
}

export function useAIRecommendation() {
  return useContext(AIRecommendationContext);
}
