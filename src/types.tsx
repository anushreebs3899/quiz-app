export interface QuestionOption {
    optionid: number;
    optionvalue: string;
    price: number;
    optionaction: string;
    selected: boolean;
    subquestion: any;
  }
  
  export interface Question {
    questionid: number;
    question: string;
    questiontype: string;
    attributetype: number;
    validation: boolean;
    questionoption: QuestionOption[];
    optionvalue?: string;
  }
  
  export interface QuizData {
    questions: Question[];
  }
  