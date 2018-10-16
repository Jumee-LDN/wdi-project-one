
function pickRandomSpotForLizard(){
  const $lastRow = $('table tr:last-child');
  const lastRowLength = $lastRow[0].cells.length;
  const randomBoxNumber = Math.floor(Math.random() * lastRowLength);

  $currentLizardObject = $($lastRow[0].cells[randomBoxNumber]);
  console.log('$currentLizardObject is :', $currentLizardObject);
  // placeLizardObjectInArray($currentLizardObject);
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
  currentId = parseInt($currentLizardObject.attr('id'));
  const newId = --currentId;
  removeLizardImg();
  // $currentLizardObject.attr('id',newId);
  $currentLizardObject = $(`td#${newId}.grid-box`);
  setLizardImgIn();
  storeCurrentLizardObjectInArray($currentLizardObject);
}

function moveLizardRight(){
  currentId = parseInt($currentLizardObject.attr('id'));
  const newId = ++currentId;
  removeLizardImg();
  // $currentLizardObject.attr('id',newId);
  $currentLizardObject = $(`td#${newId}.grid-box`);
  setLizardImgIn();
  storeCurrentLizardObjectInArray($currentLizardObject);
}

function moveLizardUp(){
  currentId = parseInt($currentLizardObject.attr('id'));
  const newId = currentId-15;
  removeLizardImg();
  // $currentLizardObject.attr('id',newId);
  $currentLizardObject = $(`td#${newId}.grid-box`);
  setLizardImgIn();
  storeCurrentLizardObjectInArray($currentLizardObject);
}

function lizardOnWinningRow(){
  lizardArr = [];
  const $winningRowBoxes = $winningRow.children;
  $($winningRowBoxes).each(function(){
    const boxId = this.id;

    if(boxId === $currentLizardObject[0].id){
      $messageBox.css({
        'background-color': 'lightskyblue',
        'color': 'white'
      });
      $messageBox[0].textContent = '👍 You saved the baby lizard! 👍';
      scoreNum++;
      $('div.score-box > span')[0].textContent = scoreNum;
      removeLizardImg();

      setTimeout(function(){
        snakeGenerator();
        pickRandomSpotForLizard();
        setLizardImgIn();
        storeCurrentLizardObjectInArray($currentLizardObject);
      }, 1000);
      // clearInterval(intervalId);
    }
  });
}