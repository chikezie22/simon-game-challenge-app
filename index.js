var buttonColours = ['red','blue','green','yellow'];
var gamePattern =[];
var userClickedPattern = [];
var toogle = true;
var level = 0;

function  nextSequece(){
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    var $button = $('#' + randomChosenColour);
    console.log($button);
    $($button).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    console.log(level);
    $('h1').text('Level ' + level);
} 


$('.btn').click(function handlerFunction(){
    var userChosenColor = $(this).attr('id');
    console.log(userChosenColor);
    userClickedPattern.push(userChosenColor);
   playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play();
}
// function animatePress adds and remove the class pressed
function animatePress(currentColour){
   var $gray = $('#' + currentColour).addClass('pressed');

    setTimeout(function(){
        $gray.removeClass('pressed');
   },100);
}

$(document).keypress(function(){
if(toogle === true){
    $('h1').text('Level 0')
    nextSequece();
    toogle = false;
    
}
})


function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel]=== gamePattern[currentLevel]){

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
            nextSequece();
            userClickedPattern = [];
           },1000);
        }

    }else{
        var audio = new Audio('/sounds/wrong.mp3');
        audio.play();
        $('body').addClass('game-over');
        $('h1').text('Game Over press any key to start over!')
        startOver();
        setTimeout(function(){
            $('body').removeClass('game-over');
        }, 200)
    }

}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    toogle = true;
}