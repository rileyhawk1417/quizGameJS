/*
Some Functions are as they say 
descriptively. Mostly comments are for me
since i tend to forget at times ^_^
*/

import {questions} from './questions.js';

const imgDisplay = document.getElementById('image');
let quesBox = document.getElementById('ques-box');
const answerBox = document.getElementById('ans-box');
const imgContainer = document.getElementById('img-box');
let box = document.getElementById('main-box');
const startContainer = document.getElementById('button');
const questionBar = document.getElementById('question-bar');
const controllers = document.getElementById('controllers');
const restart = document.getElementById('restart');
const next = document.getElementById('next');
const timeBox = document.getElementById('time-box');
const remainingTime = document.querySelector('.displayTimeLeft');
const topElements = document.querySelector('#top');
const escapeKey = document.querySelector('#quit');
let scoreBoard = document.querySelector('#scoreNumber');


let shuffledQuestions, currentQuestion, countdown;
let score = 0;

//resets the game and the state and goes back to the welcome function
function restartGame(){
    resetState();
    score = 0;
    //take it back to the beginning of the game
    location.reload();
} 

/*
starts game by removing some elements and 
preparing the questions.
Questions are selected randomly using array 
function sort and math function random
*/
function startGame(){
    startTimer();
    loadGameElements();
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestion = 0;
    loadNextQuestion();
}

//loads game elements necessary
function loadGameElements(){
    timeBox.style.visibility="visible";
    startContainer.style.display = "none";
    answerBox.style.visibility = "visible";
    quesBox.style.visibility = "visible";
    questionBar.style.visibility = "visible";
}

//image loader function with size and style
function imgLoad(){
    imgDisplay.style.visibility = "visible";
    imgContainer.style.display = "content";
    imgDisplay.style.width = "350px";
    imgDisplay.style.height = "200px";
}

function nextQuestion(){
    if(currentQuestion>questions.length){
            console.log("Am less than");
    } else if(currentQuestion<questions.length){
        currentQuestion++;
        loadNextQuestion();
    } 

    else {
        let saveScore = localStorage.setItem('recentScore', score);
        location.replace('../../quizGameJS/pages/endGame.html');
    }
}

//loads the next question
function loadNextQuestion(){
    resetState();
    loadQuestions(shuffledQuestions[currentQuestion]);
}

//question is the argument for our array with the questions
function loadQuestions(question){
    imgLoad();
    controllers.style.visibility = "visible";
    box.classList.remove('displayBox');
    questionBar.innerText = question.ques;
    imgDisplay.src = question.image;
    question.ans.forEach((answer) => {
        const button = document.createElement('button');
        button.innerText = answer.choice;
        button.classList.add('ans');
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', choiceSelect);
        answerBox.appendChild(button);
        /*
        putting this function in causes a stack error in memory
        loadNextQuestion();
        */
    });
}

//this function determines if the answer is correct with argument (e) is for events
function choiceSelect(e){
    const selectedChoice = e.target;
    const correct = selectedChoice.dataset.correct;
    Array.from(answerBox.children).forEach(button => {
        setStatus(button, button.dataset.correct);
    });
    if(correct){
        score+=1;
        scoreBoard.innerHTML=score;
    }
}

//sets status if answer is correct or wrong
function setStatus(element, correct){
    clearStatus(element);
    if(correct){
        element.classList.add('correct');
        element.classList.remove('ans');
        
    }else{
        element.classList.add('wrong');
        element.classList.remove('ans');
    }
}

//clears element to reset colors
function clearStatus(element){
    element.classList.remove('correct');
    element.classList.add('ans');
    element.classList.remove('wrong');
    element.classList.add('ans');
}

function countDownTimer(seconds){
    clearInterval(countdown);

    const now = Date.now();
    const secs = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(secs);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((secs - Date.now()) / 1000);
        if(secondsLeft<0){
            clearInterval(countdown);
            endGame();
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds){
    const mins = Math.floor(seconds / 60);
    const secsLeft = seconds % 60;
    const display = `${mins}:${secsLeft < 10 ? '0' : ''}${secsLeft}`;
    document.title = display;
    remainingTime.textContent = display;
}

function displayEndTime(timeStamp){
    const end = new Date(timeStamp);
    const mins = end.getMinutes();
}

function startTimer(){
    let seconds=20;
    countDownTimer(seconds);
}

function endGame(){
    let saveScore = localStorage.setItem('recentScore', score);
    alert("You didnt finish in time");
    location.replace('../../quizGameJS/pages/endGame.html');
}

const quitGame = () =>{
    let saveScore = localStorage.setItem('recentScore', score);
    alert("You quit the game");
    location.replace('../../quizGameJS/pages/endGame.html');
};

//resets by removing first child of the element
function resetState(){
    while(answerBox.firstChild){
        answerBox.removeChild(answerBox.firstChild);
    }
}

//event listeners
restart.addEventListener('click', restartGame);

next.addEventListener('click',  nextQuestion);

escapeKey.addEventListener('click', quitGame);


//when window loads it runs start game function
window.onload = () =>{startGame()};

//../../../../pages/endGame.html
