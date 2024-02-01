import React, { useState } from 'react';
import './App.css';
import HomeComponent from "./components/HomeComponent";
import QuizComponent from "./components/QuizComponent";
import { Route, useNavigate } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import ResultComponent from "./components/ResultComponent";
import Data from "./resources/Questions.json"

function App() {

  let [ques, setQues] = useState(0)
  let [score, setScore] = useState(0)
  let [attempt, setAttempt] = useState(0)
  let result = useNavigate()
  
  const clickNext = () => {
    if (ques < Data.length - 1) 
      setQues(ques + 1)
    else if (ques >= Data.length - 1){
      result("/result")
    }
  }

  const clickPrev = () => {
    if (ques > 0)
      setQues(ques - 1)
  }

  const clickQuit = () => {
    if (window.confirm("Are you sure that you want to quit ?")) {
      result("/result")
    }
  }

  const calculateScore = (e) => {
    setAttempt(attempt + 1)
    if (e.target.innerHTML == Data[ques].answer) {
      alert("Correct answer")
      setScore(score + 1)
    }
    else {
      alert("Wrong answer")
    }
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomeComponent/>}></Route>
        <Route path='/quiz' element={<QuizComponent clickNext={clickNext} clickPrev={clickPrev} clickQuit={clickQuit} ques={ques} index={Data[ques]} calculateScore={calculateScore}/>}></Route>
        <Route path='/result' element={<ResultComponent score={score} attempt={attempt}/>}></Route>       
      </Routes>
    </div>
  );
}
                                                                                                                       
export default App;