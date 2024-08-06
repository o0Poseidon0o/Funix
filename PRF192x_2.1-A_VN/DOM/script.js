'use strict';
// console.log(document.querySelector('.message').textContent);
// document.querySelector('.message').textContent='🎉Correct Number!';

// document.querySelector('.number').textContent=13;
// document.querySelector('.score').textContent=20;

// console.log( document.querySelector('.guess').value);
// document.querySelector('.guess').value=23;
let secretNumber=Math.trunc(Math.random()*20)+1;
let score=20;
let highscore=0;
const displayMessage= function(message){
    document.querySelector('.message').textContent=message;
}
document.querySelector('.number').textContent='?';

document.querySelector('.check').addEventListener('click', function(){
    const guess = Number(document.querySelector('.guess').value);
    // console.log(guess,typeof guess);
    // Khi nguoi choi khong  nhap
    if(!guess){
        // document.querySelector('.message').textContent='😆No number!';
        displayMessage('😆No number!')
        document.querySelector('.container__main').style.backgroundColor='red';
    
    // Khi nguoi choi thang
    }else if(guess===secretNumber){
        // document.querySelector('.message').textContent='🎉Correct Number!';
        displayMessage('🎉Correct Number!');
        document.querySelector('.number').textContent=secretNumber;
        document.querySelector('.container__main').style.backgroundColor='green';
        if(score>highscore){
            highscore=score;
            document.querySelector('.highscore').textContent=highscore;
        }
    // Khi nguoi choi nhap sai
    
    // Khi nguoi choi nhap qua cao
    }else if(guess>secretNumber){
        if(score>1){
            // document.querySelector('.message').textContent='🤢 Too high';
            displayMessage('🤢 Too high');
            score--;
            document.querySelector('.score').textContent=score;
            document.querySelector('.container__main').style.backgroundColor='#F2965C';
        }else{
            document.querySelector('.message').textContent='🤷‍♀️ You lost the game!';
            document.querySelector('.score').textContent=0;
            document.querySelector('.container__main').style.backgroundColor='#1A0F0A';
        }
        

    // Khi nguoi choi nhap qua thap
    }else if(guess<secretNumber){
        if(score>1){
            document.querySelector('.message').textContent='🤢 Too low';
            score--;
            document.querySelector('.score').textContent=score;
            document.querySelector('.container__main').style.backgroundColor='#253D3D';
        }else{
            document.querySelector('.message').textContent='🤷‍♀️ You lost the game!';
            document.querySelector('.score').textContent=0;
            document.querySelector('.container__main').style.backgroundColor='#1A0F0A';
        }
       
    }
});

document.querySelector('.again').addEventListener('click',function(){
    score=20;
    secretNumber=Math.trunc(Math.random()*20)+1;
    document.querySelector('.message').textContent='Star guessing...';
    document.querySelector('.score').textContent=score;
    document.querySelector('.number').textContent='?';
    document.querySelector('.guess').value='';
    
});