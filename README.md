# **Quiz Game** 

## Description 📔

The game is entirely built using Vanilla JavaScript without using any frameworks. I would consider it good practice to enhance your skills.
The game uses Local Storage to keep the previous score entered by the user local storage. Local storage uses a key:value system
so the value is overwritten every time a new score is entered.
The live example is running on a subdomain which you can visit here [Quiz Game](https://sourcehub.freetzi.com/sources/highschool/olevel/geometry/index.html)

## **Please Note**
- Some of the codes in the README.md are just pieces I picked out to explain which parts of the code work. The actual code is a bit confusing but there are some comments that will help. Overtime will be refactoring and experimenting trying to add new feature/functions. 😁
>Keep it Simple 😎

---

## How it works ⚙️
- The project needs to be running on a local  host server or live server. It wont run the scripts if it's static.
- When you open geometry HTML it then welcomes you and offers to view the HighScore or to play the game.
- The game itself has a timer that will automatically end the game if the user fails to answer within that time set. They will still have their score stored either way.
- After the game they will have to enter their HighScore to save their name.
- **Please note** that the game can only save one name at a time since it uses **local storage**.
---
## Code Structure  📋
- The code will run a loop to display all answers for the user to select.
```javascript
    question.ans.forEach((answer) => {
        const button = document.createElement('button');
        button.innerText = answer.choice;
        button.classList.add('ans');
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', choiceSelect);
        answerBox.appendChild(button);
```

- When the user selects a answer there is an event listener that will determine if he answer box matches with the conditionals in questions.js
- When the game ends the game will take the user to the HighScore Screen to submit their name. The name and score gets saved to local storage.

```javascript
let getScore = localStorage.getItem('recentScore');

    const score={
         userScore: getScore,
         name: userName
     }
     highScore.push(score);

localStorage.setItem('highScore', JSON.stringify(highScore));
```
