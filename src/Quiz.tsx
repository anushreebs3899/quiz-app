import React, { useState } from 'react';
import { Question, QuizData } from './types';
import './styles.css';
import { FaArrowLeft } from 'react-icons/fa';


type QuizProps = {
  questions: Question[];// defining props for Quiz component
};

const Quiz = ({ questions }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0); // current question index
  const [previousQuestion, setPreviousQuestion] = useState(-1); // previous question index
  const [answers, setAnswers] = useState<Record<number, string>>({}); // object to store answers

  
 
  const handleOptionSelect = (questionId: number, optionValue: string) => {
    const optionId = parseInt(optionValue, 10);
    setAnswers({ ...answers, [questionId]: optionValue });
  };
  
  

  
  const handlePreviousQuestion = () => {
    setCurrentQuestion(previousQuestion);
    setPreviousQuestion(currentQuestion - 1);
  };
  const handleNextQuestion = () => {
    setPreviousQuestion(currentQuestion);
    setCurrentQuestion(currentQuestion + 1);
    console.log("ANSWERS--->",answers)
  };

  const calculateScore = () => {
    let totalScore = 0;
    for (const [questionId, optionId] of Object.entries(answers)) {
      const question = questions.find(q => q.questionid === parseInt(questionId, 10));
      const selectedOption = question?.questionoption.find(option => option.optionvalue === optionId); 
      if (selectedOption?.price) {
        totalScore += selectedOption.price;
      }
    }
    return totalScore;
  };

  const score = calculateScore();
  
//rendering results
  if (currentQuestion >= questions.length) {
    return (
      <div className="container">
        <h2>Quiz complete!</h2>
        <p>Your score is {score}</p>
        <h2>YOUR SELECTED ANSWERS</h2>
        {Object.keys(answers).map((key) => {
  const questionId = parseInt(key);
  const question = questions.find((q) => q.questionid === questionId);
  const answer = answers[questionId];
  return (
    <div key={questionId}>
      <p>{question?.question}</p>
      <p>{answer}</p>
    </div>
  );
})}
      </div>
    );
  }
  const handleCheckbox = (questionId: number, optionValue: string) => {
    const selectedOptions = answers[questionId] ? answers[questionId].split(',') : [];
    const optionIndex = selectedOptions.indexOf(optionValue);
    if (optionIndex > -1) {
      selectedOptions.splice(optionIndex, 1);
    } else {
      selectedOptions.push(optionValue);
    }
    const answerValue = selectedOptions.join(',');
    setAnswers({ ...answers, [questionId]: answerValue });
  };
  
  const currentQuestionData = questions[currentQuestion];
  


  return (<div className="container" style={{paddingLeft:"25vh",paddingRight:"25vh"}}>
    <div className="card-container" style={{height:"85vh",}}
   
    ><div style={{backgroundColor:"#f8f2f2"}}>
      <button disabled={currentQuestion === 0}style={{ alignSelf: "flex-start",marginBottom:"10px" }}
      onClick={handlePreviousQuestion}>
      <FaArrowLeft size={24}  color="black"/>
      </button>
</div><div style={{flexGrow:"1"}}>
      <h2 style={{backgroundColor:"white",padding:"30px"}} >{currentQuestionData.question}</h2>
      {currentQuestionData.questiontype === 'Textarea' && (
        <div  style={{borderTop:"1px solid black",backgroundColor:"white",padding:"30px"}}>
        <textarea
          value={answers[currentQuestionData.questionid] || ''}
          onChange={e => setAnswers({ ...answers, [currentQuestionData.questionid]: e.target.value })}
        />
        </div>
      )}
      {currentQuestionData.questiontype === 'Date' && (
        <div  style={{borderTop:"1px solid black",backgroundColor:"white",padding:"30px"}}>
        <input
          type="date"
          value={answers[currentQuestionData.questionid] || ''}
          onChange={e => {
            console.log("INPUT DATE",[currentQuestionData.questionid])
            setAnswers({ ...answers, [currentQuestionData.questionid]: e.target.value })}}
        /></div>
      )}
      {currentQuestionData.questiontype === 'Checkbox' && (
      <>
        {currentQuestionData.questionoption.map(option => (
          <div key={option.optionid}
          style={{borderTop:"1px solid black",backgroundColor:"white",padding:"30px"}}>
            <input
              type="checkbox"
              name={`question-${currentQuestionData.questionid}`}
              id={`option-${option.optionid}`}
              value={option.optionid}
              checked={answers[currentQuestionData.questionid]?.includes(option.optionvalue) ?? false}
              onChange={()=>{handleCheckbox (currentQuestionData.questionid,option.optionvalue)}  }       
              

            />
            <label htmlFor={`option-${option.optionid}`}>{option.optionvalue}</label>
            
          </div>
        ))}
      </>
    )}
      
      {!(currentQuestionData.questiontype === 'Checkbox' || 
            currentQuestionData.questiontype === 'Textarea' || 
            currentQuestionData.questiontype === 'Date')&&currentQuestionData.questionoption.map(option => (
        <div key={option.optionid} 
        style={{borderTop:"1px solid black",backgroundColor:"white",padding:"30px"}}>
          <input
            type=
            {currentQuestionData.questiontype === 'Checkbox' || 
            currentQuestionData.questiontype === 'Textarea' || 
            currentQuestionData.questiontype === 'Date' ? 'hidden' : currentQuestionData.questiontype}
            name={`question-${currentQuestionData.questionid}`}
            id={`option-${option.optionid}`}
            value={option.optionid}
            checked={answers[currentQuestionData.questionid] === option.optionvalue}
            onChange={() => handleOptionSelect(currentQuestionData.questionid, option.optionvalue)}
          />
          <label 
          htmlFor={`option-${option.optionid}`}>{currentQuestionData.questiontype === 'Checkbox' || 
          currentQuestionData.questiontype === 'Textarea' || 
          currentQuestionData.questiontype === 'Date' ? "" :option.optionvalue}</label>
        </div>
      ))}</div>
     <div style={{display:"flex",justifyContent:"flex-end",backgroundColor:"rgb(248, 242, 242)"}}>
      <button disabled={!answers[currentQuestionData.questionid]} onClick={handleNextQuestion}
      style={{ alignSelf: "flex-end" }}>
        {currentQuestion >= questions.length-1?"SUBMIT":"NEXT"}
      </button>
      </div>
    </div>
    </div>
  );
};

export default Quiz;
