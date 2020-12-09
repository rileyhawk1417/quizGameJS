export const values={
    imgDisplay : document.getElementById('image'),
    quesBox : document.getElementById('ques-box'),
    answerBox : document.getElementById('ans-box'),
    imgContainer : document.getElementById('img-box'),
    box : document.getElementById('main-box'),
    startContainer : document.getElementById('button'),
    questionBar : document.getElementById('question-bar'),
    controllers : document.getElementById('controllers'),
    timeBox : document.getElementById('time-box'),
    topElements : document.querySelector('#top'),
    //highScore : JSON.parse(localStorage.getItem('highScores')) || [],
};

let highScore = JSON.parse(localStorage.getItem('highScores')) || [];
//let userSave = localStorage.getItem('name');
let getScore = localStorage.getItem('recentScore');

let enterScore = document.createElement('input');
enterScore.placeholder = "Enter Name";

export function clearElements(){
    values.topElements.style.visibility = "hidden";
    values.startContainer.style.display = "none";
    values.answerBox.style.visibility = "hidden";
    values.quesBox.style.visibility = "hidden";
    values.questionBar.style.visibility = "hidden";
    values.imgDisplay.style.visibility = "hidden";
    values.timeBox.style.visibility = "hidden";
    values.controllers.style.visibility = "hidden";
    saveScore();  
}

function saveScore(){
    //create elements
    let saveText = "Would you like to save your score ?";
    let narration = document.createElement('p');
    narration.innerHTML = saveText;

    //create Buttons and add properties
    let saveButton = document.createElement('button');
    saveButton.innerText = "Save";

    let homeButton = document.createElement('button');
    homeButton.innerText = "Home";

    let restartButton = document.createElement('button');
    restartButton.innerText = "Restart Game?";
  
    let cancelButton = document.createElement('button');
    cancelButton.innerText = "Cancel";

    //append buttons and add classes
    values.box.appendChild(narration);
    narration.classList.add('narration');

    values.box.appendChild(enterScore);
    enterScore.classList.add('scoreEntry');

    values.box.appendChild(saveButton);
    saveButton.classList.add('scoreButtons');
    saveButton.classList.add('save');

    values.box.appendChild(homeButton);
    homeButton.classList.add('scoreButtons');
    homeButton.classList.add('home');

    values.box.appendChild(restartButton);
    restartButton.classList.add('scoreButtons');
    restartButton.classList.add('save');

    values.box.appendChild(cancelButton);
    cancelButton.classList.add('scoreButtons');
    cancelButton.classList.add('cancel');

    //add Event listeners
    saveButton.addEventListener('click', saveGame);
    homeButton.addEventListener('click', goHome);
    restartButton.addEventListener('click', restartGame);
    cancelButton.addEventListener('click', goHome);
}


function restartGame(){
    location.replace('../../pages/game.html');
}

function goHome(){
    location.replace('../../../../index.html');
}

function saveGame(e){
    e.preventDefault();
    let txtInput = document.querySelector('input');
    let userName = txtInput.value;
    
    const score={
         userScore: getScore,
         name: userName
     }
     highScore.push(score);
        highScore.sort((a,b) => {
        return b.score - a.score;
    }); 
     highScore.splice(5);
     localStorage.setItem('highScore', JSON.stringify(highScore));
     location.replace('../../../../projects/quizGameJS/pages/highScore.html');
    console.log(score.name);
}

window.onload = () =>{clearElements()};