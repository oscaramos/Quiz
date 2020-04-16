import React from 'react';

import './results.styles.scss'

const ResultsPage = ({ onStartQuiz }) => (
  <div className='results-page'>
    <div className='result'>Correct answers: 3/10</div>
    <div className='result'>Time: 8 minutes with 3 seconds</div>
    <button className='start-button' onClick={onStartQuiz}>Start Quiz</button>
  </div>
);

export default ResultsPage;