const $body = $('body');
const $lizardImg = $('#lizard');
let $currentBoxObject = $();
let $newLizardObject = $();
let currentId;
let lizardArr = [];




function gameStart(){
  gridGenerator(8,5);
  pickRandomSpotForLizard();

}

gameStart();


function pickRandomSpotForLizard(){
  const $lastRow = $('table tr:last-child');
  // first td of the last tr ==> $lastRow[0].cells[1];
  const lastRowLength = $lastRow[0].cells.length;
  const randomBox = Math.floor(Math.random() * lastRowLength);

  $currentBoxObject = $($lastRow[0].cells[randomBox]);
  console.log($currentBoxObject);

  placeLizardObjectInArray($currentBoxObject);
}

function addLizardImg(){
  lizardArr[0].prepend('<img id="lizard" src="https://www.freeiconspng.com/uploads/lizard-icon-30.png" />');
  lizardArr[0].addClass('lizard');
}


function placeLizardObjectInArray(lizardPosition){
  // lizardArr[0][0].childNodes[0].remove();
  // const lizardImageToRemove = lizardArr[0][0].childNodes[0];
  // lizardImageToRemove.remove();
  // lizardArr.pop();
  lizardArr.push(lizardPosition);
  addLizardImg();
}

function removeLizardInArray(){
  const lizardImageToRemove = lizardArr[0][0].childNodes[0];
  lizardImageToRemove.remove();
  lizardArr.pop();
  $currentBoxObject.removeClass('lizard');
}

// *********CHANGE LIZARD POSITION BY KEY**************

function moveLizardLeft(){
  currentId = parseInt($newLizardObject.attr('id'));
  const newId = --currentId;
  removeLizardInArray();
  // $currentBoxObject.attr('id',newId);
  $newLizardObject = $(`td#${newId}.grid-box`);
  placeLizardObjectInArray($newLizardObject);
}

function moveLizardRight(){
  currentId = parseInt($newLizardObject.attr('id'));
  const newId = ++currentId;
  removeLizardInArray();
  // $currentBoxObject.attr('id',newId);
  $newLizardObject = $(`td#${newId}.grid-box`);
  placeLizardObjectInArray($newLizardObject);
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
  const $firstRow = $('table tr:first-child');
  const $firstRowLength = $firstRow[0].children.length;

  function seaAreaGenerator(rowNum){
    for(let r = 0; r < rowNum; r++){
      for(let s = 0; s < $firstRowLength; s++){
        $($rows[r].children[s]).addClass('sea');
      }
    }
  }
  seaAreaGenerator(2);
}
