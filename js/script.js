const $body = $('body');
const $messageBox = $('.message-box');
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


gridGenerator(15,20);
setButton();

const intervalId = setInterval(function(){
  gameLoop();
  //remove snake style on the last row
  // const $lastRow = $table[0].lastElementChild;

}, 1000/6);

let snakeGeneratorIntervalId;
let lizardStatusIntervalId;

function setButton() {
  $buttonObject.click(function() {
    clickedStatus = !clickedStatus;

    if (clickedStatus) {
      console.log('start button clicked');
      snakeArr = [];
      pickRandomSpotForLizard();
      setLizardImgIn();
      storeCurrentLizardObjectInArray($currentLizardObject);
      snakeGeneratorIntervalId = setInterval(function(){
        snakeGenerator();
      }, 1000 * Math.floor(Math.random() * 10 + 4));
      lizardStatusIntervalId = setInterval(function(){
        snakeGotLizard();
      }, 1000/5);
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
// function clearLastRowFromSnakes(){
//   lastrow.removeClass('snake');
// }
