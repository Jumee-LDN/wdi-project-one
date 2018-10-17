const $td = $('td');
const $tr = $('tr');


function pickRandomSpotForLizard(){
  const $lastRow = $('table tr:last-child');
  const lastRowLength = $lastRow[0].cells.length;
  const randomBoxNumber = Math.floor(Math.random() * lastRowLength);

  $currentLizardObject = $($lastRow[0].cells[randomBoxNumber]);
  // console.log('$currentLizardObject is :', $currentLizardObject);
}

function setLizardImgIn(){
  $currentLizardObject.prepend(imageArray[0].src);
}

function storeCurrentLizardObjectInArray(Object){
  lizardArr.push(Object);
}

function removeLizardImg(){
  $currentLizardObject[0].firstElementChild.remove();
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
  const kc = event.keyCode || event.which;
  keys[kc] = event.type === 'keydown';
};

// character control
const gameLoop = function(){
  moveSnakes();

  if ( keys[keys.LEFT] ) {
    moveLizardLeft();
    $messageBox[0].textContent = '🐍 Run!! 🐍';
    lizardOnWinningRow();
    snakeGotLizard();
  }
  if ( keys[keys.RIGHT] ) {
    moveLizardRight();
    $messageBox[0].textContent = '🐍 Run!! 🐍';
    lizardOnWinningRow();
    snakeGotLizard();
  }
  if ( keys[keys.UP] ) {
    moveLizardUp();
    $messageBox[0].textContent = '🐍 Run!! 🐍';
    lizardOnWinningRow();
    snakeGotLizard();
  }
  if ( keys[keys.DOWN] ) {
    $messageBox[0].textContent = '😱 No turning back! 😱';
    snakeGotLizard();
    // moveLizardDown();
  } else {
    return 'wrong key';
  }
};

function moveLizardLeft(){
  currentId = parseInt($currentLizardObject.attr('id'));
  let newId;
  if (!leftBoundaryNumsArray.includes(currentId)){
    removeLizardImg();
    newId = --currentId;
    $currentLizardObject = $(`td#${newId}.grid-box`);
    setLizardImgIn();
    storeCurrentLizardObjectInArray($currentLizardObject);
  }

}

function moveLizardRight(){
  currentId = parseInt($currentLizardObject.attr('id'));
  removeLizardImg();
  let newId
  if (!rightBoundaryNumsArray.includes(currentId)){
    newId = ++currentId;
  } else {
    newId = currentId;
  }
  $currentLizardObject = $(`td#${newId}.grid-box`);
  setLizardImgIn();
  storeCurrentLizardObjectInArray($currentLizardObject);
}

function moveLizardUp(){
  currentId = parseInt($currentLizardObject.attr('id'));
  const newId = currentId - $tr[0].childElementCount;
  // console.log('currentId is: ', currentId, ' $tr[0].childElementCount is:',  $tr[0].childElementCount);
  removeLizardImg();
  $currentLizardObject = $(`td#${newId}.grid-box`);
  setLizardImgIn();
  storeCurrentLizardObjectInArray($currentLizardObject);
}


function lizardOnWinningRow(){
  lizardArr = [];
  const $winningRowBoxes = $winningRow.children;
  $($winningRowBoxes).each(function(){
    const lizardBoxId = this.id;

    if(lizardBoxId === $currentLizardObject[0].id){
      $messageBox.css({
        'background-color': '#686868',
        'color': 'white'
      });
      $messageBox[0].textContent = '👍 You saved the baby lizard! 👍';
      scoreNum++;
      $('div.score-box > span')[0].textContent = scoreNum;
      removeLizardImg();

      setTimeout(function(){
        pickRandomSpotForLizard();
        setLizardImgIn();
        storeCurrentLizardObjectInArray($currentLizardObject);
      }, 1000);
    }
  });
}
let leftBoundaryNumsArray = [];
let rightBoundaryNumsArray = [];

function getLeftBoundaryColNums(){
  $.each( $tr, function( i ){
    leftBoundaryNumsArray.push(parseInt($tr[i].firstElementChild.textContent));
  });
  leftBoundaryNumsArray.splice(0, 3);
}
function getRightBoundaryColNums(){
  $.each( $tr, function( i ){
    rightBoundaryNumsArray.push(parseInt($tr[i].lastElementChild.textContent));
  });
  rightBoundaryNumsArray.splice(0, 3);
}

getLeftBoundaryColNums();
getRightBoundaryColNums();
