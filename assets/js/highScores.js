import {values} from './endGame.js';

let highScores = JSON.parse(window.localStorage.getItem('highScore')) || [];

function clearElementsHighScore(){
    values.topElements.style.visibility = "hidden";
    values.startContainer.style.display = "none";
    values.answerBox.style.visibility = "hidden";
    values.quesBox.style.visibility = "hidden";
    values.questionBar.style.visibility = "hidden";
    values.imgDisplay.style.visibility = "hidden";
    values.timeBox.style.visibility = "hidden";
    values.controllers.style.visibility = "hidden";
    loadHighScores();
}

 function loadHighScores(){
    let textSpace = document.createElement('ul');
    let output = highScores.map(score =>{
        return `<li>${score.name} - ${score.userScore}</li>`
    }).join('')
    textSpace.innerHTML = output;

    values.box.appendChild(textSpace);

    let homeButton = document.createElement('button');
    homeButton.innerText = "Go Home?";

    values.box.appendChild(homeButton);
    homeButton.classList.add('homeButton');

    homeButton.addEventListener('click', () =>{
        location.replace('../../../../index.html');
    });
}

window.onload = () =>{clearElementsHighScore()};
