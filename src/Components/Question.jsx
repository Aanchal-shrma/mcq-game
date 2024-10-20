import React, { useState,useRef } from 'react'
import {data} from '../assets/data.js'

function Question() {
    const[index, setIndex] = useState(0);
    const[ques, setQues] = useState(data[index]);
    const[lock, setLock] = useState(false);
    const[score, setScore] = useState(0);
    const[result, setResult] = useState(false);

    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);

    let options = [Option1, Option2, Option3, Option4];

    const checkAnswer = (e,ans) => {
        if(lock == false){
            if(ques.ans == ans){
                e.target.classList.add("correct");
                setLock(true);
                setScore(prev => prev + 1);
            }else{
                e.target.classList.add("wrong");
                setLock(true);
                options[ques.ans-1].current.classList.add("correct");
            }
            }
        }

        let next = () => {
          if(lock === true){
            if(index === data.length - 1){
                setResult(true);
                return 0;
            }
            setIndex(index + 1);
            setQues(data[index + 1]);
            setLock(false);
            options.map((option) => {
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
            })
          }
        }

        let reset = () => {
            setIndex(0);
            setQues(data[0]);
            setScore(0);
            setLock(false);
            setResult(false);
        }
        
  return (
    <div className='container text-black mt-20 mb-20 md:mt-28 bg-white flex-col pt-10 pb-10 pl-7 pr-10 rounded-md'>
      <h1 className='text-2xl font-bold mb-5'>Test your development skills</h1>
      {result?<></> : <>
        <h2 className='text-sm md:text-xl'>{index + 1}. {ques.quetsion}
      </h2>
      <ul>
       
        <li className='rounded-md pt-2 pb-1 pl-5 border-2 mt-2 cursor-pointer'
        ref = {Option1} onClick={(e) => {checkAnswer(e,1)}}
        >{ques.option1}</li>
        <li className='rounded-md pt-2 pb-1 pl-5 border-2 mt-2 cursor-pointer'
        ref = {Option2} onClick={(e) => {checkAnswer(e,2)}}
        >{ques.option2}</li>
        <li className='rounded-md pt-2 pb-1 pl-5 border-2 mt-2 cursor-pointer'
        ref = {Option3} onClick={(e) => {checkAnswer(e,3)}}
        >{ques.option3}</li>
        <li className='rounded-md pt-2 pb-1 pl-5 border-2 mt-2 cursor-pointer'
        ref = {Option4} onClick={(e) => {checkAnswer(e,4)}}
        >{ques.option4}</li>
      </ul>
      <button className="btn ml-20 mt-10 bg-blue-950 text-white rounded-md pt-2 pb-2 pl-5 pr-5 md:ml-32"
      onClick={next}
      >Next</button>
      </>}
      {result?<>
        <h2 className='text-2xl font-bold text-green-800'>your score {score} out of {data.length}</h2>
        <button className='btn ml-20 mt-10 bg-blue-950 text-white rounded-md pt-2 pb-2 pl-5 pr-5 md:ml-32'
        onClick={reset}
        >reset</button>
      </>:<></>}
     
    </div>
  )

}
export default Question
