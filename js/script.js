const $body = $('body');

const $snakeHeadImg = $('#snake-head');
const $messageBox = $('.message-box');
let $currentBoxObject = $();
let $newLizardObject = $();
const $buttonObject = $('.button');
let $winningRow;

let currentId;
let lizardArr = [];

let clickedStatus = false;
let intervalId;

// function gameStart(){
//   gridGenerator(8,15);
//   setButton();
//   // lizardOnWinningRow();
// }
//
// gameStart();
gridGenerator(8,15);
setButton();


function setButton() {
  $buttonObject.click(function() {
    clickedStatus = !clickedStatus;

    if(clickedStatus){
      console.log('start button clicked');
      pickRandomSpotForLizard();
      // game loop
      intervalId = setInterval(function(){
        detectCharacterMovement();
      }, 1000/5);
      $buttonObject[0].textContent = 'Run!';
    } else {
      console.log('clicked again');
      $buttonObject[0].textContent = 'Restart';
      removeLizardInArray();
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


function pickRandomSpotForLizard(){
  const $lastRow = $('table tr:last-child');
  // first td of the last tr ==> $lastRow[0].cells[1];
  const lastRowLength = $lastRow[0].cells.length;
  const randomBox = Math.floor(Math.random() * lastRowLength);

  $currentBoxObject = $($lastRow[0].cells[randomBox]);
  console.log($currentBoxObject);

  placeLizardObjectInArray($currentBoxObject);
}


function placeLizardObjectInArray(lizardPosition){
  lizardArr.push(lizardPosition);
  addLizardImg();
}

function addLizardImg(){
  lizardArr[0].prepend('<img id="lizard" src="https://www.freeiconspng.com/uploads/lizard-icon-30.png" />');
  lizardArr[0].addClass('lizard');
}

function removeLizardInArray(){
  const lizardImageToRemove = lizardArr[0][0].childNodes[0];
  lizardImageToRemove.remove();
  lizardArr = [];
  $currentBoxObject.removeClass('lizard');
}

// *********CHANGE LIZARD POSITION BY KEY**************
// https://stackoverflow.com/questions/29118791/how-to-move-an-element-via-arrow-keys-continuously-smoothly


//store key codes and currently pressed ones
const keys = {
  UP: 38,
  LEFT: 37,
  RIGHT: 39,
  DOWN: 40
};

// key detection (better to use addEventListener??)
onkeyup = onkeydown = function(event){
  // prevent default browser handling of keypresses
  // if (event.preventDefault) {
  //   event.preventDefault();
  // } else {
  //   event.returnValue = false;
  // }
  const kc = event.keyCode || event.which;
  keys[kc] = event.type === 'keydown';
};

// character control
const detectCharacterMovement = function(){
  if ( keys[keys.LEFT] ) {
    moveLizardLeft();
    lizardOnWinningRow();
  }
  if ( keys[keys.RIGHT] ) {
    moveLizardRight();
    lizardOnWinningRow();
  }
  if ( keys[keys.UP] ) {
    moveLizardUp();
    lizardOnWinningRow();
  }
  if ( keys[keys.DOWN] ) {
    console.log('No turning back!');
    // moveLizardDown();
  } else {
    return 'wrong key';
  }
};


function moveLizardLeft(){
  currentId = parseInt($currentBoxObject.attr('id'));
  const newId = --currentId;
  removeLizardInArray();
  // $currentBoxObject.attr('id',newId);
  $currentBoxObject = $(`td#${newId}.grid-box`);
  placeLizardObjectInArray($currentBoxObject);
}

function moveLizardRight(){
  currentId = parseInt($currentBoxObject.attr('id'));
  const newId = ++currentId;
  removeLizardInArray();
  // $currentBoxObject.attr('id',newId);
  $currentBoxObject = $(`td#${newId}.grid-box`);
  placeLizardObjectInArray($currentBoxObject);
}

function moveLizardUp(){
  currentId = parseInt($currentBoxObject.attr('id'));
  const newId = currentId-15;
  removeLizardInArray();
  // $currentBoxObject.attr('id',newId);
  $currentBoxObject = $(`td#${newId}.grid-box`);
  placeLizardObjectInArray($currentBoxObject);
}

function lizardOnWinningRow(){
  const $winningRowBoxes = $winningRow.children;
  $($winningRowBoxes).each(function(){
    let boxId = this.id;

    if(boxId === $currentBoxObject[0].id){
      $messageBox.css( {
        'background-color': 'lightskyblue',
        'color': 'white'
      });
      $messageBox[0].textContent = '👍 You saved the baby lizard! 👍';
      clearInterval(intervalId);
    }
  });
}

let firstColArr = [];
const $td = $('td');
const $tr = $('tr');
let randomBoxNumForSnake;
let chosenSnakeBoxObject;

function snakeGenerator(){
  pickRandomSpotForSnake();
  addSnakeImg();
  // firstColArr = [];
}
snakeGenerator();

function pickRandomSpotForSnake(){
  for(let n = 0; n < $td.length; n++){
    if ((n % 15) === 0){
      firstColArr.push($($td[n]));
    }
    // else if ((n + 1) % 15 === 0){
    //   console.log('this is lastchild', $td[n]);
    // }
  }
  firstColArr.splice(0, 3);
  randomBoxNumForSnake = Math.floor(Math.random()*firstColArr.length);
  chosenSnakeBoxObject = firstColArr[randomBoxNumForSnake];
}


function addSnakeImg(){
  chosenSnakeBoxObject.prepend('<i class="fas fa-play-circle" id="snake-head"></i>');
  chosenSnakeBoxObject.addClass('snake-head');
}
