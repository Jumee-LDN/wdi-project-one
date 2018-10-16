const $body = $('body');
const $messageBox = $('.message-box');
const $snakeHeadImg = $('#snake-head');
const $buttonObject = $('.button');
let $winningRow;
let $currentLizardObject = $();

const imageArray = [
  {
    name: 'lizard',
    src: '<img id="lizard" src="https://www.freeiconspng.com/uploads/lizard-icon-30.png" />'
  }
];
let scoreNum = 0;
let lizardArr = [];
let clickedStatus = false;
let currentId;



gridGenerator(10,15);
setButton();

const intervalId = setInterval(function(){
  gameLoop();
}, 1000/5);

let snakeGeneratorIntervalId;

function setButton() {
  $buttonObject.click(function() {
    clickedStatus = !clickedStatus;
    snakeGeneratorIntervalId = setInterval(function(){
      snakeGenerator();
    }, 1000 * 2);
    if (clickedStatus) {
      console.log('start button clicked');
      pickRandomSpotForLizard();
      setLizardImgIn();
      storeCurrentLizardObjectInArray($currentLizardObject);
      $buttonObject[0].textContent = 'Reset';

    } else {
      console.log('clicked again');
      removeLizardImg();
      clearInterval(snakeGeneratorIntervalId);
      snakeArr = [];
      $buttonObject[0].textContent = 'Run';
      $('div.score-box > span')[0].textContent = 0;
      $messageBox[0].textContent = '🦎🦎🦎 Save baby lizards! 🦎🦎🦎';
      $messageBox.css( {
        'background-color': 'white',
        'color': 'black'
      });

    }
  });
}

function gridGenerator(rows, cols){
  const $container = $('<table></table>');
  $body.append($container);
  $container.addClass('grid');
  let i = 1;

  for(let r = 1; r <= rows; r++) {
    const $tr = $('<tr></tr>');
    $container.append($tr);
    $tr.attr('id', 'row'+ r);

    for(let c = 0; c < cols; c++){
      const $td = $('<td></td>');
      $tr.append($td);
      $td.attr('id', i);
      $td.addClass('grid-box');
      $td.append(i++);
    }
  }

  const $rows = $('table > tr');
  const $firstRow = $('tr:eq( 0 )');
  const $firstRowLength = $firstRow[0].children.length;

  function seaAreaGenerator(rowNum){
    for(let r = 0; r < rowNum; r++){
      for(let s = 0; s < $firstRowLength; s++){
        $($rows[r].children[s]).addClass('sea');
        $($rows[rowNum].children[s]).addClass('rock');
      }
    }
    $winningRow = $($rows[rowNum])[0];
  }
  seaAreaGenerator(2);
}

// 
// function pickRandomSpotForLizard(){
//   const $lastRow = $('table tr:last-child');
//   const lastRowLength = $lastRow[0].cells.length;
//   const randomBoxNumber = Math.floor(Math.random() * lastRowLength);
//
//   $currentLizardObject = $($lastRow[0].cells[randomBoxNumber]);
//   console.log('$currentLizardObject is :', $currentLizardObject);
//   // placeLizardObjectInArray($currentLizardObject);
// }
//
// function setLizardImgIn(){
//   $currentLizardObject.prepend(imageArray[0].src);
// }
//
// function storeCurrentLizardObjectInArray(Object){
//   lizardArr.push(Object);
// }
//
// function removeLizardImg(){
//   $currentLizardObject[0].firstElementChild.remove();
// }
//
// // *********CHANGE LIZARD POSITION BY KEY**************
// // https://stackoverflow.com/questions/29118791/how-to-move-an-element-via-arrow-keys-continuously-smoothly
//
// //store key codes and currently pressed ones
// const keys = {
//   UP: 38,
//   LEFT: 37,
//   RIGHT: 39,
//   DOWN: 40
// };
//
// // key detection (better to use addEventListener??)
// onkeyup = onkeydown = function(event){
//   const kc = event.keyCode || event.which;
//   keys[kc] = event.type === 'keydown';
// };
//
// // character control
// const gameLoop = function(){
//   moveSnakes();
//
//   if ( keys[keys.LEFT] ) {
//     moveLizardLeft();
//     lizardOnWinningRow();
//   }
//   if ( keys[keys.RIGHT] ) {
//     moveLizardRight();
//     lizardOnWinningRow();
//   }
//   if ( keys[keys.UP] ) {
//     moveLizardUp();
//     lizardOnWinningRow();
//   }
//   if ( keys[keys.DOWN] ) {
//     console.log('No turning back!');
//     // moveLizardDown();
//   } else {
//     return 'wrong key';
//   }
// };
//
// function moveLizardLeft(){
//   currentId = parseInt($currentLizardObject.attr('id'));
//   const newId = --currentId;
//   removeLizardImg();
//   // $currentLizardObject.attr('id',newId);
//   $currentLizardObject = $(`td#${newId}.grid-box`);
//   setLizardImgIn();
//   storeCurrentLizardObjectInArray($currentLizardObject);
// }
//
// function moveLizardRight(){
//   currentId = parseInt($currentLizardObject.attr('id'));
//   const newId = ++currentId;
//   removeLizardImg();
//   // $currentLizardObject.attr('id',newId);
//   $currentLizardObject = $(`td#${newId}.grid-box`);
//   setLizardImgIn();
//   storeCurrentLizardObjectInArray($currentLizardObject);
// }
//
// function moveLizardUp(){
//   currentId = parseInt($currentLizardObject.attr('id'));
//   const newId = currentId-15;
//   removeLizardImg();
//   // $currentLizardObject.attr('id',newId);
//   $currentLizardObject = $(`td#${newId}.grid-box`);
//   setLizardImgIn();
//   storeCurrentLizardObjectInArray($currentLizardObject);
// }
//
// function lizardOnWinningRow(){
//   lizardArr = [];
//   const $winningRowBoxes = $winningRow.children;
//   $($winningRowBoxes).each(function(){
//     const boxId = this.id;
//
//     if(boxId === $currentLizardObject[0].id){
//       $messageBox.css({
//         'background-color': 'lightskyblue',
//         'color': 'white'
//       });
//       $messageBox[0].textContent = '👍 You saved the baby lizard! 👍';
//       scoreNum++;
//       $('div.score-box > span')[0].textContent = scoreNum;
//       removeLizardImg();
//
//       setTimeout(function(){
//         snakeGenerator();
//         pickRandomSpotForLizard();
//         setLizardImgIn();
//         storeCurrentLizardObjectInArray($currentLizardObject);
//       }, 1000);
//       // clearInterval(intervalId);
//     }
//   });
// }
//
// let startLineNumbersArray = [];
// let snakeArr = [];
// const $td = $('td');
// const $tr = $('tr');
// let $chosenSnakeBoxObject;
// let randomBoxNumForSnake;
//
//
// function snakeGenerator(){
//   startLineNumbersArray = [];
//   pickRandomSpotForSnake();
//
//   const headNumber = parseInt(startLineNumbersArray[randomBoxNumForSnake][0].id);
//   console.log('Making snake at', headNumber);
//   $chosenSnakeBoxObject = startLineNumbersArray[randomBoxNumForSnake];
//   snakeArr.push({
//     positions: [headNumber],
//     direction: 'right'
//   });
// }
//
// function pickRandomSpotForSnake(){
//   for(let n = 0; n < $td.length; n++){
//     if ((n % 15) === 0){
//       startLineNumbersArray.push($($td[n]));
//     }
//     // else if ((n + 1) % 15 === 0){
//     //   console.log('this is lastchild', $td[n]);
//     // }
//   }
//
//   startLineNumbersArray.splice(0, 3); // take out top three tds
//   console.log(`startLineNumberArray is: ${startLineNumbersArray.length}`);
//   randomBoxNumForSnake = Math.floor(Math.random() * startLineNumbersArray.length);
// }
//
//
// // TODO: Rob added this. What is it????!!!
// // function to cancle the function
//
// function moveSnakes() {
//   $('.snake').removeClass('snake');
//
//   snakeArr.forEach(snake => {
//     if (snake.direction === 'right') {
//       const snakePositions = snake.positions;
//       //snakePositions = [headNumber]
//       //if... : snakePositions = [106]
//       const head = snakePositions[snakePositions.length - 1];
//       //snakePositions.length = 1
//       //head = snakePositions[0]
//       snakePositions.push(head + 1);
//       //[106].push(106 + 1)
//       //[106, 107]
//       snakePositions.splice(0, 1);
//       //[107]
//
//       if (snakePositions.length < 4) {
//         const tail = snakePositions[0];
//         //tail = 107
//         snakePositions.unshift(tail - 1);
//         //[107].unshift(106)
//         //[106, 107]
//       }
//     } else {
//       // TODO: What if the snake moves left!!??
//     }
//     snake.positions.forEach(snakePiece => {
//       $(`#${snakePiece}`).addClass('snake');
//     });
//     //[106,107].forEach
//     //add style to $(box106)
//     //add style to $(box107)
//   });
// }
