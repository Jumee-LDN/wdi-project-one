
let startLineNumbersArray = [];
let snakeArr = [];
let $chosenSnakeBoxObject;
let randomBoxNumForSnake;


function snakeGenerator(){
  startLineNumbersArray = [];
  pickRandomSpotForSnake();

  const headNumber = parseInt(startLineNumbersArray[randomBoxNumForSnake][0].id);
  // console.log('Making snake at', headNumber);
  $chosenSnakeBoxObject = startLineNumbersArray[randomBoxNumForSnake];
  snakeArr.push({
    positions: [headNumber],
    direction: 'right'
  });
}



function pickRandomSpotForSnake(){

  for(let n = 0; n < $td.length; n++){
    if ((n % 15) === 0){
      startLineNumbersArray.push($($td[n]));
    }
  }
  startLineNumbersArray.splice(0, 3); // take out top three tds
  startLineNumbersArray.splice(-1, 1);// remove last td
  // console.log(`startLineNumberArray is: ${startLineNumbersArray.length}`);
  randomBoxNumForSnake = Math.floor(Math.random() * startLineNumbersArray.length);
}


// TODO: Rob added this. What is it????!!!
const snakeLimit = [135];

function moveSnakes() {
  $('.snake').removeClass('snake');

  snakeArr.forEach(snake => {
    if (snake.direction === 'right') {
      const snakePositions = snake.positions;
      //snakePositions = [headNumber]
      //if... : snakePositions = [106]
      const head = snakePositions[snakePositions.length - 1];
      //snakePositions.length = 1
      //head = snakePositions[0]
      // console.log(head);
      if(!snakeLimit.includes(head)) {
        snakePositions.push(head + 1);
        //[106].push(106 + 1)
        //[106, 107]
        snakePositions.splice(0, 1);
        //[107]
      } else {
        const wall = snakeLimit[snakeLimit.indexOf(head)];
        console.log('this is where the snake hit ->', wall);
        // snake has hit the wall
        // need to remove tail from snake then delete it.


        // for(let i = 3; i > -1; i--){
        //   setInterval(function(){
        //     console.log(wall - i);
        //     $($td[wall - i]).removeClass('snake');
        //   }, 1000);
        // }
      }

      if (snakePositions.length < 4) {
        const tail = snakePositions[0];
        //tail = 107
        snakePositions.unshift(tail - 1);
        //[107].unshift(106)
        //[106, 107]
      }

    } else {
      // TODO: What if the snake moves left!!??
    }
    snake.positions.forEach(snakePiece => {
      $(`#${snakePiece}`).addClass('snake');
    });
    //[106,107].forEach
    //add style to $(box106)
    //add style to $(box107)
  });
}

function snakeGotLizard(){
  if($currentLizardObject[0].classList[1] === 'snake'){
    // $currentLizardObject.css('background-color', 'red');
    $currentLizardObject.toggleClass('dead-lizard');
    lizardArr = [];
    removeLizardImg();
    setTimeout(function(){
      pickRandomSpotForLizard();
      setLizardImgIn();
      storeCurrentLizardObjectInArray($currentLizardObject);
    }, 1000);
    console.log('lizard on snake');
  }
}
