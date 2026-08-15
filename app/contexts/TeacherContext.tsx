"use client";

import React, { createContext, useContext, ReactNode } from 'react';

export interface StudentProgress {
  userId: string;
  userName: string;
  userEmail: string;
  courseId: string;
  courseTitle: string;
  progress: number;
  completed: boolean;
  lastActive: string;
}

export interface ClassStats {
  totalStudents: number;
  activeStudents: number;
  avgCompletionRate: number;
  totalCoursesAssigned: number;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  courseId: string;
  dueDate: string;
  assignedStudents: string[];
  submissions: {
    userId: string;
    submittedAt: string;
    score?: number;
    feedback?: string;
  }[];
}

interface TeacherContextType {
  isTeacher: boolean;
  students: StudentProgress[];
  classStats: ClassStats;
  assignments: Assignment[];
  loading: boolean;
  createAssignment: (assignment: Omit<Assignment, 'id' | 'submissions'>) => Promise<boolean>;
  gradeSubmission: (assignmentId: string, userId: string, score: number, feedback: string) => Promise<boolean>;
  getStudentProgress: (userId: string) => StudentProgress[];
  refreshData: () => Promise<void>;
}

const defaultContext: TeacherContextType = {
  isTeacher: false,
  students: [],
  classStats: {
    totalStudents: 0,
    activeStudents: 0,
    avgCompletionRate: 0,
    totalCoursesAssigned: 0,
  },
  assignments: [],
  loading: false,
  createAssignment: async () => false,
  gradeSubmission: async () => false,
  getStudentProgress: () => [],
  refreshData: async () => {},
};

const TeacherContext = createContext<TeacherContextType>(defaultContext);

export function TeacherProvider({ children }: { children: ReactNode }) {
  return (
    <TeacherContext.Provider value={defaultContext}>
      {children}
    </TeacherContext.Provider>
  );
}

export function useTeacher() {
  return useContext(TeacherContext);
}
