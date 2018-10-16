
let startLineNumbersArray = [];
let snakeArr = [];
const $td = $('td');
const $tr = $('tr');
let $chosenSnakeBoxObject;
let randomBoxNumForSnake;


function snakeGenerator(){
  startLineNumbersArray = [];
  pickRandomSpotForSnake();

  const headNumber = parseInt(startLineNumbersArray[randomBoxNumForSnake][0].id);
  console.log('Making snake at', headNumber);
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
    // else if ((n + 1) % 15 === 0){
    //   console.log('this is lastchild', $td[n]);
    // }
  }

  startLineNumbersArray.splice(0, 3); // take out top three tds
  console.log(`startLineNumberArray is: ${startLineNumbersArray.length}`);
  randomBoxNumForSnake = Math.floor(Math.random() * startLineNumbersArray.length);
}


// TODO: Rob added this. What is it????!!!
// function to cancle the function

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
      snakePositions.push(head + 1);
      //[106].push(106 + 1)
      //[106, 107]
      snakePositions.splice(0, 1);
      //[107]

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
