// Import React, createContext, and useState
import React, { createContext, useState } from 'react';

// Import QuizData type from types.ts file
import { QuizData } from './types';

// Define the shape of the QuizContextType
type QuizContextType = {
quizData: QuizData;
setQuizData: React.Dispatch<React.SetStateAction<QuizData>>;
};

// Create a new context with the initial value of an empty array for questions and an empty function for setting quiz data
export const QuizContext = createContext<QuizContextType>({
quizData: { questions: [] },
setQuizData: () => {},
});

// Define the shape of the QuizProviderProps
type QuizProviderProps = {
children: React.ReactNode;
initialQuizData: QuizData;
};

// Create a QuizProvider component that takes in the initial quiz data as a prop
export const QuizProvider = ({ children, initialQuizData }: QuizProviderProps) => {
// Set up state for the quiz data, with the initial value being the initial quiz data passed in as a prop
const [quizData, setQuizData] = useState(initialQuizData);

// Return the QuizContext.Provider component with the quiz data and setQuizData function as values and the child components as children
return <QuizContext.Provider value={{ quizData, setQuizData }}>{children}</QuizContext.Provider>;
};